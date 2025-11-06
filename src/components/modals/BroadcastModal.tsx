"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
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
      <DialogContent className="sm:max-w-lg bg-gray-900 text-white border-none">
        <div className="py-6">
          <h3 className="text-lg font-semibold mb-4">This page says</h3>
          
          <p className="text-sm mb-4">Enter broadcast message to all employees:</p>
          
          <textarea
            className="w-full bg-transparent border-2 border-white rounded-lg p-3 text-white placeholder-gray-400 min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder=""
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <div className="flex justify-end gap-3 mt-6">
            <Button
              className="bg-pink-400 hover:bg-pink-500 text-gray-900 font-semibold px-8 rounded-full"
              onClick={handleSend}
            >
              OK
            </Button>
            <Button
              className="bg-gray-700 hover:bg-gray-600 text-white font-semibold px-8 rounded-full"
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
