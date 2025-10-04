import { ArrowUturnLeftIcon, CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/outline'

export default function ReturnsPage() {
  const returnSteps = [
    {
      step: 1,
      title: "Initiate Return",
      description: "Contact our support team or use your account dashboard to start a return request"
    },
    {
      step: 2,
      title: "Package Items",
      description: "Pack items in original packaging with all accessories and documentation"
    },
    {
      step: 3,
      title: "Ship Back",
      description: "Use the prepaid return label we provide or drop off at a designated location"
    },
    {
      step: 4,
      title: "Get Refund",
      description: "Once we receive and inspect your return, we'll process your refund within 3-5 business days"
    }
  ]

  const returnableItems = [
    "Clothing and accessories in original condition",
    "Unopened electronics with all original packaging",
    "Books in resellable condition",
    "Home goods without damage or wear"
  ]

  const nonReturnableItems = [
    "Opened software or digital products",
    "Personalized or customized items",
    "Perishable goods",
    "Items damaged by misuse"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <ArrowUturnLeftIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
          <p className="text-xl text-gray-600">
            Easy returns within 30 days of purchase
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Return Policy</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ClockIcon className="h-5 w-5 text-primary-600 mr-2" />
                Return Window
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>• <strong>Most items:</strong> 30 days from delivery</li>
                <li>• <strong>Electronics:</strong> 14 days from delivery</li>
                <li>• <strong>Final sale items:</strong> No returns</li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Refund Method</h3>
              <ul className="space-y-2 text-gray-600">
                <li>• Refunds processed to original payment method</li>
                <li>• Processing time: 3-5 business days</li>
                <li>• Free return shipping on defective items</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">How to Return Items</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="bg-primary-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">{step.step}</span>
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <a href="/contact" className="btn-primary mr-4">
              Start Return Request
            </a>
            <a href="/profile" className="btn-outline">
              View My Orders
            </a>
          </div>
        </div>

        {/* Returnable vs Non-Returnable Items */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-green-800">
              <CheckCircleIcon className="h-6 w-6 mr-2" />
              Returnable Items
            </h3>
            <ul className="space-y-2">
              {returnableItems.map((item, index) => (
                <li key={index} className="text-green-700 flex items-start">
                  <CheckCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-red-50 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center text-red-800">
              <XCircleIcon className="h-6 w-6 mr-2" />
              Non-Returnable Items
            </h3>
            <ul className="space-y-2">
              {nonReturnableItems.map((item, index) => (
                <li key={index} className="text-red-700 flex items-start">
                  <XCircleIcon className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-primary-50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Need Help with Your Return?</h2>
          <p className="text-gray-700 mb-6">
            Our customer service team is here to help with any questions about returns or exchanges.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="btn-primary">
              Contact Support
            </a>
            <a href="/help-center" className="btn-outline">
              Visit Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
