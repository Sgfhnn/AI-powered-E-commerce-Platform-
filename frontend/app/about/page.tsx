import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-12 sm:py-16 lg:py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            About AI Store
          </h1>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto">
            Revolutionizing e-commerce with artificial intelligence and cutting-edge technology
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Our Story */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-700 text-lg leading-relaxed mb-4">
                AI Store was founded with a simple mission: to make online shopping smarter, faster, and more personalized. 
                We believe that artificial intelligence can transform the way people discover and purchase products online.
              </p>
              <p className="text-gray-700 text-lg leading-relaxed">
                Our team of experienced developers and AI specialists have created a platform that understands your needs 
                and helps you find exactly what you're looking for, even when you don't know how to describe it.
              </p>
            </div>

            {/* Our Mission */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Mission</h2>
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <p className="text-gray-700 text-lg leading-relaxed">
                  To democratize access to intelligent shopping experiences by providing AI-powered search and 
                  recommendation systems that understand context, intent, and personal preferences. We're building 
                  the future of e-commerce, one smart interaction at a time.
                </p>
              </div>
            </div>

            {/* Key Features */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">What Makes Us Different</h2>
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary-600">Semantic Search</h3>
                  <p className="text-gray-700">
                    Our AI understands the meaning behind your search queries, not just keywords. 
                    Search for "something warm for winter" and get relevant results.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary-600">Smart Recommendations</h3>
                  <p className="text-gray-700">
                    Machine learning algorithms analyze your behavior and preferences to suggest 
                    products you'll love before you even know you want them.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary-600">Secure Payments</h3>
                  <p className="text-gray-700">
                    Powered by Stripe, our payment system ensures your transactions are secure 
                    and your personal information is protected.
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold mb-3 text-primary-600">Real-time Updates</h3>
                  <p className="text-gray-700">
                    Stay informed with real-time inventory updates, order tracking, and 
                    personalized notifications about products you care about.
                  </p>
                </div>
              </div>
            </div>

            {/* Team */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Our Team</h2>
              <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  We're a diverse team of engineers, designers, and AI researchers passionate about creating 
                  exceptional user experiences. Our team combines expertise in:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Machine Learning and Natural Language Processing</li>
                  <li>Full-stack Web Development</li>
                  <li>User Experience Design</li>
                  <li>E-commerce and Payment Systems</li>
                  <li>Cloud Infrastructure and DevOps</li>
                </ul>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Ready to Experience the Future?</h2>
              <p className="text-gray-700 text-lg mb-8">
                Join thousands of satisfied customers who have already discovered the power of AI-driven shopping.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/register" 
                  className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Get Started Today
                </Link>
                <Link 
                  href="/contact" 
                  className="border border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
