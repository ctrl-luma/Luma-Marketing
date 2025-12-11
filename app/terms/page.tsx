import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <div className="relative">
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Terms of Service</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">Last updated: December 2024</p>

          <div className="prose prose-invert prose-gray max-w-none">
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1. Agreement to Terms</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                By accessing or using Luma POS, you agree to be bound by these Terms of Service.
                If you do not agree to these terms, do not use our services.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">2. Description of Service</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS provides a mobile point-of-sale application that enables businesses to
                accept payments via Tap to Pay technology. Our service is powered by Stripe for
                payment processing.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">3. Account Registration</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                To use Luma POS, you must create an account and provide accurate, complete information.
                You are responsible for maintaining the security of your account credentials and for
                all activities that occur under your account.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">4. Payment Processing</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Payment processing is provided by Stripe and is subject to Stripe&apos;s terms of service.
                Transaction fees apply as outlined in our pricing. We are not responsible for any
                issues arising from Stripe&apos;s services.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">5. Acceptable Use</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You agree not to use Luma POS for any unlawful purpose or in violation of any
                applicable laws. You may not use our service to process payments for prohibited
                goods or services as defined by Stripe&apos;s acceptable use policy.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">6. Subscription and Billing</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Paid subscriptions are billed monthly or annually as selected. You may cancel your
                subscription at any time. Refunds are provided at our discretion. Transaction fees
                are non-refundable.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">7. Limitation of Liability</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS is provided &quot;as is&quot; without warranties of any kind. We are not liable for
                any indirect, incidental, or consequential damages arising from your use of our service.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">8. Changes to Terms</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We reserve the right to modify these terms at any time. Continued use of Luma POS
                after changes constitutes acceptance of the new terms.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">9. Contact</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                For questions about these Terms of Service, contact us at{' '}
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
