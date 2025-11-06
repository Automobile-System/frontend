"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="bg-teal-600 -mx-6 -mt-6 px-6 py-4 mb-4">
          <DialogTitle className="text-2xl font-bold text-white">
            Compose Message
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="recipient">
              Recipient <span className="text-red-500">*</span>
            </Label>
            <select
              id="recipient"
              className={cn(
                "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background text-gray-500",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "[&>option]:text-white-900"
              )}
              value={formData.recipient}
              onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
            >
              <option value="" className="text-gray-500">Select recipient...</option>
              {RECIPIENTS.map((recipient) => (
                <option key={recipient} value={recipient} className="text-gray-900">
                  {recipient}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="subject">
              Subject <span className="text-red-500">*</span>
            </Label>
            <Input
              id="subject"
              placeholder="Enter message subject"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="message">
              Message <span className="text-red-500">*</span>
            </Label>
            <textarea
              id="message"
              className={cn(
                "flex min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                "disabled:cursor-not-allowed disabled:opacity-50"
              )}
              placeholder="Type your message here..."
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            />
          </div>

          <Button
            className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium text-base h-11"
            onClick={handleSend}
          >
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
