export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              Privacy Policy
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
              
              <h2>1. Information We Collect</h2>
              <p>
                We collect information you provide directly to us, such as when you create an account, 
                make a purchase, or contact us for support. This may include:
              </p>
              <ul>
                <li>Name and contact information</li>
                <li>Payment and billing information</li>
                <li>Shipping addresses</li>
                <li>Account preferences and settings</li>
                <li>Communication history with our support team</li>
              </ul>

              <h2>2. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Send you important updates about your account or orders</li>
                <li>Improve our products and services</li>
                <li>Personalize your shopping experience with AI-powered recommendations</li>
                <li>Prevent fraud and ensure security</li>
              </ul>

              <h2>3. Information Sharing</h2>
              <p>
                We do not sell, trade, or otherwise transfer your personal information to third parties 
                without your consent, except in the following circumstances:
              </p>
              <ul>
                <li>With service providers who help us operate our business (e.g., payment processors, shipping companies)</li>
                <li>When required by law or to protect our rights</li>
                <li>In connection with a business transfer or merger</li>
              </ul>

              <h2>4. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your personal information against 
                unauthorized access, alteration, disclosure, or destruction. This includes:
              </p>
              <ul>
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication measures</li>
                <li>Secure payment processing through Stripe</li>
              </ul>

              <h2>5. Cookies and Tracking</h2>
              <p>
                We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, 
                and personalize content. You can control cookie settings through your browser preferences.
              </p>

              <h2>6. AI and Machine Learning</h2>
              <p>
                Our platform uses artificial intelligence to provide personalized recommendations and improve 
                search functionality. This processing is based on your browsing behavior, purchase history, 
                and preferences. You can opt out of personalized recommendations in your account settings.
              </p>

              <h2>7. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal information:</p>
              <ul>
                <li>Access to your personal data</li>
                <li>Correction of inaccurate information</li>
                <li>Deletion of your personal data</li>
                <li>Portability of your data</li>
                <li>Objection to processing</li>
                <li>Withdrawal of consent</li>
              </ul>

              <h2>8. Data Retention</h2>
              <p>
                We retain your personal information for as long as necessary to provide our services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. 
                Account information is typically retained for 7 years after account closure.
              </p>

              <h2>9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years of age. We do not knowingly 
                collect personal information from children under 13. If you believe we have collected 
                information from a child under 13, please contact us immediately.
              </p>

              <h2>10. International Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country 
                of residence. We ensure appropriate safeguards are in place to protect your information 
                during such transfers.
              </p>

              <h2>11. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material 
                changes by posting the new policy on our website and updating the "Last updated" date.
              </p>

              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mt-4">
                <p><strong>Email:</strong> privacy@aistore.com</p>
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
