export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Terms of Service
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="prose prose-lg max-w-none">
              
              <h2>1. Acceptance of Terms</h2>
              <p>
                By accessing and using AI Store ("the Service"), you accept and agree to be bound by the 
                terms and provision of this agreement. If you do not agree to abide by the above, 
                please do not use this service.
              </p>

              <h2>2. Description of Service</h2>
              <p>
                AI Store is an e-commerce platform that uses artificial intelligence to provide 
                personalized shopping experiences, including intelligent search and product recommendations. 
                We reserve the right to modify, suspend, or discontinue the service at any time.
              </p>

              <h2>3. User Accounts</h2>
              <p>To use certain features of our service, you must create an account. You agree to:</p>
              <ul>
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your information to keep it accurate</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept all risks of unauthorized access to your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>

              <h2>4. Acceptable Use</h2>
              <p>You agree not to use the service to:</p>
              <ul>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe on intellectual property rights</li>
                <li>Transmit harmful, offensive, or inappropriate content</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Use automated systems to access the service without permission</li>
              </ul>

              <h2>5. Orders and Payments</h2>
              <p>
                When you place an order through our service:
              </p>
              <ul>
                <li>All orders are subject to acceptance and availability</li>
                <li>Prices are subject to change without notice</li>
                <li>Payment must be received before order processing</li>
                <li>We use Stripe for secure payment processing</li>
                <li>You are responsible for providing accurate billing information</li>
              </ul>

              <h2>6. Shipping and Delivery</h2>
              <p>
                We will make reasonable efforts to deliver products within the estimated timeframe. 
                However, delivery dates are estimates and not guarantees. Risk of loss and title 
                pass to you upon delivery to the carrier.
              </p>

              <h2>7. Returns and Refunds</h2>
              <p>
                Our return policy allows returns within 30 days of delivery for most items. 
                Items must be in original condition. Refunds will be processed to the original 
                payment method within 5-10 business days of receiving the returned item.
              </p>

              <h2>8. Intellectual Property</h2>
              <p>
                All content on AI Store, including text, graphics, logos, images, and software, 
                is the property of AI Store or its licensors and is protected by copyright, 
                trademark, and other intellectual property laws.
              </p>

              <h2>9. AI and Data Usage</h2>
              <p>
                By using our service, you acknowledge that:
              </p>
              <ul>
                <li>We use AI algorithms to personalize your experience</li>
                <li>Your browsing and purchase data may be used to improve our AI systems</li>
                <li>You can opt out of personalized features in your account settings</li>
                <li>We do not sell your personal data to third parties</li>
              </ul>

              <h2>10. Disclaimers</h2>
              <p>
                The service is provided "as is" without warranties of any kind. We disclaim all 
                warranties, express or implied, including but not limited to warranties of 
                merchantability, fitness for a particular purpose, and non-infringement.
              </p>

              <h2>11. Limitation of Liability</h2>
              <p>
                In no event shall AI Store be liable for any indirect, incidental, special, 
                consequential, or punitive damages, including but not limited to loss of profits, 
                data, or use, arising out of or relating to your use of the service.
              </p>

              <h2>12. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless AI Store from any claims, damages, 
                losses, or expenses arising from your use of the service or violation of these terms.
              </p>

              <h2>13. Privacy</h2>
              <p>
                Your privacy is important to us. Please review our Privacy Policy, which also 
                governs your use of the service, to understand our practices.
              </p>

              <h2>14. Termination</h2>
              <p>
                We may terminate or suspend your account and access to the service immediately, 
                without prior notice, for conduct that we believe violates these terms or is 
                harmful to other users, us, or third parties.
              </p>

              <h2>15. Governing Law</h2>
              <p>
                These terms shall be governed by and construed in accordance with the laws of 
                the State of New York, without regard to its conflict of law provisions.
              </p>

              <h2>16. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. We will notify users of 
                material changes by posting the updated terms on our website and updating the 
                "Last updated" date.
              </p>

              <h2>17. Contact Information</h2>
              <p>
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p><strong>Email:</strong> legal@aistore.com</p>
                <p><strong>Address:</strong> 123 Commerce Street, Suite 100, New York, NY 10001</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              </div>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
