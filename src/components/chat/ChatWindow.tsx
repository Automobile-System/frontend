// components/ChatWithUs.tsx
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Send, User, Minimize2, Maximize2, X, MessageCircle, Phone, Video, MoreVertical, Paperclip, Smile } from 'lucide-react';
import Image from 'next/image';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'employee';
  timestamp: Date;
  read?: boolean;
}

interface ChatWindowProps {
  employeeName?: string;
  employeeRole?: string;
  employeeAvatar?: string;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
}

export function ChatWindow({ 
  employeeName = "Sarah Johnson", 
  employeeRole = "Service Technician", 
  employeeAvatar,
  isOpen,
  onClose 
}: ChatWindowProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm Sarah, your assigned service technician. I'm here to help with your automotive needs and answer any questions about your vehicle.",
      sender: 'employee',
      timestamp: new Date(Date.now() - 300000),
      read: true
    }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sample conversation starters
  const quickQuestions = [
    "What's the status of my vehicle?",
    "Can you explain the repair needed?",
    "When will my service be completed?",
    "Could you send me photos?"
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    // Simulate online status
    const interval = setInterval(() => {
      setIsOnline(Math.random() > 0.1);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      read: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
    setIsTyping(true);

    // Simulate employee response with different reply times
    const replyTime = 1000 + Math.random() * 2000;
    
    setTimeout(() => {
      setIsTyping(false);
      const responses = [
        "I'll check the status of your vehicle and get back to you shortly.",
        "Thanks for your message. Let me look into that for you.",
        "I understand your concern. Our team is working on it right now.",
        "I can help with that! Let me pull up your service details.",
        "Great question! Let me check the progress and update you."
      ];
      
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'employee',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, response]);
    }, replyTime);
  };

  const handleQuickQuestion = (question: string) => {
    setNewMessage(question);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
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
          className="p-4 flex items-center justify-between relative overflow-hidden bg-gradient-to-r from-gray-900 to-gray-800 text-white cursor-pointer"
          onClick={() => setIsMinimized(false)}
        >
          {/* Animated background */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-y-1/2 -translate-x-1/2"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white rounded-full translate-y-1/2 translate-x-1/2"></div>
          </div>

          <div className="flex items-center gap-3 relative z-10">
            <div className="relative">
              {employeeAvatar ? (
                <Image 
                  src={employeeAvatar} 
                  alt={employeeName || "Employee Avatar"}
                  width={40}
                  height={40}
                  className="rounded-full bg-white flex items-center justify-center font-semibold text-sm shadow-lg"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center font-semibold text-sm shadow-lg text-gray-900">
                  {getInitials(employeeName)}
                </div>
              )}
              {/* Online status indicator */}
              <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                isOnline ? 'bg-green-400 animate-pulse' : 'bg-gray-400'
              }`}></div>
            </div>
            <div>
              <div className="font-semibold text-sm">{employeeName}</div>
              <div className="text-xs text-gray-300 flex items-center gap-1">
                <span>{employeeRole}</span>
                <span>•</span>
                <span className={isOnline ? 'text-green-300' : 'text-gray-400'}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-1 relative z-10">
            <div className="flex gap-1 mr-2">
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
              >
                <Phone className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
              >
                <Video className="h-4 w-4" />
              </Button>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(!isMinimized);
              }}
              className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
            >
              {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
            </Button>
            {onClose && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="hover:bg-white/20 text-white h-8 w-8 transition-all hover:scale-110"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Messages Area */}
            <ScrollArea className="flex-grow p-4 overflow-y-auto h-[calc(100%-130px)]">
              <div className="space-y-4 min-h-full">
                {/* Welcome message */}
                <div className="text-center">
                  <div className="inline-block bg-gray-100 rounded-full px-3 py-1">
                    <p className="text-xs text-gray-600">
                      Today {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Empty state */}
                {messages.length === 0 && (
                  <div className="flex flex-col items-center justify-center h-full text-center px-4 py-20 text-gray-500">
                    <MessageCircle className="h-16 w-16 mb-4 opacity-40" />
                    <p className="text-sm font-medium text-gray-700">
                      Start a conversation with {employeeName.split(' ')[0]}
                    </p>
                    <p className="text-xs mt-2 opacity-70">
                      They typically reply within minutes
                    </p>
                    
                    {/* Quick questions */}
                    <div className="mt-6 space-y-2 w-full max-w-xs">
                      <p className="text-xs font-medium text-gray-600 mb-3">Quick questions:</p>
                      {quickQuestions.map((question, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          onClick={() => handleQuickQuestion(question)}
                          className="w-full text-xs justify-start h-auto py-2 px-3 border-gray-300 text-gray-700 bg-white hover:bg-gray-50 transition-all text-left"
                        >
                          {question}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 animate-in slide-in-from-bottom-2 duration-300 ${
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.sender === 'employee' && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gradient-to-r from-gray-700 to-gray-600 text-white text-xs font-semibold shadow">
                        {getInitials(employeeName)}
                      </div>
                    )}
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-3 animate-in fade-in duration-200 shadow-sm ${
                        message.sender === 'user' 
                          ? 'rounded-tr-sm bg-gray-900 text-white' 
                          : 'rounded-tl-sm bg-gray-100 text-gray-900 border border-gray-200'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      <div className={`flex items-center gap-2 mt-2 ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}>
                        <span className={`text-xs ${
                          message.sender === 'user' ? 'text-gray-300' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                        </span>
                        {message.sender === 'user' && message.read && (
                          <span className="text-xs text-green-400">✓ Read</span>
                        )}
                      </div>
                    </div>
                    {message.sender === 'user' && (
                      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 bg-gray-900 text-white">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                  <div className="flex gap-3 items-center animate-in fade-in duration-200">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r from-gray-700 to-gray-600 text-white text-xs font-semibold">
                      {getInitials(employeeName)}
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-tl-sm flex gap-1 items-center bg-gray-100 text-gray-600">
                      <span className="text-sm mr-2">Typing</span>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full animate-bounce bg-gray-400" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              {/* Quick actions */}
              <div className="flex items-center gap-2 mb-3">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <Smile className="h-4 w-4" />
                </Button>
                <div className="flex-1"></div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex gap-2">
                <div className="flex-1 rounded-xl overflow-hidden transition-all focus-within:ring-2 focus-within:ring-gray-900 focus-within:ring-offset-1 border border-gray-300 bg-white">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    onKeyPress={handleKeyPress}
                    className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3 text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Button 
                  onClick={handleSend}
                  disabled={!newMessage.trim() || isTyping}
                  className="rounded-xl h-11 w-11 p-0 transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100 bg-gray-900 text-white hover:bg-gray-800"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}