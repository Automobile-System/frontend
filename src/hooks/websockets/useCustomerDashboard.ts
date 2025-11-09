'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface DashboardOverview {
  activeServices: number;
  completedServices: number;
  upcomingAppointments: number;
  activeProjects: number;
  completedProjects: number;
}

const WS_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:8080';

export function useCustomerDashboard(username: string | null) {
  const [dashboardData, setDashboardData] = useState<DashboardOverview | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const clientRef = useRef<Client | null>(null);
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const connect = useCallback(() => {
    if (!username) {
      console.log('No username provided, skipping WebSocket connection');
      return;
    }

    try {
      const stompClient = new Client({
        webSocketFactory: () => new SockJS(`${WS_BASE_URL}/websocket`),
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        onConnect: () => {
          console.log('✅ WebSocket Connected for user:', username);
          setIsConnected(true);
          setError(null);

          stompClient.subscribe(
            `/topic/customer/dashboard/${username}`,
            (message: IMessage) => {
              try {
                const data = JSON.parse(message.body);
                console.log('📊 Dashboard update received:', data);
                setDashboardData(data);
              } catch (err) {
                console.error('Error parsing dashboard update:', err);
              }
            }
          );

          stompClient.publish({
            destination: '/app/customer/dashboard/request',
            body: username
          });
        },
        onStompError: (frame) => {
          console.error('❌ WebSocket error:', frame);
          setIsConnected(false);
          setError('Connection failed');
        },
        onWebSocketClose: () => {
          setIsConnected(false);
        }
      });

      stompClient.activate();
      clientRef.current = stompClient;
    } catch (err) {
      console.error('Failed to establish WebSocket connection:', err);
      setError('Failed to connect');
    }
  }, [username]);

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
      reconnectTimeoutRef.current = null;
    }

    if (clientRef.current) {
      clientRef.current.deactivate();
      console.log('🔌 WebSocket Disconnected');
      setIsConnected(false);
    }
  }, []);

  const requestUpdate = useCallback(() => {
    if (clientRef.current?.connected && username) {
      console.log('📡 Requesting dashboard update for:', username);
      clientRef.current.publish({
        destination: '/app/customer/dashboard/request',
        body: username
      });
    }
  }, [username]);

  useEffect(() => {
    connect();

    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  return {
    dashboardData,
    isConnected,
    error,
    requestUpdate,
  };
}
