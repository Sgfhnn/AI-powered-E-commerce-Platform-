import { 
  EyeIcon, 
  SpeakerWaveIcon, 
  ComputerDesktopIcon, 
  DevicePhoneMobileIcon,
  AdjustmentsHorizontalIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <HeartIcon className="h-16 w-16 text-primary-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">Accessibility Statement</h1>
          <p className="text-xl text-gray-600">
            We're committed to making our website accessible to everyone
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Our Commitment */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Our Commitment to Accessibility</h2>
          <p className="text-gray-600 mb-4">
            At AI Store, we believe that everyone should have equal access to information and functionality. 
            We are committed to providing a website that is accessible to the widest possible audience, 
            regardless of technology or ability.
          </p>
          <p className="text-gray-600 mb-4">
            We strive to adhere to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards 
            and continuously work to improve the accessibility of our website.
          </p>
          <div className="bg-primary-50 rounded-lg p-4">
            <p className="text-primary-800 font-medium">
              Our goal is to ensure that our website is accessible to people with disabilities, 
              including those who use assistive technologies such as screen readers, voice recognition software, 
              and keyboard navigation.
            </p>
          </div>
        </div>

        {/* Accessibility Features */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Accessibility Features</h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <ComputerDesktopIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Keyboard Navigation</h3>
                  <p className="text-gray-600 text-sm">
                    Full keyboard navigation support with logical tab order and visible focus indicators.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <EyeIcon className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Screen Reader Support</h3>
                  <p className="text-gray-600 text-sm">
                    Semantic HTML, ARIA labels, and descriptive alt text for images to support screen readers.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <AdjustmentsHorizontalIcon className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">High Contrast</h3>
                  <p className="text-gray-600 text-sm">
                    Sufficient color contrast ratios and support for high contrast mode.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <DevicePhoneMobileIcon className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Responsive Design</h3>
                  <p className="text-gray-600 text-sm">
                    Mobile-friendly design that works across all devices and screen sizes.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <SpeakerWaveIcon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Audio Descriptions</h3>
                  <p className="text-gray-600 text-sm">
                    Clear audio cues and descriptions for interactive elements and media content.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-indigo-100 p-3 rounded-lg">
                  <AdjustmentsHorizontalIcon className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Customizable Interface</h3>
                  <p className="text-gray-600 text-sm">
                    Options to adjust text size, spacing, and other visual elements for better readability.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Standards Compliance */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Standards & Guidelines</h2>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">WCAG 2.1 Level AA Compliance</h3>
              <p className="text-gray-600 mb-2">
                We follow the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards, which include:
              </p>
              <ul className="text-sm text-gray-600 list-disc list-inside ml-4 space-y-1">
                <li><strong>Perceivable:</strong> Information presented in ways that users can perceive</li>
                <li><strong>Operable:</strong> Interface components that users can operate</li>
                <li><strong>Understandable:</strong> Information and UI operation that users can understand</li>
                <li><strong>Robust:</strong> Content that can be interpreted by assistive technologies</li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Section 508 Compliance</h3>
              <p className="text-gray-600">
                Our website also aims to comply with Section 508 of the Rehabilitation Act, 
                ensuring accessibility for federal agencies and their users.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Regular Testing</h3>
              <p className="text-gray-600">
                We regularly test our website with various assistive technologies and conduct 
                accessibility audits to identify and address potential barriers.
              </p>
            </div>
          </div>
        </div>

        {/* Assistive Technologies */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Supported Assistive Technologies</h2>
          
          <p className="text-gray-600 mb-6">
            Our website has been tested with and supports the following assistive technologies:
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Screen Readers</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• NVDA (Windows)</li>
                <li>• JAWS (Windows)</li>
                <li>• VoiceOver (macOS/iOS)</li>
                <li>• TalkBack (Android)</li>
                <li>• Dragon NaturallySpeaking</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Browsers & Platforms</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Chrome, Firefox, Safari, Edge</li>
                <li>• Windows, macOS, iOS, Android</li>
                <li>• Keyboard-only navigation</li>
                <li>• Voice control software</li>
                <li>• Switch navigation devices</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Known Issues */}
        <div className="bg-yellow-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Known Accessibility Issues</h2>
          <p className="text-gray-700 mb-4">
            We are continuously working to improve accessibility. Currently known issues include:
          </p>
          <ul className="text-sm text-gray-700 list-disc list-inside space-y-1 mb-4">
            <li>Some third-party payment widgets may have limited keyboard navigation</li>
            <li>Certain product images may lack detailed alt text descriptions</li>
            <li>Some dynamic content updates may not be immediately announced to screen readers</li>
          </ul>
          <p className="text-gray-700">
            We are actively working to resolve these issues and expect improvements in upcoming updates.
          </p>
        </div>

        {/* Feedback & Support */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Accessibility Feedback & Support</h2>
          
          <p className="text-gray-600 mb-6">
            We welcome your feedback on the accessibility of our website. If you encounter any 
            accessibility barriers or have suggestions for improvement, please let us know.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Report an Issue</h3>
              <p className="text-sm text-gray-600 mb-3">
                Found an accessibility problem? We want to hear about it.
              </p>
              <a href="/contact" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Report Accessibility Issue →
              </a>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold mb-2">Request Assistance</h3>
              <p className="text-sm text-gray-600 mb-3">
                Need help accessing our content? Our support team is here to help.
              </p>
              <a href="mailto:accessibility@aistore.com" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                accessibility@aistore.com →
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-primary-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Contact Our Accessibility Team</h2>
          <p className="text-gray-700 mb-6">
            For accessibility-related questions, feedback, or to request content in an alternative format:
          </p>
          
          <div className="space-y-2 text-gray-700">
            <p><strong>Email:</strong> accessibility@aistore.com</p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Commerce Street, Suite 100, New York, NY 10001</p>
          </div>
          
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <a href="/contact" className="btn-primary">
              Contact Us
            </a>
            <a href="/help-center" className="btn-outline">
              Help Center
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
