import { TruckIcon, ClockIcon, GlobeAltIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'

export default function ShippingInfoPage() {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      time: "3-5 business days",
      cost: "Free on orders over $50",
      description: "Our most popular shipping option with reliable delivery"
    },
    {
      name: "Express Shipping",
      time: "1-2 business days",
      cost: "$9.99",
      description: "Fast delivery for when you need it quickly"
    },
    {
      name: "Next Day Delivery",
      time: "Next business day",
      cost: "$19.99",
      description: "Get your order tomorrow (order by 2 PM)"
    },
    {
      name: "International Shipping",
      time: "7-14 business days",
      cost: "Varies by location",
      description: "Worldwide delivery to most countries"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <TruckIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
          <p className="text-xl text-gray-600">
            Fast, reliable delivery options to get your products to you
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {shippingOptions.map((option, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-start space-x-4">
                <div className="bg-primary-100 p-3 rounded-lg">
                  <TruckIcon className="h-6 w-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-2">{option.name}</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <ClockIcon className="h-4 w-4" />
                      <span>{option.time}</span>
                    </div>
                    <div className="font-semibold text-primary-600">{option.cost}</div>
                    <p className="mt-2">{option.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Policies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Shipping Policies</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <ShieldCheckIcon className="h-5 w-5 text-primary-600 mr-2" />
                Order Processing
              </h3>
              <p className="text-gray-600">
                Orders are processed within 1-2 business days. You'll receive a confirmation email 
                once your order ships with tracking information.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center">
                <GlobeAltIcon className="h-5 w-5 text-primary-600 mr-2" />
                International Shipping
              </h3>
              <p className="text-gray-600">
                We ship to most countries worldwide. International customers are responsible 
                for any customs duties or taxes that may apply.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Free Shipping Threshold</h3>
              <p className="text-gray-600">
                Enjoy free standard shipping on all orders over $50 within the continental US. 
                This offer applies to standard shipping only.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Delivery Restrictions</h3>
              <p className="text-gray-600">
                We currently do not ship to PO boxes for express or next-day delivery. 
                Some remote areas may have extended delivery times.
              </p>
            </div>
          </div>
        </div>

        {/* Tracking Information */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Track Your Order</h2>
          <p className="text-gray-700 mb-6">
            Once your order ships, you'll receive an email with tracking information. 
            You can also track your order in your account dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/profile" className="btn-primary">
              View My Orders
            </a>
            <a href="/contact" className="btn-outline">
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
