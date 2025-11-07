"use client"

import { ChatWidget } from "@/components/chat/ChatWidget"
import { AIChatWidget } from "@/components/chat/AIChatWidget"

export function ClientWidgets() {
  return (
    <div className="fixed top-24 right-4 z-50 space-y-4">
      <ChatWidget />
      <AIChatWidget />
    </div>
  )
}
