"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface ComposeMessageData {
  recipient: string;
  subject: string;
  message: string;
}

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (data: ComposeMessageData) => void;
}

export default function ComposeMessageModal({
  isOpen,
  onClose,
  onSend
}: ComposeMessageModalProps) {
  const [formData, setFormData] = useState<ComposeMessageData>({
    recipient: "",
    subject: "",
    message: ""
  });

  const RECIPIENTS = [
    "Ruwan Silva - Engine Specialist",
    "Nimal Fernando - Bodywork & Paint",
    "Kasun Mendis - Brake Systems",
    "Amal Wickramasinghe - Transmission Specialist",
    "Kamal Perera - Electrical Systems",
    "All Employees",
    "Customer: John Smith",
    "Customer: Sarah Johnson"
  ];

  const handleSend = () => {
    if (formData.recipient && formData.subject && formData.message) {
      onSend(formData);
      setFormData({ recipient: "", subject: "", message: "" });
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-white">
        <DialogTitle className="sr-only">Compose Message</DialogTitle>
        <DialogDescription className="sr-only">Send a message to employees or customers</DialogDescription>
        
        {/* Header */}
        <div className="bg-[#020079] text-white -mx-6 -mt-6 px-6 py-6 mb-6 border-b-4 border-[#FFD700]">
          <h2 className="text-3xl font-bebas tracking-wide">COMPOSE MESSAGE</h2>
        </div>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
              Recipient <span className="text-[#FFD700]">*</span>
            </Label>
            <select
              id="recipient"
              className={cn(
                "flex h-12 w-full rounded-md border border-[#020079]/20 bg-white px-4 py-2 font-roboto text-[#020079]",
                "focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            >
              <option value="" className="text-[#020079]/40">Select recipient...</option>
              {RECIPIENTS.map((recipient) => (
                <option key={recipient} value={recipient}>
                  {recipient}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
              Subject <span className="text-[#FFD700]">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="Enter message subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="h-12 border-[#020079]/20 focus:border-[#020079]/40 font-roboto text-[#020079]"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message" className="font-roboto text-[#020079]/70 font-semibold uppercase tracking-wide text-sm">
              Message <span className="text-[#FFD700]">*</span>
            </Label>
            <textarea
              id="message"
              className="flex min-h-[150px] w-full rounded-md border border-[#020079]/20 bg-white px-4 py-3 font-roboto text-[#020079] placeholder:text-[#020079]/40 focus:outline-none focus:ring-2 focus:ring-[#020079]/20 focus:border-[#020079]"
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button
            className="w-full h-14 bg-[#020079] hover:bg-[#03009B] text-white font-bebas text-xl tracking-wide transition-all duration-200 shadow-lg hover:shadow-xl"
            onClick={handleSend}
          >
            SEND MESSAGE
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
