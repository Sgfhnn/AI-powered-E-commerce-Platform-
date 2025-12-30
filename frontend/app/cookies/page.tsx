import { CakeIcon, ShieldCheckIcon, Cog6ToothIcon, EyeIcon } from '@heroicons/react/24/outline'

export default function CookiesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <CakeIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
          <p className="text-xl text-gray-600">
            How we use cookies to improve your shopping experience
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* What Are Cookies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">What Are Cookies?</h2>
          <p className="text-gray-600 mb-4">
            Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
            They help us provide you with a better experience by remembering your preferences and understanding how you use our site.
          </p>
          <p className="text-gray-600">
            We use cookies to enhance your shopping experience, analyze site traffic, personalize content, and provide 
            social media features. This policy explains what cookies we use and why.
          </p>
        </div>

        {/* Types of Cookies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Types of Cookies We Use</h2>
          
          <div className="space-y-6">
            <div className="border-l-4 border-green-500 pl-6">
              <div className="flex items-center mb-2">
                <ShieldCheckIcon className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="text-lg font-semibold">Essential Cookies</h3>
              </div>
              <p className="text-gray-600 mb-2">
                These cookies are necessary for the website to function properly. They enable core functionality 
                such as security, network management, and accessibility.
              </p>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                <li>Authentication and login status</li>
                <li>Shopping cart contents</li>
                <li>Security and fraud prevention</li>
                <li>Load balancing</li>
              </ul>
            </div>

            <div className="border-l-4 border-blue-500 pl-6">
              <div className="flex items-center mb-2">
                <EyeIcon className="h-5 w-5 text-blue-600 mr-2" />
                <h3 className="text-lg font-semibold">Analytics Cookies</h3>
              </div>
              <p className="text-gray-600 mb-2">
                These cookies help us understand how visitors interact with our website by collecting and 
                reporting information anonymously.
              </p>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                <li>Page views and user journeys</li>
                <li>Popular products and categories</li>
                <li>Site performance metrics</li>
                <li>Error tracking and debugging</li>
              </ul>
            </div>

            <div className="border-l-4 border-purple-500 pl-6">
              <div className="flex items-center mb-2">
                <Cog6ToothIcon className="h-5 w-5 text-purple-600 mr-2" />
                <h3 className="text-lg font-semibold">Functional Cookies</h3>
              </div>
              <p className="text-gray-600 mb-2">
                These cookies enable enhanced functionality and personalization, such as remembering your 
                preferences and providing personalized content.
              </p>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                <li>Language and region preferences</li>
                <li>Recently viewed products</li>
                <li>Personalized recommendations</li>
                <li>Chat widget preferences</li>
              </ul>
            </div>

            <div className="border-l-4 border-orange-500 pl-6">
              <div className="flex items-center mb-2">
                <CakeIcon className="h-5 w-5 text-orange-600 mr-2" />
                <h3 className="text-lg font-semibold">Marketing Cookies</h3>
              </div>
              <p className="text-gray-600 mb-2">
                These cookies track your online activity to help advertisers deliver more relevant advertising 
                or to limit how many times you see an ad.
              </p>
              <ul className="text-sm text-gray-500 list-disc list-inside">
                <li>Targeted advertising</li>
                <li>Social media integration</li>
                <li>Email marketing optimization</li>
                <li>Conversion tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Third-Party Cookies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Third-Party Cookies</h2>
          <p className="text-gray-600 mb-4">
            We also use third-party services that may set their own cookies. These include:
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Analytics Services</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Google Analytics</li>
                <li>• Hotjar (heatmaps and recordings)</li>
                <li>• Mixpanel (user behavior)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Payment & Security</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Stripe (payment processing)</li>
                <li>• Cloudflare (security and performance)</li>
                <li>• reCAPTCHA (fraud prevention)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Social Media</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Facebook Pixel</li>
                <li>• Twitter Analytics</li>
                <li>• LinkedIn Insights</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Customer Support</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Intercom (chat widget)</li>
                <li>• Zendesk (support tickets)</li>
                <li>• Trustpilot (reviews)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Managing Cookies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Managing Your Cookie Preferences</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Browser Settings</h3>
              <p className="text-gray-600 mb-2">
                You can control and manage cookies through your browser settings. Most browsers allow you to:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside ml-4">
                <li>View what cookies are stored on your device</li>
                <li>Delete cookies individually or all at once</li>
                <li>Block cookies from specific sites</li>
                <li>Block third-party cookies</li>
                <li>Set cookies to be deleted when you close your browser</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Cookie Consent</h3>
              <p className="text-gray-600">
                When you first visit our site, we'll ask for your consent to use non-essential cookies. 
                You can change your preferences at any time by clicking the "Cookie Settings" link in our footer.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Impact of Disabling Cookies</h3>
              <p className="text-gray-600">
                Please note that disabling certain cookies may impact your experience on our website. 
                Essential cookies cannot be disabled as they are necessary for the site to function properly.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Questions About Our Cookie Policy?</h2>
          <p className="text-gray-700 mb-6">
            If you have any questions about our use of cookies or this policy, please don't hesitate to contact us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="/privacy" className="btn-outline">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
