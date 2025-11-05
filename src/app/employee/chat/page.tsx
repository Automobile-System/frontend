"use client";

import { useState } from "react";
import EmployeeLayout from "@/components/layout/EmployeeLayout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { Send } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  taskInfo?: {
    vehicle: string;
    service: string;
  };
  isEmployee?: boolean;
}

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  taskInfo?: {
    vehicle: string;
    service: string;
  };
}

export default function Chat() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");

  // Sample chat data
  const [chats] = useState<{
    customer: Chat[];
    manager: Chat[];
  }>({
    customer: [
      {
        id: "1",
        name: "John Doe",
        lastMessage: "Oil change progress update...",
        timestamp: "5 min ago",
        taskInfo: {
          vehicle: "Toyota Corolla",
          service: "Oil Change",
        },
      },
      // Add more customer chats...
    ],
    manager: [
      {
        id: "2",
        name: "Sarah Manager",
        lastMessage: "Please check the new task assigned",
        timestamp: "1 hour ago",
      },
      // Add more manager chats...
    ],
  });

  // Sample messages
  const [messages] = useState<Message[]>([
    {
      id: "1",
      sender: "John Doe",
      content: "Hi! How's my oil change going?",
      timestamp: "10:30 AM",
    },
    {
      id: "2",
      sender: "Employee",
      content:
        "Hello! I'm working on it now. About 65% complete. Should be done in 20 minutes.",
      timestamp: "10:33 AM",
      isEmployee: true,
    },
    {
      id: "3",
      sender: "John Doe",
      content: "Great! Thanks for the update.",
      timestamp: "10:36 AM",
    },
  ]);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Add logic to send message
    setNewMessage("");
  };

  return (
    <EmployeeLayout>
      <div className="h-[calc(100vh-8rem)]">
        <Tabs defaultValue="customer" className="h-full">
          <div className="flex h-full gap-4">
            {/* Chat List */}
            <Card className="w-80 h-full">
              <div className="p-4 border-b">
                <TabsList className="w-full">
                  <TabsTrigger value="customer" className="flex-1">
                    Customer
                  </TabsTrigger>
                  <TabsTrigger value="manager" className="flex-1">
                    Manager
                  </TabsTrigger>
                </TabsList>
              </div>

              <ScrollArea className="h-[calc(100%-4rem)]">
                <TabsContent value="customer" className="m-0">
                  {chats.customer.map((chat) => (
                    <button
                      key={chat.id}
                      className="w-full p-4 text-left hover:bg-gray-100 border-b"
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{chat.name}</h3>
                        <span className="text-xs text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                      {chat.taskInfo && (
                        <div className="text-xs text-gray-500 mt-1">
                          🚗 {chat.taskInfo.vehicle} - {chat.taskInfo.service}
                        </div>
                      )}
                    </button>
                  ))}
                </TabsContent>

                <TabsContent value="manager" className="m-0">
                  {chats.manager.map((chat) => (
                    <button
                      key={chat.id}
                      className="w-full p-4 text-left hover:bg-gray-100 border-b"
                      onClick={() => setActiveChat(chat.id)}
                    >
                      <div className="flex justify-between">
                        <h3 className="font-medium">{chat.name}</h3>
                        <span className="text-xs text-gray-500">
                          {chat.timestamp}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {chat.lastMessage}
                      </p>
                    </button>
                  ))}
                </TabsContent>
              </ScrollArea>
            </Card>

            {/* Chat Window */}
            <Card className="flex-1 flex flex-col">
              {activeChat ? (
                <>
                  {/* Chat Header */}
                  <div className="p-4 border-b">
                    <div className="flex items-center gap-3">
                      <Avatar />
                      <div>
                        <h2 className="font-medium">John Doe</h2>
                        <p className="text-sm text-gray-500">
                          Toyota Corolla (KA-1234) - Oil Change
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${
                            message.isEmployee ? "justify-end" : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.isEmployee
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <span className="text-xs text-gray-500 mt-1 block">
                              {message.timestamp}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  {/* Message Input */}
                  <div className="p-4 border-t">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        handleSendMessage();
                      }}
                      className="flex gap-2"
                    >
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        className="flex-1"
                      />
                      <Button type="submit">
                        <Send className="h-4 w-4" />
                      </Button>
                    </form>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-gray-500">
                  Select a chat to start messaging
                </div>
              )}
            </Card>
          </div>
        </Tabs>
      </div>
    </EmployeeLayout>
  );
}
