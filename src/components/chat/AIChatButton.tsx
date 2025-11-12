import { Button } from "../ui/button"
import { Bot } from "lucide-react"

interface AIChatButtonProps {
  onClick: () => void
}

export function AIChatButton({ onClick }: AIChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className="fixed top-24 right-4 bg-[#020079] hover:bg-[#020079]/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 ease-in-out z-50"
    >
      <Bot className="h-10 w-10" />
      <span className="sr-only">Open AI Chat</span>
    </Button>
  )
}