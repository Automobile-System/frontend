// components/AIChatWindow.tsx
import { useState, useEffect, useRef } from "react"
import { Bot, Send, X, Minimize2, Maximize2, Sparkles, User, AlertCircle, Loader } from "lucide-react"
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
  isError?: boolean
}

interface AIChatWindowProps {
  isOpen: boolean
  onClose: () => void
}

interface ChatErrorResponse {
  error: string
  error_code: string
  message: string
}

interface ChatSuccessResponse {
  response: string
}

// Format text with markdown-like syntax
const formatMessageText = (text: string) => {
  const lines = text.split('\n')
  
  return lines.map((line, lineIndex) => {
    // Handle bullet points
    if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
      const content = line.trim().substring(2)
      return (
        <div key={lineIndex} className="flex gap-2 my-1">
          <span className="text-gray-600">•</span>
          <span>{formatInlineText(content)}</span>
        </div>
      )
    }
    
    // Handle numbered lists
    const numberedMatch = line.trim().match(/^(\d+)\.\s+(.+)/)
    if (numberedMatch) {
      return (
        <div key={lineIndex} className="flex gap-2 my-1">
          <span className="text-gray-600 font-medium">{numberedMatch[1]}.</span>
          <span>{formatInlineText(numberedMatch[2])}</span>
        </div>
      )
    }
    
    // Regular line
    if (line.trim()) {
      return <div key={lineIndex} className="my-1">{formatInlineText(line)}</div>
    }
    
    // Empty line (spacing)
    return <div key={lineIndex} className="h-2"></div>
  })
}

// Format inline text (bold, italic, code)
const formatInlineText = (text: string) => {
  const parts: (string | React.ReactElement)[] = []
  let currentIndex = 0
  let keyCounter = 0

  // Regex patterns for formatting
  const boldPattern = /\*\*(.+?)\*\*/g
  const italicPattern = /\*(.+?)\*/g
  const codePattern = /`(.+?)`/g
  
  // Find all matches
  const matches: Array<{ index: number; length: number; type: string; content: string }> = []
  
  let match
  while ((match = boldPattern.exec(text)) !== null) {
    matches.push({ index: match.index, length: match[0].length, type: 'bold', content: match[1] })
  }
  
  while ((match = italicPattern.exec(text)) !== null) {
    // Skip if it's part of a bold pattern
    const isBold = matches.some(m => m.type === 'bold' && match!.index >= m.index && match!.index < m.index + m.length)
    if (!isBold) {
      matches.push({ index: match.index, length: match[0].length, type: 'italic', content: match[1] })
    }
  }
  
  while ((match = codePattern.exec(text)) !== null) {
    matches.push({ index: match.index, length: match[0].length, type: 'code', content: match[1] })
  }
  
  // Sort matches by index
  matches.sort((a, b) => a.index - b.index)
  
  // Process text with matches
  matches.forEach((m) => {
    // Add text before the match
    if (m.index > currentIndex) {
      parts.push(text.substring(currentIndex, m.index))
    }
    
    // Add formatted content
    keyCounter++
    if (m.type === 'bold') {
      parts.push(<strong key={keyCounter} className="font-semibold text-gray-900">{m.content}</strong>)
    } else if (m.type === 'italic') {
      parts.push(<em key={keyCounter} className="italic">{m.content}</em>)
    } else if (m.type === 'code') {
      parts.push(<code key={keyCounter} className="px-1.5 py-0.5 bg-gray-200 rounded text-xs font-mono">{m.content}</code>)
    }
    
    currentIndex = m.index + m.length
  })
  
  // Add remaining text
  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex))
  }
  
  return parts.length > 0 ? parts : text
}

export function AIChatWindow({ isOpen, onClose }: AIChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [rateLimitCountdown, setRateLimitCountdown] = useState(0)
  const [sessionId] = useState(() => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const API_BASE_URL = "http://localhost:8000"

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      initializeChat()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  useEffect(() => {
    if (rateLimitCountdown > 0) {
      const timer = setTimeout(() => {
        setRateLimitCountdown(rateLimitCountdown - 1)
      }, 1000)
      return () => clearTimeout(timer)
    } else if (rateLimitCountdown === 0 && isRateLimited) {
      setIsRateLimited(false)
    }
  }, [rateLimitCountdown, isRateLimited])

  const initializeChat = async () => {
    setIsInitializing(true)
    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_input: "Hello"
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        handleErrorResponse(data as ChatErrorResponse)
      } else {
        const botMessage: Message = {
          id: 1,
          text: (data as ChatSuccessResponse).response,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages([botMessage])
      }
    } catch {
      const errorMessage: Message = {
        id: 1,
        text: "Unable to connect to the AI service. Please check your connection and try again.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      }
      setMessages([errorMessage])
    } finally {
      setIsInitializing(false)
    }
  }

  const handleErrorResponse = (errorData: ChatErrorResponse) => {
    let errorMessage = errorData.message

    if (errorData.error_code === 'QUOTA_EXCEEDED') {
      setIsRateLimited(true)
      setRateLimitCountdown(60)
      errorMessage = `${errorData.message} Please wait ${60} seconds before trying again.`
    }

    const botMessage: Message = {
      id: messages.length + 1,
      text: errorMessage,
      isBot: true,
      timestamp: new Date(),
      isError: true
    }
    setMessages((prev) => [...prev, botMessage])
  }

  const handleSendMessage = async () => {
    const finalMessage = inputMessage.trim()
    if (!finalMessage || isTyping || isRateLimited) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: finalMessage,
      isBot: false,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          session_id: sessionId,
          user_input: finalMessage
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        handleErrorResponse(data as ChatErrorResponse)
      } else {
        const botMessage: Message = {
          id: messages.length + 2,
          text: (data as ChatSuccessResponse).response,
          isBot: true,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botMessage])
      }
    } catch {
      const errorMessage: Message = {
        id: messages.length + 2,
        text: "Network error: Unable to send your message. Please check your connection.",
        isBot: true,
        timestamp: new Date(),
        isError: true
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
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
                {isInitializing ? (
                  <div className="flex flex-col items-center justify-center h-full min-h-[400px] space-y-4">
                    <div className="relative">
                      <Loader className="h-12 w-12 text-gray-900 animate-spin" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Bot className="h-6 w-6 text-gray-400" />
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-sm font-medium text-gray-900">Initializing AI Assistant</p>
                      <p className="text-xs text-gray-500">Connecting to automotive intelligence...</p>
                    </div>
                  </div>
                ) : (
                  <>
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                          message.isBot ? "justify-start" : "justify-end"
                        }`}
                      >
                        {message.isBot && (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                            message.isError ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                          }`}>
                            <Bot className="h-4 w-4" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-4 py-3 animate-in fade-in duration-200 shadow-sm ${
                            message.isBot 
                              ? message.isError
                                ? "rounded-tl-sm bg-red-50 text-red-900 border border-red-200"
                                : "rounded-tl-sm bg-gray-100 text-gray-900 border border-gray-200"
                              : "rounded-tr-sm bg-gray-900 text-white"
                          }`}
                        >
                          <div className="text-sm leading-relaxed">
                            {formatMessageText(message.text)}
                          </div>
                          <span className={`text-xs mt-2 block text-right ${
                            message.isBot 
                              ? message.isError 
                                ? "text-red-500" 
                                : "text-gray-500"
                              : "text-gray-300"
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
                          <span className="text-sm mr-2">Processing</span>
                          <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                          <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Auto-scroll anchor */}
                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>
            </ScrollArea>

            <Separator className="bg-gray-200" />

            {/* Input Area */}
            <div className="p-4">
              {isRateLimited && (
                <div className="mb-3 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                  <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-amber-900">Rate limit reached</p>
                    <p className="text-xs text-amber-700 mt-1">
                      Please wait {rateLimitCountdown} seconds before sending another message.
                    </p>
                  </div>
                </div>
              )}
              <div className="flex gap-2">
                <div className="flex-1 rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-1 border border-gray-300 bg-white">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder={isRateLimited ? "Please wait..." : "Ask me anything about automotive services..."}
                    onKeyPress={handleKeyPress}
                    disabled={isTyping || isRateLimited || isInitializing}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-gray-900 placeholder:text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>
                <Button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isTyping || isRateLimited || isInitializing}
                  className="rounded-xl h-11 w-11 p-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 bg-gray-900 text-white hover:bg-gray-800"
                >
                  {isTyping ? (
                    <Loader className="h-5 w-5 animate-spin" />
                  ) : (
                    <Send className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}