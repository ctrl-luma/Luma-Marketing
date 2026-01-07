import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function PrivacyPolicy() {
  return (
    <div className="relative">
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Luma POS Privacy Policy</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">Last Updated: January 4, 2026</p>

          <div className="prose prose-invert prose-gray max-w-none">
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
              Luma POS (&quot;Luma,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) values your privacy and is committed to protecting personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you access or use the Luma POS platform, applications, and services (collectively, the &quot;Service&quot;).
            </p>
            <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">
              This Privacy Policy is incorporated into and forms part of the Luma POS Terms of Service.
            </p>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1. Information We Collect</h2>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">1.1 Information You Provide</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We collect information you provide directly to us, including:
              </p>

              <h4 className="text-sm sm:text-base font-semibold text-gray-200 mb-2">Merchant Information</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Business name, address, and contact details</li>
                <li>Owner or authorized representative name</li>
                <li>Email address and phone number</li>
                <li>Business licenses and permits</li>
                <li>Tax identification numbers</li>
              </ul>

              <h4 className="text-sm sm:text-base font-semibold text-gray-200 mb-2">Account Information</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Login credentials (hashed and encrypted)</li>
                <li>User roles and permissions</li>
                <li>Support communications</li>
              </ul>

              <h4 className="text-sm sm:text-base font-semibold text-gray-200 mb-2">Transaction Metadata (Non-Card Data)</h4>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Order details (items, amounts, timestamps)</li>
                <li>Device identifiers</li>
                <li>Location data (event or venue-level)</li>
                <li>Transaction status and logs</li>
              </ul>

              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 font-medium">
                Important: Luma POS does not store full credit card numbers, CVV codes, or sensitive authentication data.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">1.2 Information Collected Automatically</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                When you use the Service, we may automatically collect:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>IP address</li>
                <li>Browser and device type</li>
                <li>Operating system</li>
                <li>Usage data (pages viewed, features used)</li>
                <li>Log files and diagnostic data</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">1.3 Payment Information (Stripe)</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                All payment processing is handled by Stripe Connect.
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Payment card data is collected directly by Stripe</li>
                <li>Luma POS only receives limited payment tokens and transaction references</li>
                <li>Stripe&apos;s use of data is governed by Stripe&apos;s Privacy Policy and Terms</li>
              </ul>
              <p className="text-gray-300 text-sm sm:text-base mb-4 sm:mb-6 font-medium">
                Luma POS is not the merchant of record and does not control Stripe&apos;s data practices.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">2. How We Use Information</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We use collected information to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Provide, operate, and maintain the Service</li>
                <li>Facilitate payment processing via Stripe Connect</li>
                <li>Detect and prevent fraud, abuse, and security incidents</li>
                <li>Comply with legal, tax, and regulatory obligations</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Improve product performance, features, and analytics</li>
                <li>Enforce our Terms of Service</li>
                <li>Communicate service updates and operational notices</li>
              </ul>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">3. How We Share Information</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We may share information in the following circumstances:
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">3.1 With Service Providers</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We share data with trusted third parties who perform services on our behalf, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Payment processors (Stripe)</li>
                <li>Cloud hosting providers</li>
                <li>Analytics and monitoring services</li>
                <li>Customer support platforms</li>
              </ul>
              <p className="text-gray-400 text-sm sm:text-base mb-4 sm:mb-6">
                These providers are contractually required to safeguard your information.
              </p>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">3.2 With Stripe</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We share necessary information with Stripe to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Enable payment processing</li>
                <li>Manage fraud, chargebacks, and compliance</li>
                <li>Meet card network and regulatory requirements</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">3.3 Legal &amp; Compliance Disclosures</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We may disclose information if required to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Comply with laws, regulations, subpoenas, or court orders</li>
                <li>Respond to lawful requests from public authorities</li>
                <li>Enforce our agreements or protect our legal rights</li>
                <li>Investigate fraud or security issues</li>
              </ul>

              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">3.4 Business Transfers</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                If Luma POS is involved in a merger, acquisition, restructuring, or sale of assets, information may be transferred as part of that transaction.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">4. Data Retention</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We retain information only as long as necessary to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Provide the Service</li>
                <li>Meet legal and regulatory requirements</li>
                <li>Resolve disputes and enforce agreements</li>
              </ul>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Transaction records may be retained for up to 7 years for financial, tax, and compliance purposes.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">5. Data Security</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We implement reasonable administrative, technical, and physical safeguards, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Encryption in transit and at rest</li>
                <li>Role-based access controls</li>
                <li>Secure authentication mechanisms</li>
                <li>Continuous monitoring and logging</li>
              </ul>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                However, no system is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">6. Your Rights &amp; Choices</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Access your personal information</li>
                <li>Request correction or updates</li>
                <li>Request deletion (subject to legal retention requirements)</li>
                <li>Object to certain processing activities</li>
              </ul>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Requests can be submitted using the contact details below.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">7. Merchant Responsibilities</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                As a merchant using Luma POS, you are responsible for:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Posting your own customer-facing privacy notice (if required)</li>
                <li>Obtaining customer consent where legally required</li>
                <li>Complying with applicable data protection laws</li>
                <li>Ensuring your staff follows data protection best practices</li>
              </ul>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">8. Children&apos;s Privacy</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS is not intended for use by individuals under 18 years of age. We do not knowingly collect personal information from children.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">9. International Users</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS is operated in the United States. If you access the Service from outside the U.S., you consent to the transfer and processing of information in the United States.
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We may update this Privacy Policy from time to time.
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Material changes will be communicated via email or in-app notice</li>
                <li>Continued use of the Service after updates constitutes acceptance</li>
              </ul>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">11. Contact Information</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                For privacy-related questions or requests:
              </p>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS<br />
                Email:{' '}
                <a href="mailto:support@lumapos.co" className="text-primary hover:underline">
                  support@lumapos.co
                </a>
              </p>
            </section>

            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">12. Acknowledgment</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                By using Luma POS, you acknowledge that you have read, understood, and agree to this Privacy Policy.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
