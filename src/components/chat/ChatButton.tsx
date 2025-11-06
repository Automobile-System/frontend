"use client"

import { MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { ChatWindow } from './ChatWindow';

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Fixed Chat Button */}
      <div className="fixed right-6 bottom-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105"
        >
          {isOpen ? (
            <>
              <X className="h-5 w-5" />
              <span className="font-bold font-roboto">Close Chat</span>
            </>
          ) : (
            <>
              <MessageCircle className="h-5 w-5 animate-bounce" />
              <span className="font-bold font-roboto">Chat with Us</span>
            </>
          )}
        </button>

        {/* Chat Window */}
        {isOpen && (
          <div className="absolute bottom-20 right-0 w-[380px]">
            <ChatWindow
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
              employeeName="Service Advisor"
              employeeRole="Auto Miraj Kurunagala"
            />
          </div>
        )}
      </div>
    </>
  );
}