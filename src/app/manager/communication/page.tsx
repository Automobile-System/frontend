"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState } from "react";
import BroadcastModal from "@/components/modals/BroadcastModal";
import ComposeMessageModal from "@/components/modals/ComposeMessageModal";

interface Message {
  id: string;
  sender: string;
  senderType: "customer" | "employee" | "system";
  subject: string;
  preview: string;
  content: string;
  timestamp: string;
  isAlert?: boolean;
}

interface MessageThread {
  sender: string;
  content: string;
  timestamp: string;
}

export default function CommunicationPage() {
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [showComposeModal, setShowComposeModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageThreads, setMessageThreads] = useState<{ [key: string]: MessageThread[] }>({
    "1": [
      {
        sender: "John Smith",
        content: "Hi, I wanted to check on the timeline for my custom modification project. When can I expect it to be completed?",
        timestamp: "Today at 2:30 PM"
      }
    ],
    "2": [
      {
        sender: "Ruwan Silva",
        content: "I completed task #1243 ahead of the scheduled time. The oil change service has been done and the vehicle is ready for pickup.",
        timestamp: "5 hours ago"
      }
    ],
    "3": [
      {
        sender: "System",
        content: "Task #1245 has been on hold for 24 hours due to parts delay. Please take necessary action to resolve this issue.",
        timestamp: "1 day ago"
      }
    ],
    "4": [
      {
        sender: "Sarah Johnson",
        content: "Thank you for the excellent restoration work! The car looks amazing and runs perfectly. I'm very satisfied with your service.",
        timestamp: "2 days ago"
      }
    ],
    "5": [
      {
        sender: "Kamal Perera",
        content: "Need additional parts for electrical repair on the vehicle. The diagnostic shows we need to replace the alternator. Requesting approval for parts order.",
        timestamp: "2 days ago"
      }
    ]
  });
  const [replyText, setReplyText] = useState("");

  const INBOX_MESSAGES: Message[] = [
    {
      id: "1",
      sender: "John Smith",
      senderType: "customer",
      subject: "Question about custom modification project timeline...",
      preview: "Hi, I wanted to check on the timeline...",
      content: "Hi, I wanted to check on the timeline for my custom modification project. When can I expect it to be completed?",
      timestamp: "2 hours ago"
    },
    {
      id: "2",
      sender: "Ruwan Silva",
      senderType: "employee",
      subject: "Task #1243 completed ahead of schedule",
      preview: "The oil change service has been completed...",
      content: "I completed task #1243 ahead of the scheduled time. The oil change service has been done and the vehicle is ready for pickup.",
      timestamp: "5 hours ago"
    },
    {
      id: "3",
      sender: "System Alert",
      senderType: "system",
      subject: "Task #1245 held for 24 hours - action required",
      preview: "Parts delay notification...",
      content: "Task #1245 has been on hold for 24 hours due to parts delay. Please take necessary action to resolve this issue.",
      timestamp: "1 day ago",
      isAlert: true
    },
    {
      id: "4",
      sender: "Sarah Johnson",
      senderType: "customer",
      subject: "Thank you for the excellent restoration work!",
      preview: "I'm very satisfied with the service...",
      content: "Thank you for the excellent restoration work! The car looks amazing and runs perfectly. I'm very satisfied with your service.",
      timestamp: "2 days ago"
    },
    {
      id: "5",
      sender: "Kamal Perera",
      senderType: "employee",
      subject: "Need additional parts for electrical repair...",
      preview: "Requesting approval for parts order...",
      content: "Need additional parts for electrical repair on the vehicle. The diagnostic shows we need to replace the alternator. Requesting approval for parts order.",
      timestamp: "2 days ago"
    }
  ];

  const [messages] = useState(INBOX_MESSAGES);

  const handleSendReply = () => {
    if (replyText.trim() && selectedMessage) {
      const newThread: MessageThread = {
        sender: "Manager",
        content: replyText,
        timestamp: "Just now"
      };
      
      setMessageThreads({
        ...messageThreads,
        [selectedMessage.id]: [...(messageThreads[selectedMessage.id] || []), newThread]
      });
      setReplyText("");
    }
  };

  const handleBroadcast = (message: string) => {
    console.log("Broadcasting message:", message);
    // Here you would send the broadcast message to all employees
    setShowBroadcastModal(false);
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-4xl font-bebas text-[#020079] mb-2">
          COMMUNICATION CENTER
        </h1>
        <p className="font-roboto text-[#020079]/60">Manage messages with employees and customers</p>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button
          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold px-6 h-12"
          onClick={() => setShowBroadcastModal(true)}
        >
          Broadcast to All Employees
        </Button>
        <Button
          className="bg-[#020079] hover:bg-[#03009B] text-white font-roboto font-semibold px-6 h-12"
          onClick={() => setShowComposeModal(true)}
        >
          Compose Message
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-6">
        {/* Inbox - Left Side (2 columns) */}
        <div className="col-span-2">
          <Card className="border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all">
            <CardHeader className="border-b-2 border-[#020079]/10">
              <CardTitle className="text-xl font-bebas text-[#020079] tracking-wide">INBOX</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-2">
                {messages.map((message) => (
                  <Card
                    key={message.id}
                    className={`cursor-pointer transition-all ${
                      message.isAlert 
                        ? "border-l-4 border-[#FFD700] bg-[#FFD700]/5 hover:bg-[#FFD700]/10" 
                        : selectedMessage?.id === message.id
                        ? "border-2 border-[#020079] bg-[#020079]/5"
                        : "border-2 border-[#020079]/20 hover:border-[#020079]/40"
                    }`}
                    onClick={() => setSelectedMessage(message)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-1">
                        <h3 className="font-bebas text-[#020079] text-sm tracking-wide">
                          {message.senderType === "customer" && "CUSTOMER: "}
                          {message.senderType === "employee" && "EMPLOYEE: "}
                          {message.isAlert && "SYSTEM ALERT"}
                          {!message.isAlert && message.sender.toUpperCase()}
                        </h3>
                      </div>
                      <p className="text-sm font-roboto text-[#020079]/70 mb-1">{message.subject}</p>
                      <p className="text-xs font-roboto text-[#020079]/50">{message.timestamp}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Message Thread - Right Side (3 columns) */}
        <div className="col-span-3">
          <Card className="border-2 border-[#020079]/20 hover:border-[#020079]/40 transition-all" style={{ height: '600px' }}>
            <CardHeader className="border-b-2 border-[#020079]/10">
              <CardTitle className="text-xl font-bebas text-[#020079] tracking-wide">MESSAGE THREAD</CardTitle>
            </CardHeader>
            <CardContent className="p-6 flex flex-col h-[calc(100%-80px)]">
              {selectedMessage ? (
                <>
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto mb-4 space-y-4">
                    {(messageThreads[selectedMessage.id] || []).map((thread, index) => (
                      <div key={index} className="border-l-4 border-[#020079] pl-4 py-2">
                        <h3 className="font-bebas text-[#020079] mb-2 tracking-wide">{thread.sender.toUpperCase()}</h3>
                        <p className="font-roboto text-[#020079] mb-2">{thread.content}</p>
                        <p className="text-xs font-roboto text-[#020079]/50">{thread.timestamp}</p>
                      </div>
                    ))}
                  </div>

                  {/* Reply Box */}
                  <div>
                    <textarea
                      className="w-full border-2 border-[#020079]/20 rounded-lg p-4 mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079] font-roboto text-[#020079] placeholder:text-[#020079]/40"
                      placeholder="Type your response here..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                    />
                    <Button
                      className="w-full bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold h-12"
                      onClick={handleSendReply}
                    >
                      Send Message
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center text-[#020079]/40 font-roboto">
                  Select a message to view the conversation
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <BroadcastModal
        isOpen={showBroadcastModal}
        onClose={() => setShowBroadcastModal(false)}
        onSend={handleBroadcast}
      />

      <ComposeMessageModal
        isOpen={showComposeModal}
        onClose={() => setShowComposeModal(false)}
        onSend={(data) => {
          console.log("Composing message:", data);
          setShowComposeModal(false);
        }}
      />
    </div>
  );
}
