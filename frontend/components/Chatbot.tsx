'use client'

import { useState, useRef, useEffect } from 'react'
import { ChatBubbleLeftRightIcon, XMarkIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
}

const mockResponses = [
  "Hi! I'm your shopping assistant. How can I help you today?",
  "I can help you find products, check availability, or answer questions about our store.",
  "Looking for something specific? I can recommend products based on your preferences.",
  "Our electronics section has great deals on smartphones and laptops!",
  "Would you like me to help you find products in a specific category?",
  "I can help you with sizing, product details, or shipping information.",
  "Our customer service team is available 24/7 for any additional support you need.",
  "Is there a particular price range you're looking for?",
  "I'd be happy to help you compare different products!",
  "Don't forget to check out our current promotions and discounts!"
]

const quickActions = [
  "Show me electronics",
  "What's on sale?",
  "Help with sizing",
  "Shipping info",
  "Return policy"
]

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI shopping assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Listen for custom event to open chatbot
    const handleOpenChatbot = () => {
      setIsOpen(true)
    }

    window.addEventListener('openChatbot', handleOpenChatbot)
    return () => window.removeEventListener('openChatbot', handleOpenChatbot)
  }, [])

  const generateBotResponse = async (userMessage: string): Promise<string> => {
    try {
      // Try to use Gemini API first
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        return data.reply || getFallbackResponse(userMessage)
      }
    } catch (error) {
      console.log('Gemini API unavailable, using fallback responses')
    }

    // Fallback to intelligent pattern matching
    return getFallbackResponse(userMessage)
  }

  const getFallbackResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    if (lowerMessage.includes('electronics') || lowerMessage.includes('phone') || lowerMessage.includes('laptop')) {
      return "Great choice! Our electronics section features the latest smartphones, laptops, and gadgets. Would you like me to show you our top-rated products?"
    }
    
    if (lowerMessage.includes('sale') || lowerMessage.includes('discount') || lowerMessage.includes('deal')) {
      return "We have amazing deals right now! Check out our electronics with up to 30% off, and don't miss our clothing sale. Would you like me to show you specific categories?"
    }
    
    if (lowerMessage.includes('size') || lowerMessage.includes('sizing')) {
      return "I can help with sizing! For clothing, we have a detailed size guide. For electronics, I can provide dimensions and specifications. What product are you interested in?"
    }
    
    if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
      return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express shipping is available for next-day delivery. Would you like more details?"
    }
    
    if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
      return "We have a 30-day return policy for most items. Items must be in original condition. Electronics have a 14-day return window. Need help with a specific return?"
    }
    
    if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! Welcome to our store. I'm here to help you find exactly what you're looking for. What can I assist you with today?"
    }
    
    // Default responses
    return mockResponses[Math.floor(Math.random() * mockResponses.length)]
  }

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    }
    
    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Get bot response
    try {
      const botReply = await generateBotResponse(text)
      
      // Add bot response after a short delay for better UX
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: botReply,
          isBot: true,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000 + Math.random() * 1000) // Random delay between 1-2 seconds
    } catch (error) {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I'm sorry, I'm having trouble responding right now. Please try again.",
          isBot: true,
          timestamp: new Date()
        }
        
        setMessages(prev => [...prev, botResponse])
        setIsTyping(false)
      }, 1000)
    }
  }

  const handleQuickAction = (action: string) => {
    handleSendMessage(action)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSendMessage(inputText)
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-200 z-50"
        aria-label="Open chat"
      >
        {isOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <ChatBubbleLeftRightIcon className="h-6 w-6" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-50">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Shopping Assistant</h3>
            <p className="text-sm text-primary-100">AI-powered help</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isBot
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-primary-600 text-white'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-1">
                {quickActions.map((action) => (
                  <button
                    key={action}
                    onClick={() => handleQuickAction(action)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={!inputText.trim() || isTyping}
                className="bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 text-white p-2 rounded-lg transition-colors"
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
