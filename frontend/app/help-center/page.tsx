import { QuestionMarkCircleIcon, ChatBubbleLeftRightIcon, EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/outline'

export default function HelpCenterPage() {
  const faqs = [
    {
      question: "How do I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Electronics have a 14-day return window. Items must be in original condition with tags attached."
    },
    {
      question: "How does AI-powered search work?",
      answer: "Our AI search understands natural language queries and finds products based on your intent, not just keywords. Try describing what you need in everyday language."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for more details."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "You can modify or cancel your order within 1 hour of placing it. After that, please contact our customer service team for assistance."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, Apple Pay, Google Pay, and other secure payment methods through Stripe."
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <QuestionMarkCircleIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Help Center</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions and get the help you need
          </p>
        </div>

        {/* Contact Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <ChatBubbleLeftRightIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Chat with our AI assistant for instant help</p>
            <button className="btn-primary">Start Chat</button>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <EnvelopeIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email Support</h3>
            <p className="text-gray-600 mb-4">Get detailed help via email</p>
            <a href="mailto:support@aistore.com" className="btn-outline">
              Send Email
            </a>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <PhoneIcon className="h-12 w-12 text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
            <p className="text-gray-600 mb-4">Speak with our support team</p>
            <a href="tel:+15551234567" className="btn-outline">
              Call Now
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="bg-primary-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Order & Shipping</h3>
            <ul className="space-y-2">
              <li><a href="/shipping-info" className="text-primary-600 hover:text-primary-700">Shipping Information</a></li>
              <li><a href="/returns" className="text-primary-600 hover:text-primary-700">Returns & Exchanges</a></li>
              <li><a href="/size-guide" className="text-primary-600 hover:text-primary-700">Size Guide</a></li>
            </ul>
          </div>
          
          <div className="bg-primary-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Account & Legal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-primary-600 hover:text-primary-700">Privacy Policy</a></li>
              <li><a href="/terms" className="text-primary-600 hover:text-primary-700">Terms of Service</a></li>
              <li><a href="/cookies" className="text-primary-600 hover:text-primary-700">Cookie Policy</a></li>
              <li><a href="/accessibility" className="text-primary-600 hover:text-primary-700">Accessibility</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
