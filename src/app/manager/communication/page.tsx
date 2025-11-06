"use client";

import { Button } from "@/components/ui/button";
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
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="text-4xl">💬</span>
        <h1 className="text-3xl font-bold text-gray-800">Communication Center</h1>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-8">
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6"
          onClick={() => setShowBroadcastModal(true)}
        >
          📢 Broadcast to All Employees
        </Button>
        <Button
          className="bg-teal-600 hover:bg-teal-700 text-white font-semibold px-6"
          onClick={() => setShowComposeModal(true)}
        >
          ✉️ Compose Message
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-5 gap-6">
        {/* Inbox - Left Side (2 columns) */}
        <div className="col-span-2 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Inbox</h2>
          
          <div className="space-y-2">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  message.isAlert 
                    ? "bg-blue-50 hover:bg-blue-100 border-l-4 border-orange-500" 
                    : selectedMessage?.id === message.id
                    ? "bg-blue-100"
                    : "bg-blue-50 hover:bg-blue-100"
                }`}
                onClick={() => setSelectedMessage(message)}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-gray-800 text-sm">
                    {message.senderType === "customer" && "Customer: "}
                    {message.senderType === "employee" && "Employee: "}
                    {message.isAlert && "⚠️ "}
                    {message.sender}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 mb-1">{message.subject}</p>
                <p className="text-xs text-gray-500">{message.timestamp}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Message Thread - Right Side (3 columns) */}
        <div className="col-span-3 bg-white rounded-lg shadow-md p-6 flex flex-col" style={{ height: '600px' }}>
          <h2 className="text-xl font-bold text-gray-800 mb-4">Message Thread</h2>
          
          {selectedMessage ? (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto mb-4">
                {(messageThreads[selectedMessage.id] || []).map((thread, index) => (
                  <div key={index} className="mb-6">
                    <h3 className="font-bold text-gray-800 mb-2">{thread.sender}</h3>
                    <p className="text-gray-700 mb-2">{thread.content}</p>
                    <p className="text-xs text-gray-500">{thread.timestamp}</p>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              <div>
                <textarea
                  className="w-full border text-black border-gray-300 rounded-lg p-4 mb-4 min-h-[120px] resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="Type your response here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold h-12"
                  onClick={handleSendReply}
                >
                  Send Message
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Select a message to view the conversation
            </div>
          )}
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
