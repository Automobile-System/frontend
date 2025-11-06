"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface BroadcastModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function BroadcastModal({
  isOpen,
  onClose,
  onSend
}: BroadcastModalProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message);
      setMessage("");
      onClose();
    }
  };

  const handleCancel = () => {
    setMessage("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg bg-white border-2 border-[#020079]/20">
        <DialogTitle className="text-xl font-bebas text-[#020079] tracking-wide mb-2">
          BROADCAST MESSAGE
        </DialogTitle>
        <DialogDescription className="text-sm font-roboto text-[#020079]/60 mb-4">
          Enter broadcast message to all employees:
        </DialogDescription>
        
        <div className="py-4">
          <textarea
            className="w-full bg-white border-2 border-[#020079]/20 rounded-lg p-3 text-[#020079] placeholder-[#020079]/40 font-roboto min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]"
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-[#FFD700] hover:bg-[#E6C200] text-[#020079] font-roboto font-semibold px-8 h-12"
              onClick={handleSend}
            >
              OK
            </Button>
            <Button
              className="bg-[#020079]/10 hover:bg-[#020079]/20 text-[#020079] font-roboto font-semibold px-8 h-12"
              onClick={handleCancel}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
