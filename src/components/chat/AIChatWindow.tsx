// components/AIChatWindow.tsx
import { useState, useEffect, useRef } from "react"
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, User } from "lucide-react"
import { Button } from "../ui/button"
import { Card } from "../ui/card"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "../ui/separator"
import { Input } from "../ui/input"

interface Message {
  id: number
  text: string
  isBot: boolean
  timestamp: Date
}

interface AIChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

export function AIChatWindow({ isOpen, onClose }: AIChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. How can I help you with your automotive needs today?",
      isBot: true,
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Quick responses for better UX
  const quickResponses = [
    "Schedule service appointment",
    "Get maintenance tips",
    "Vehicle diagnostics help",
    "Pricing information"
  ]

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = async (message?: string) => {
    const finalMessage = message || inputMessage
    if (!finalMessage.trim()) return

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: finalMessage,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate AI response with contextual answers
    setTimeout(() => {
      setIsTyping(false)
      let response = ""
      
      if (finalMessage.toLowerCase().includes('appointment') || finalMessage.toLowerCase().includes('schedule')) {
        response = "I can help you schedule a service appointment! Please let me know your preferred date and time, and I'll check availability. You can also tell me what service you need - oil change, brake inspection, tire rotation, etc."
      } else if (finalMessage.toLowerCase().includes('price') || finalMessage.toLowerCase().includes('cost')) {
        response = "Service costs vary based on your vehicle and needs. For an oil change, prices typically range from $50-$100. Brake services start around $200. Would you like a detailed quote for a specific service?"
      } else if (finalMessage.toLowerCase().includes('diagnostic') || finalMessage.toLowerCase().includes('check engine')) {
        response = "I can help with basic diagnostics! Please describe any warning lights, unusual sounds, or performance issues you're experiencing. For comprehensive diagnostics, I recommend scheduling an in-person inspection."
      } else if (finalMessage.toLowerCase().includes('maintenance') || finalMessage.toLowerCase().includes('tip')) {
        response = "Regular maintenance is key! Here are quick tips: Check oil monthly, rotate tires every 6,000 miles, replace air filters yearly, and monitor tire pressure weekly. Need specific advice for your vehicle?"
      } else {
        response = "I understand you're asking about our automotive services. Our team specializes in maintenance, repairs, and diagnostics. Would you like to schedule an appointment or learn more about specific services?"
      }
      
      const botMessage: Message = {
        id: messages.length + 2,
        text: response,
        isBot: true,
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, botMessage])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Card 
        className={`w-96 bg-white/95 backdrop-blur-sm shadow-2xl flex flex-col ${
          isMinimized ? 'h-14' : 'h-[600px]'
        } rounded-xl border-2 border-blue-600`}
        style={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Header */}
        <div 
          className="p-4 flex items-center justify-between relative overflow-hidden bg-gray-900 text-white cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg bg-white text-gray-900 animate-pulse">
                <Bot className="h-5 w-5" />
              </div>
              {/* Online status indicator */}
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900 animate-ping"></div>
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></div>
            </div>
            <div>
              <div className="font-semibold text-sm flex items-center gap-2">
                AI Assistant
                <Sparkles className="h-3 w-3" />
              </div>
              <div className="text-xs text-gray-300">
                {isTyping ? "Typing..." : "Online • Ready to help"}
              </div>
            </div>
          </div>

          <div className="flex gap-1 relative z-10">
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation()
                setIsMinimized(!isMinimized)
              }}
              className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <ScrollArea className="flex-grow p-4 overflow-y-auto h-[calc(100%-130px)]">
              <div className="space-y-4 min-h-full">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                      message.isBot ? "justify-start" : "justify-end"
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gray-100 text-gray-600">
                        <Bot className="h-4 w-4" />
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 animate-in fade-in duration-200 shadow-sm ${
                        message.isBot 
                          ? "rounded-tl-sm bg-gray-100 text-gray-900 border border-gray-200" 
                          : "rounded-tr-sm bg-gray-900 text-white"
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <span className={`text-xs mt-2 block text-right ${
                        message.isBot ? "text-gray-500" : "text-gray-300"
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gray-900 text-white">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}
                
                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-3 items-center animate-in fade-in duration-200">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 text-gray-600">
                      <Bot className="h-4 w-4" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center bg-gray-100 text-gray-600">
                      <span className="text-sm mr-2">Thinking</span>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}

                {/* Quick Responses */}
                {messages.length === 1 && !isTyping && (
                  <div className="space-y-2 pt-4">
                    <p className="text-sm text-center text-gray-500">
                      Quick questions you can ask:
                    </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {quickResponses.map((response, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleSendMessage(response)}
                          className="rounded-full text-xs px-3 py-1 h-auto border-gray-300 text-gray-700 bg-white hover:bg-gray-50 hover:scale-105 transition-all"
                        >
                          {response}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <Separator className="bg-gray-200" />

            {/* Input Area */}
            <div className="p-4 flex gap-2">
              <div className="flex-1 rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-1 border border-gray-300 bg-white">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Ask me anything about automotive services..."
                  onKeyPress={handleKeyPress}
                  className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-gray-900 placeholder:text-gray-500"
                />
              </div>
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputMessage.trim() || isTyping}
                className="rounded-xl h-11 w-11 p-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 bg-gray-900 text-white hover:bg-gray-800"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}