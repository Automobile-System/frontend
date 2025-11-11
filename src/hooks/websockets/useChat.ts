'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

type RawChatMessage = Omit<ChatMessage, 'id'> & { id: string | number };

const WS_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

type UseChatOptions = {
  enabled?: boolean;
};

type SockJSTransportOptions = {
  transportOptions?: {
    xhrStream?: { withCredentials?: boolean };
    xhrPolling?: { withCredentials?: boolean };
  };
};

export function useChat(conversationId: number | null, options: UseChatOptions = {}) {
  const { enabled = true } = options;
  const [messages, setMessagesState] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clientRef = useRef<Client | null>(null);
  const subscriptionRef = useRef<string | null>(null);
  const messageIdsRef = useRef<Set<string>>(new Set());

  const normalizeMessage = useCallback((message: RawChatMessage): ChatMessage => {
    const id = typeof message.id === 'string' ? message.id : String(message.id);
    return {
      ...message,
      id,
    };
  }, []);

  const replaceMessages = useCallback((next: Array<ChatMessage | RawChatMessage>) => {
    const normalized = (next ?? []).map((message) =>
      normalizeMessage(message as RawChatMessage)
    );

    const newIds = new Set<string>();
    normalized.forEach((message) => {
      if (message.id) {
        newIds.add(message.id);
      }
    });

    messageIdsRef.current = newIds;
    setMessagesState(normalized);
  }, [normalizeMessage]);

  const addMessage = useCallback((message: RawChatMessage) => {
    if (!message || message.id === undefined || message.id === null) {
      return;
    }

    const normalized = normalizeMessage(message);
    if (messageIdsRef.current.has(normalized.id)) {
      return;
    }

    messageIdsRef.current.add(normalized.id);
    setMessagesState((prev) => [...prev, normalized]);
  }, [normalizeMessage]);

  const cleanupClient = useCallback(() => {
    if (clientRef.current) {
      try {
        if (subscriptionRef.current) {
          clientRef.current.unsubscribe(subscriptionRef.current);
          subscriptionRef.current = null;
        }
        clientRef.current.deactivate();
      } catch (err) {
        console.error('Failed to cleanup chat websocket client', err);
      } finally {
        clientRef.current = null;
        setIsConnected(false);
      }
    }
  }, []);

  const connect = useCallback(() => {
    if (!enabled || !conversationId) {
      return;
    }

    if (clientRef.current?.connected) {
      return;
    }

    try {
      const sock = new SockJS(
        `${WS_BASE_URL}/websocket`,
        undefined,
        {
          transportOptions: {
            xhrStream: { withCredentials: true },
            xhrPolling: { withCredentials: true },
          },
        } as SockJS.Options & SockJSTransportOptions
      );

      const client = new Client({
        webSocketFactory: () => sock,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          setIsConnected(true);
          setError(null);

          const subscriptionId = client.subscribe(
            `/topic/chat/${conversationId}`,
            (message: IMessage) => {
              try {
                const payload = JSON.parse(message.body) as RawChatMessage;
                addMessage(payload);
              } catch (err) {
                console.error('Failed to parse chat message payload', err);
              }
            }
          ).id;

          subscriptionRef.current = subscriptionId;
        },
        onStompError: (frame) => {
          console.error('WebSocket STOMP error', frame);
          setError(frame.headers['message'] ?? 'Connection error');
          setIsConnected(false);
        },
        onWebSocketClose: () => {
          setIsConnected(false);
        },
      });

      client.activate();
      clientRef.current = client;
    } catch (err) {
      console.error('Failed to connect chat websocket', err);
      setError('Failed to connect to chat service');
    }
  }, [addMessage, conversationId, enabled]);

  const disconnect = useCallback(() => {
    cleanupClient();
  }, [cleanupClient]);

  const sendMessage = useCallback(
    (senderId: string, text: string) => {
      if (!clientRef.current || !conversationId) {
        return Promise.reject(new Error('Chat connection is not ready'));
      }

      const payload = JSON.stringify({ senderId, text });

      try {
        clientRef.current.publish({
          destination: `/app/chat/${conversationId}`,
          body: payload,
        });
        return Promise.resolve();
      } catch (err) {
        console.error('Failed to send chat message', err);
        return Promise.reject(err);
      }
    },
    [conversationId]
  );

  useEffect(() => {
    connect();
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  useEffect(() => {
    // Reset messages when conversation changes
    messageIdsRef.current = new Set();
    setMessagesState([]);
  }, [conversationId]);

  return {
    messages,
    setMessages: replaceMessages,
    addMessage,
    isConnected,
    error,
    sendMessage,
    reconnect: connect,
    disconnect,
  };
}

