import { NextRequest, NextResponse } from 'next/server'

// You'll need to install @google/generative-ai
// npm install @google/generative-ai

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Check if Gemini API key is available
    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      console.log('Gemini API key not found, using fallback response')
      console.log('To enable Gemini AI: Set GEMINI_API_KEY environment variable')
      return NextResponse.json({ 
        reply: getFallbackResponse(message)
      })
    }

    console.log('Using Gemini API for chat response')

    try {
      // Import Gemini AI
      const { GoogleGenerativeAI } = await import('@google/generative-ai')
      const genAI = new GoogleGenerativeAI(apiKey)
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

      // Create a context-aware prompt for e-commerce
      const prompt = `You are an intelligent shopping assistant for an AI-powered e-commerce platform. 
      You help customers find products, answer questions about shipping, returns, sizing, and provide helpful shopping advice.
      
      Our store sells:
      - Electronics (smartphones, laptops, gadgets)
      - Clothing (various sizes and styles)
      - Books
      - Home & Garden items
      
      Store policies:
      - Free shipping on orders over $50
      - 30-day return policy for most items (14 days for electronics)
      - Standard delivery: 3-5 business days
      - Express shipping available for next-day delivery
      
      Please respond helpfully and professionally to this customer message: "${message}"
      
      Keep responses concise (under 150 words) and friendly. If asked about specific products, suggest they browse our categories or use the search function.`

      const result = await model.generateContent(prompt)
      const response = await result.response
      const reply = response.text()

      return NextResponse.json({ reply })
    } catch (geminiError) {
      console.log('Gemini API failed, using fallback:', geminiError)
      return NextResponse.json({ 
        reply: getFallbackResponse(message)
      })
    }

  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json({ 
      reply: "I'm sorry, I'm having trouble responding right now. Please try again or contact our support team."
    })
  }
}

function getFallbackResponse(message: string): string {
  const lowerMessage = message.toLowerCase()
  
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return "Hello! Welcome to our AI-powered store. I'm here to help you find exactly what you're looking for. What can I assist you with today?"
  }
  
  if (lowerMessage.includes('electronics') || lowerMessage.includes('phone') || lowerMessage.includes('laptop')) {
    return "Great choice! Our electronics section features the latest smartphones, laptops, and gadgets. Would you like me to show you our top-rated products?"
  }
  
  if (lowerMessage.includes('clothing') || lowerMessage.includes('shirt') || lowerMessage.includes('jacket')) {
    return "Our clothing collection has something for everyone! From casual wear to professional attire, we have high-quality options. What style are you looking for?"
  }
  
  if (lowerMessage.includes('shipping') || lowerMessage.includes('delivery')) {
    return "We offer free shipping on orders over $50! Standard delivery takes 3-5 business days, and express shipping is available for next-day delivery. Would you like more details?"
  }
  
  if (lowerMessage.includes('return') || lowerMessage.includes('refund')) {
    return "We have a 30-day return policy for most items. Electronics have a 14-day return window. Items must be in original condition. Need help with a specific return?"
  }
  
  if (lowerMessage.includes('help') || lowerMessage.includes('support')) {
    return "I'm here to help! You can ask me about products, shipping, returns, or anything else. You can also browse our categories or use our search feature to find what you need."
  }
  
  return "Thanks for your message! I'm here to help you with product recommendations, shipping information, returns, and more. What would you like to know about our store?"
}
