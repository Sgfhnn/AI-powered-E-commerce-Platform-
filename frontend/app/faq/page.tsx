'use client'

import React, { useState } from 'react'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'

interface FAQItem {
  question: string
  answer: string
  category: string
}

const faqData: FAQItem[] = [
  {
    category: 'Orders & Shipping',
    question: 'How long does shipping take?',
    answer: 'Standard shipping takes 3-5 business days. Express shipping (1-2 business days) and overnight delivery are also available. Free shipping is included on all orders over $50.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Can I track my order?',
    answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email. You can also track your order by logging into your account and visiting the "My Orders" section.'
  },
  {
    category: 'Orders & Shipping',
    question: 'Do you ship internationally?',
    answer: 'Currently, we only ship within the United States. We\'re working on expanding to international shipping soon.'
  },
  {
    category: 'Returns & Refunds',
    question: 'What is your return policy?',
    answer: 'We offer a 30-day return policy for most items in original condition. Electronics have a 14-day return window. Returns are free and easy - just request a return label through your account.'
  },
  {
    category: 'Returns & Refunds',
    question: 'How do I return an item?',
    answer: 'Log into your account, go to "My Orders", find the item you want to return, and click "Request Return". We\'ll email you a prepaid return label.'
  },
  {
    category: 'Returns & Refunds',
    question: 'When will I receive my refund?',
    answer: 'Refunds are processed within 3-5 business days after we receive your returned item. The refund will appear on your original payment method.'
  },
  {
    category: 'Account & Payment',
    question: 'Is it safe to shop on your website?',
    answer: 'Absolutely! We use industry-standard SSL encryption to protect your personal and payment information. All transactions are secure and encrypted.'
  },
  {
    category: 'Account & Payment',
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, and Google Pay.'
  },
  {
    category: 'Account & Payment',
    question: 'Do I need to create an account to shop?',
    answer: 'While you can browse products without an account, you\'ll need to create one to complete purchases and track orders. Creating an account also gives you access to exclusive deals and faster checkout.'
  },
  {
    category: 'Products & Inventory',
    question: 'Are your products authentic?',
    answer: 'Yes, all our products are 100% authentic and sourced directly from manufacturers or authorized distributors. We guarantee the authenticity of every item we sell.'
  },
  {
    category: 'Products & Inventory',
    question: 'What if an item is out of stock?',
    answer: 'If an item is out of stock, you can sign up for restock notifications. We\'ll email you as soon as the item becomes available again.'
  },
  {
    category: 'AI Assistant',
    question: 'How does the AI chatbot work?',
    answer: 'Our AI shopping assistant is powered by advanced AI technology to help you find products, answer questions, and provide personalized recommendations. It\'s available 24/7 to assist you.'
  },
  {
    category: 'AI Assistant',
    question: 'Can the AI help me find specific products?',
    answer: 'Yes! Our AI assistant can help you find products based on your needs, budget, and preferences. Just describe what you\'re looking for, and it will provide personalized recommendations.'
  }
]

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))]
  const filteredFAQs = selectedCategory === 'All' 
    ? faqData 
    : faqData.filter(item => item.category === selectedCategory)

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Find answers to common questions about shopping, shipping, returns, and more.
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                      {faq.category}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-900 mt-1">
                      {faq.question}
                    </h3>
                  </div>
                  {openItems.includes(index) ? (
                    <ChevronUpIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-12 bg-blue-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h2>
            <p className="text-gray-600 mb-6">
              Can't find the answer you're looking for? Our customer support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Contact Support
              </a>
              <button
                onClick={() => {
                  const chatEvent = new CustomEvent('openChatbot')
                  window.dispatchEvent(chatEvent)
                }}
                className="bg-white text-blue-600 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors font-medium border border-blue-600"
              >
                Chat with AI Assistant
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
