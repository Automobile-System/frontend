"use client";

import { MessageCircle, X } from 'lucide-react';

export type ChatButtonProps = {
  isOpen?: boolean;
  onClick?: () => void;
  className?: string;
};

export function ChatButton({ isOpen = false, onClick = () => {}, className = "" }: ChatButtonProps) {
  return (
    <div className="fixed right-6 bottom-6 z-50">
      <button
        onClick={onClick}
        className={`flex items-center gap-2 bg-gradient-to-r from-[#020079] to-[#01024D] hover:from-[#03009B] hover:to-[#020079] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group hover:scale-105 ${className}`}
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
    </div>
  );
}