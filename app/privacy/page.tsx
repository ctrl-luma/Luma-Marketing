import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="relative">
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Privacy Policy</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">Last updated: December 2024</p>

          <div className="prose prose-invert prose-gray max-w-none">
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1. Information We Collect</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We collect information you provide when creating an account, including your name,
                email address, business information, and payment details. We also collect transaction
                data processed through our platform.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">2. How We Use Your Information</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We use your information to provide and improve our services, process transactions,
                send service-related communications, and comply with legal obligations. We do not
                sell your personal information to third parties.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">3. Payment Processing</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Payment processing is handled by Stripe. Your payment information is transmitted
                directly to Stripe and is subject to their privacy policy. We do not store your
                full credit card numbers on our servers.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">4. Data Security</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We implement industry-standard security measures to protect your data. However,
                no method of transmission over the internet is 100% secure. We cannot guarantee
                absolute security of your information.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">5. Data Retention</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We retain your information for as long as your account is active or as needed to
                provide services. We may retain certain information as required by law or for
                legitimate business purposes.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">6. Your Rights</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You may access, update, or delete your personal information at any time through
                your account settings. You may also contact us to request a copy of your data or
                to exercise other privacy rights.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">7. Cookies</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We use cookies and similar technologies to improve user experience, analyze usage,
                and provide personalized content. You can control cookie settings through your browser.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">8. Third-Party Services</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Our service integrates with third-party services including Stripe for payments.
                These services have their own privacy policies that govern their use of your data.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">9. Changes to This Policy</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We may update this privacy policy from time to time. We will notify you of any
                significant changes by email or through our service.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">10. Contact Us</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                For questions about this Privacy Policy, contact us at{' '}
                <a href="mailto:support@lumapos.co" className="text-primary hover:underline">
                  support@lumapos.co
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
