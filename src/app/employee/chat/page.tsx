"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Loader2, Send, Users, MessageCircle, Car, Wifi, WifiOff } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import {
  getConversationMessages,
  getEmployeeConversationsApi,
  postChatMessage,
} from "@/services/api";
import { useChat, ChatMessage } from "@/hooks/websockets/useChat";

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

export default function Chat() {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [conversationsLoading, setConversationsLoading] = useState(false);
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const {
    messages,
    setMessages,
    addMessage,
    isConnected,
    error: socketError,
  } = useChat(selectedConversationId, { enabled: !!selectedConversationId });

  const activeConversation = useMemo(
    () =>
      conversations.find((conv) => conv.id === selectedConversationId) ?? null,
    [conversations, selectedConversationId]
  );

  const loadConversations = useCallback(async () => {
    if (!user?.id) {
      return;
    }
    setConversationsLoading(true);
    setFetchError(null);
    try {
      const data: Conversation[] = await getEmployeeConversationsApi(user.id);
      setConversations(data);
      if (!selectedConversationId && data.length > 0) {
        setSelectedConversationId(data[0].id);
      }
    } catch (error) {
      console.error("Failed to load conversations", error);
      setFetchError("Unable to load conversations. Please try again.");
    } finally {
      setConversationsLoading(false);
    }
  }, [selectedConversationId, user?.id]);

  useEffect(() => {
    if (!isAuthLoading) {
      loadConversations();
    }
  }, [isAuthLoading, loadConversations]);

  useEffect(() => {
    if (!selectedConversationId) {
      return;
    }

    setHistoryLoading(true);
    setFetchError(null);

    getConversationMessages(selectedConversationId)
      .then(
        (
          history: Array<{
            id: number | string;
            senderId: string;
            text: string;
            timestamp: string;
          }>
        ) => {
          const normalized: ChatMessage[] = history.map((msg) => ({
            id: typeof msg.id === "string" ? msg.id : msg.id.toString(),
            senderId: msg.senderId,
            text: msg.text,
            timestamp: msg.timestamp,
          }));
          setMessages(normalized);
        }
      )
      .catch((error) => {
        console.error("Failed to load conversation history", error);
        setFetchError("Unable to load conversation history.");
      })
      .finally(() => setHistoryLoading(false));
  }, [selectedConversationId, setMessages]);

  useEffect(() => {
    if (!selectedConversationId || messages.length === 0) {
      return;
    }
    const latest = messages[messages.length - 1];
    setConversations((prev) =>
      prev.map((conversation) =>
        conversation.id === selectedConversationId
          ? {
              ...conversation,
              lastMessageSnippet: latest.text,
              lastMessageTime: latest.timestamp,
            }
          : conversation
      )
    );
  }, [messages, selectedConversationId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !user?.id) {
      return;
    }

    try {
      setFetchError(null);

      if (!selectedConversationId) {
        throw new Error("Conversation not ready");
      }

      const response = await postChatMessage({
        conversationId: selectedConversationId,
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
    } catch (error) {
      console.error("Failed to send chat message", error);
      setFetchError("Unable to send message. Please retry.");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTimestamp = (value: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (value: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const formatMessageDate = (value: string | null) => {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { weekday: 'long', month: "short", day: "numeric" });
    }
  };

  const isMessageFromEmployee = useCallback(
    (message: ChatMessage) => message.senderId === user?.id,
    [user?.id]
  );

  const getInitials = (name: string | null) => {
    if (!name) return "CU";
    return name
      .split(" ")
      .map((part) => part.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: ChatMessage[] } = {};
    
    messages.forEach((message) => {
      const date = formatMessageDate(message.timestamp);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  }, [messages]);

  return (
    <EmployeeLayout>
      <div className="h-[calc(100vh-8rem)] bg-slate-50 py-6">
        <div className="mx-auto flex h-full w-full max-w-6xl gap-6">
          {/* Conversations Sidebar - Fixed width and proper height */}
          <Card className="h-full w-[400px] rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col">
            <Tabs defaultValue="customer" className="h-full flex flex-col">
              <div className="border-b border-slate-200 px-6 py-5 bg-white rounded-t-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <MessageCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-slate-900">Messages</h1>
                    <p className="text-sm text-slate-500">Chat with customers</p>
                  </div>
                </div>
                <TabsList className="w-full bg-slate-100 p-1 text-slate-900">
                <TabsTrigger value="customer" className="flex-1 flex items-center gap-2 text-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900">
                    <Users className="h-4 w-4" />
                    Customers
                  </TabsTrigger>
                  <TabsTrigger value="manager" className="flex-1 flex items-center gap-2 text-slate-900 data-[state=active]:bg-white data-[state=active]:text-slate-900">
                    <Users className="h-4 w-4" />
                    Managers
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="flex-1">
                <TabsContent value="customer" className="m-0 p-4">
                  {conversationsLoading && (
                    <div className="flex flex-col items-center justify-center py-12 text-sm text-slate-500">
                      <Loader2 className="h-8 w-8 animate-spin mb-3 text-blue-500" />
                      <p>Loading conversations...</p>
                    </div>
                  )}

                  {!conversationsLoading && conversations.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                      <div className="p-4 bg-slate-100 rounded-2xl mb-4">
                        <MessageCircle className="h-8 w-8 text-slate-400" />
                      </div>
                      <h3 className="font-semibold text-slate-900 mb-2">No conversations yet</h3>
                      <p className="text-sm text-slate-500">
                        Customer conversations will appear here when they start messaging you.
                      </p>
                    </div>
                  )}

                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      className={`w-full rounded-xl p-4 text-left transition-all duration-200 mb-3 border ${
                        conversation.id === selectedConversationId
                          ? "bg-blue-50 border-blue-200 shadow-sm"
                          : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
                      }`}
                      onClick={() => setSelectedConversationId(conversation.id)}
                    >
                      <div className="flex items-start gap-3">
                        <Avatar className="h-12 w-12 rounded-xl bg-blue-500 text-white text-sm font-semibold flex items-center justify-center">
                          {getInitials(conversation.recipientName)}
                        </Avatar>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-slate-900 truncate">
                              {conversation.recipientName ?? "Unnamed Customer"}
                            </h3>
                            <span className="whitespace-nowrap text-xs text-slate-400 font-medium flex-shrink-0">
                              {formatDate(conversation.lastMessageTime)}
                            </span>
                          </div>
                          
                          <p className="text-sm text-slate-600 line-clamp-2 mb-2 leading-relaxed">
                            {conversation.lastMessageSnippet ?? "No messages yet"}
                          </p>
                          
                          {conversation.associatedVehicle && (
                            <div className="flex items-center gap-1 text-xs text-slate-500">
                              <Car className="h-3 w-3" />
                              <span className="truncate">{conversation.associatedVehicle}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </TabsContent>

                <TabsContent value="manager" className="m-0 p-4">
                  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="p-4 bg-slate-100 rounded-2xl mb-4">
                      <Users className="h-8 w-8 text-slate-400" />
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-2">Manager Chats</h3>
                    <p className="text-sm text-slate-500">
                      Chat with managers and team members.
                    </p>
                  </div>
                </TabsContent>
              </ScrollArea>
            </Tabs>
          </Card>

          {/* Chat Area - Fixed to ensure input is always visible */}
          <Card className="flex-1 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col min-h-0">
            {selectedConversationId && activeConversation ? (
              <>
                {/* Chat Header */}
                <div className="border-b border-slate-200 px-6 py-4 bg-white rounded-t-2xl">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 rounded-xl bg-blue-500 text-white text-lg font-semibold flex items-center justify-center">
                      {getInitials(activeConversation.recipientName)}
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-slate-900">
                          {activeConversation.recipientName ?? "Customer"}
                        </h2>
                        <div className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${
                          isConnected 
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}>
                          {isConnected ? (
                            <Wifi className="h-3 w-3" />
                          ) : (
                            <WifiOff className="h-3 w-3" />
                          )}
                          {isConnected ? "Live" : "Connecting..."}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-1">
                        {activeConversation.associatedVehicle && (
                          <div className="flex items-center gap-1.5 text-sm text-slate-600">
                            <Car className="h-4 w-4" />
                            <span>{activeConversation.associatedVehicle}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {socketError && (
                    <p className="mt-2 text-xs text-red-500 bg-red-50 px-3 py-1.5 rounded-lg border border-red-200">
                      {socketError}
                    </p>
                  )}
                </div>

                {/* Messages Area - Fixed height to ensure input stays at bottom */}
                <ScrollArea className="flex-1 px-6 py-4 bg-slate-50">
                  {historyLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="flex flex-col items-center gap-3 text-slate-500">
                        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                        <p className="text-sm">Loading messages...</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-4 py-2">
                      {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                        <div key={date}>
                          {/* Date separator */}
                          <div className="flex items-center justify-center my-6">
                            <div className="bg-slate-200 px-3 py-1 rounded-full">
                              <span className="text-xs font-medium text-slate-600">{date}</span>
                            </div>
                          </div>
                          
                          {/* Messages for this date */}
                          {dateMessages.map((message) => {
                            const fromEmployee = isMessageFromEmployee(message);
                            return (
                              <div
                                key={message.id}
                                className={`flex ${fromEmployee ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                                    fromEmployee
                                      ? "bg-blue-500 text-white rounded-br-md"
                                      : "bg-white text-slate-900 border border-slate-200 rounded-bl-md"
                                  }`}
                                >
                                  <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                                    {message.text}
                                  </p>
                                  <div className={`mt-2 flex items-center gap-1 text-xs ${
                                    fromEmployee ? "text-blue-100" : "text-slate-400"
                                  }`}>
                                    <span>{formatTimestamp(message.timestamp)}</span>
                                    {fromEmployee && (
                                      <span className="opacity-70">• Sent</span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ))}
                      
                      {messages.length === 0 && (
                        <div className="flex flex-col items-center justify-center py-16 text-center">
                          <div className="p-4 bg-slate-100 rounded-2xl mb-4">
                            <MessageCircle className="h-8 w-8 text-slate-400" />
                          </div>
                          <h3 className="font-semibold text-slate-900 mb-2">No messages yet</h3>
                          <p className="text-sm text-slate-500 max-w-sm">
                            Start the conversation by sending the first message below.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </ScrollArea>

                {/* Message Input - Always visible at bottom */}
                <div className="border-t border-slate-200 bg-white px-6 py-4 rounded-b-2xl">
                  {fetchError && (
                    <div className="mb-3 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
                      <p className="text-xs text-red-600">{fetchError}</p>
                    </div>
                  )}
                  <div className="flex gap-3">
                    <Input
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder={
                        isConnected
                          ? "Type your message..."
                          : "Connecting to chat..."
                      }
                      disabled={!isConnected}
                      className="flex-1 rounded-xl border border-slate-300 bg-white text-sm focus:border-blue-500 focus:ring-blue-500 text-slate-900"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!newMessage.trim() || !isConnected}
                      className="rounded-xl px-6 bg-blue-500 hover:bg-blue-600"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center h-full rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 text-slate-500 p-8">
                <div className="p-4 bg-slate-100 rounded-2xl mb-6">
                  <MessageCircle className="h-12 w-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">Select a conversation</h3>
                <p className="text-sm text-slate-500 text-center max-w-sm">
                  Choose a conversation from the sidebar to start messaging with customers.
                </p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </EmployeeLayout>
  );
}