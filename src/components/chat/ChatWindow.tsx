// components/ChatWithUs.tsx
import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import {
  Loader2,
  MessageCircle,
  Minimize2,
  Maximize2,
  Send,
  X,
  User,
  Wifi,
  WifiOff,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useChat, ChatMessage } from "@/hooks/websockets/useChat";
import {
  createConversation,
  getConversationMessages,
  getParticipantConversationsApi,
  postChatMessage,
} from "@/services/api";

interface ChatWindowProps {
  employeeName?: string;
  employeeRole?: string;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

interface Conversation {
  id: number;
  recipientName: string | null;
  lastMessageSnippet: string | null;
  lastMessageTime: string | null;
  associatedVehicle: string | null;
  participantId: string | null;
  employeeId: string | null;
  employeeName: string | null;
}

export function ChatWindow({
  employeeName: fallbackEmployeeName = "Service Advisor",
  employeeRole = "Customer Support",
  isOpen,
  onClose,
}: ChatWindowProps) {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();

  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [isMinimized, setIsMinimized] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [loadingConversation, setLoadingConversation] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    messages,
    setMessages,
    addMessage,
    isConnected,
    error: socketError,
  } = useChat(conversation?.id ?? null, {
    enabled: isOpen && !!conversation?.id,
  });

  const quickQuestions = useMemo(
    () => [
      "What's the status of my vehicle?",
      "Can you explain the repair needed?",
      "When will my service be completed?",
      "Could you send me photos?",
    ],
    []
  );

  const activeEmployeeName =
    conversation?.employeeName && conversation.employeeName.trim().length > 0
      ? conversation.employeeName
      : fallbackEmployeeName;

  const loadConversation = useCallback(async () => {
    if (!isOpen || !user?.id) {
      return;
    }
    setLoadingConversation(true);
    setError(null);
    try {
      const existing: Conversation[] = await getParticipantConversationsApi(
        user.id
      );

      let convo = existing[0] ?? null;
      if (!convo) {
        convo = await createConversation({
          participantId: user.id,
        });
      }
      setConversation(convo);
    } catch (err) {
      console.error("Failed to initialize chat conversation", err);
      setError("Unable to start chat. Please try again.");
    } finally {
      setLoadingConversation(false);
    }
  }, [isOpen, user?.id]);

  useEffect(() => {
    if (!authLoading && isOpen && isAuthenticated) {
      loadConversation();
    }
  }, [authLoading, isAuthenticated, isOpen, loadConversation]);

  useEffect(() => {
    if (!conversation?.id || !isOpen) {
      return;
    }

    let cancelled = false;
    const fetchHistory = async () => {
      setHistoryLoading(true);
      setError(null);
      try {
        const history: Array<{
          id: number | string;
          senderId: string;
          text: string;
          timestamp: string;
        }> = await getConversationMessages(conversation.id);

        if (!cancelled) {
          const normalized: ChatMessage[] = history.map((msg) => ({
            id: typeof msg.id === "string" ? msg.id : msg.id.toString(),
            senderId: msg.senderId,
            text: msg.text,
            timestamp: msg.timestamp,
          }));
          setMessages(normalized);
        }
      } catch (err) {
        console.error("Failed to load chat history", err);
        if (!cancelled) {
          setError("Unable to load messages right now.");
        }
      } finally {
        if (!cancelled) {
          setHistoryLoading(false);
        }
      }
    };

    if (messages.length === 0) {
      fetchHistory();
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversation?.id, isOpen, setMessages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user?.id || !conversation?.id) {
      return;
    }

    try {
      setError(null);
      const response = await postChatMessage({
        conversationId: conversation.id,
        senderId: user.id,
        text: newMessage.trim(),
      });

      addMessage({
        id: response.id?.toString?.() ?? String(response.id),
        senderId: response.senderId,
        text: response.text,
        timestamp: response.timestamp,
      });

      setNewMessage("");
    } catch (err) {
      console.error("Failed to send chat message", err);
      setError("Unable to send message. Please try again.");
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    if (Number.isNaN(date.getTime())) {
      return "";
    }
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const isMessageFromCustomer = useCallback(
    (message: ChatMessage) => message.senderId === user?.id,
    [user?.id]
  );

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card
        className={`w-96 bg-white/95 backdrop-blur-sm shadow-2xl border border-gray-200/80 flex flex-col transition-all duration-300 ${
          isMinimized 
            ? "h-14 rounded-2xl" 
            : "h-[600px] rounded-3xl"
        }`}
      >
        {/* Header */}
        <header
          className="p-4 flex items-center justify-between bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-3xl cursor-pointer hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
          onClick={() => setIsMinimized(false)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-xl">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-sm">{activeEmployeeName}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${
                  isConnected 
                    ? "bg-green-500/20 text-green-100" 
                    : "bg-yellow-500/20 text-yellow-100"
                }`}>
                  {isConnected ? (
                    <Wifi className="h-3 w-3" />
                  ) : (
                    <WifiOff className="h-3 w-3" />
                  )}
                  {isConnected ? "Live Chat" : "Connecting..."}
                </div>
                <span className="text-xs text-blue-100">{employeeRole}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized((prev) => !prev);
              }}
              className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-colors"
            >
              {isMinimized ? (
                <Maximize2 className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  onClose();
                }}
                className="h-8 w-8 text-white hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </header>

        {socketError && (
          <div className="bg-red-50 border-b border-red-200 px-4 py-2">
            <p className="text-xs text-red-600 text-center">{socketError}</p>
          </div>
        )}

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <ScrollArea className="flex-1 p-4 bg-gradient-to-b from-slate-50 to-white">
              {authLoading || loadingConversation ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-3" />
                  <p className="text-sm">Preparing your chat...</p>
                </div>
              ) : !isAuthenticated ? (
                <div className="flex flex-col items-center justify-center h-40 text-center text-gray-600 space-y-3">
                  <div className="p-3 bg-slate-100 rounded-2xl">
                    <User className="h-8 w-8 text-gray-400" />
                  </div>
                  <div>
                    <p className="font-medium text-sm text-gray-900 mb-1">
                      Sign in to start chatting
                    </p>
                    <p className="text-xs text-gray-500">
                      Login to message our support team
                    </p>
                  </div>
                </div>
              ) : historyLoading ? (
                <div className="flex flex-col items-center justify-center h-40 text-gray-500">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-3" />
                  <p className="text-sm">Loading messages...</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center py-8">
                      <div className="p-4 bg-blue-50 rounded-2xl inline-block mb-4">
                        <MessageCircle className="h-10 w-10 text-blue-500 mx-auto" />
                      </div>
                      <p className="text-sm text-gray-600 mb-6">
                        Say hello! Your service advisor will respond shortly.
                      </p>
                      <div className="space-y-3">
                        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          Quick questions:
                        </p>
                        {quickQuestions.map((question) => (
                          <Button
                            key={question}
                            variant="outline"
                            size="sm"
                            className="w-full text-xs justify-start h-auto py-3 px-4 rounded-xl border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors text-gray-700 hover:text-gray-900"
                            onClick={() => setNewMessage(question)}
                          >
                            {question}
                          </Button>
                        ))}
                      </div>
                    </div>
                  )}

                  {messages.map((message) => {
                    const fromCustomer = isMessageFromCustomer(message);
                    return (
                      <div
                        key={message.id}
                        className={`flex ${fromCustomer ? "justify-end" : "justify-start"}`}
                      >
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm transition-all duration-200 ${
                            fromCustomer
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-white text-gray-900 border border-gray-200 rounded-bl-md"
                          }`}
                        >
                          <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                            {message.text}
                          </p>
                          <div className={`mt-2 flex items-center gap-1 text-xs ${
                            fromCustomer ? "text-blue-100" : "text-gray-500"
                          }`}>
                            <span>{formatTime(message.timestamp)}</span>
                            {fromCustomer && (
                              <span className="opacity-70">• Sent</span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200/60 bg-white rounded-b-3xl">
              {error && (
                <div className="mb-3 bg-red-50 border border-red-200 rounded-xl px-3 py-2">
                  <p className="text-xs text-red-600 text-center">{error}</p>
                </div>
              )}

              <div className="flex gap-3">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={
                    !isAuthenticated
                      ? "Please login to send messages"
                      : isConnected
                      ? "Type your message here..."
                      : "Connecting to chat..."
                  }
                  disabled={!isAuthenticated || !isConnected}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSend();
                    }
                  }}
                  className="flex-1 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                />
                <Button
                  onClick={handleSend}
                  disabled={
                    !newMessage.trim() || !isConnected || !isAuthenticated
                  }
                  className="h-12 w-12 p-0 rounded-xl bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:text-gray-500 transition-all duration-200 shadow-sm"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}