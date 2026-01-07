import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function TermsOfService() {
  return (
    <div className="relative">
      <Header />
      <main className="pt-20 sm:pt-24 pb-12 sm:pb-16">
        <div className="container max-w-3xl mx-auto px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4">Luma POS Terms of Service</h1>
          <p className="text-gray-400 text-sm sm:text-base mb-6 sm:mb-8">Last Updated: January 4, 2026</p>

          <div className="prose prose-invert prose-gray max-w-none">
            {/* Section 1 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                By creating an account, accessing, or using Luma POS (&quot;Service,&quot; &quot;Platform,&quot; or &quot;Luma&quot;), you (&quot;Merchant,&quot; &quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not use the Service.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">2. Service Description</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS provides a cloud-based point-of-sale system designed for mobile vendors, including food trucks, mobile bars, and event-based merchants. Our Service integrates with Stripe Connect to process payments on your behalf.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">3. Stripe Connect Integration</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">3.1 Payment Processing</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                All payment processing services are provided through Stripe Connect. By using Luma POS, you agree to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Create and maintain a Stripe Connect account</li>
                <li>Comply with Stripe&apos;s Terms of Service and Connect Account Agreement</li>
                <li>Provide accurate business and banking information to Stripe</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">3.2 Stripe Relationship</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">You acknowledge that:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Stripe, not Luma POS, is the merchant of record for payment processing</li>
                <li>Your relationship with Stripe is governed by Stripe&apos;s separate terms and conditions</li>
                <li>Luma POS acts as a technology platform facilitating your connection to Stripe&apos;s payment services</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">4. Fraud and Chargeback Liability</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">4.1 Customer Responsibility</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 uppercase font-semibold">
                You, the Merchant, are solely responsible for all chargebacks, fraud, and disputed transactions processed through your Luma POS account, including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Credit card chargebacks</li>
                <li>Debit card chargebacks</li>
                <li>ACH returns and disputes</li>
                <li>Fraudulent transactions</li>
                <li>Unauthorized transactions</li>
                <li>Claims of non-delivery or non-receipt of goods/services</li>
                <li>Claims of defective or not-as-described goods/services</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">4.2 Chargeback Fees and Costs</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You agree to pay all fees associated with chargebacks and disputes, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Stripe&apos;s chargeback fees (currently $15 per chargeback)</li>
                <li>Any additional processing fees imposed by card networks</li>
                <li>Costs associated with chargeback representation and dispute resolution</li>
                <li>Any penalties imposed due to excessive chargeback rates</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">4.3 Reserve Rights</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Stripe and/or Luma POS reserve the right to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Hold funds in reserve to cover potential chargebacks and fraud</li>
                <li>Debit your connected bank account or withhold funds from future transactions to cover chargeback amounts and fees</li>
                <li>Require additional documentation or security measures if your chargeback rate exceeds industry standards</li>
                <li>Suspend or terminate your account if chargeback rates reach unacceptable levels</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">4.4 Fraud Prevention Obligations</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">You agree to:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Implement reasonable fraud prevention measures</li>
                <li>Verify customer identity when appropriate</li>
                <li>Retain transaction receipts and proof of delivery/service</li>
                <li>Respond promptly to Stripe and Luma POS inquiries regarding disputed transactions</li>
                <li>Maintain accurate records of all transactions for at least 3 years</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">4.5 High-Risk Chargeback Rate</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                If your chargeback rate exceeds 0.9% of total transactions in any given month, Luma POS reserves the right to:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Require a rolling reserve of up to 30% of transaction volume</li>
                <li>Implement additional monitoring and compliance requirements</li>
                <li>Suspend new payment processing until the rate decreases</li>
                <li>Terminate your account with 30 days&apos; notice</li>
              </ul>
            </section>

            {/* Section 5 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">5. Account Responsibilities</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">5.1 Account Security</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">You are responsible for:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying Luma POS of any unauthorized access or security breaches</li>
                <li>Ensuring your employees/staff use the Service appropriately</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">5.2 Accurate Information</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You must provide and maintain accurate, current, and complete information, including:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Business name and contact information</li>
                <li>Banking and financial information</li>
                <li>Tax identification numbers</li>
                <li>Business licenses and permits</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">5.3 Prohibited Activities</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">You may not use Luma POS to:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Process transactions for illegal goods or services</li>
                <li>Engage in fraudulent or deceptive practices</li>
                <li>Process transactions unrelated to your stated business</li>
                <li>Violate card network rules or regulations</li>
                <li>Process payments for third parties without prior written approval</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">6. Fees and Payment</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">6.1 Service Fees</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS charges fees as outlined in your pricing plan. All fees are in addition to Stripe&apos;s processing fees.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">6.2 Payment Authorization</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">By using the Service, you authorize Luma POS to:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Charge your payment method on file for subscription fees</li>
                <li>Deduct fees from your transaction proceeds</li>
                <li>Adjust your account balance to recover amounts owed</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">6.3 Disputed Fees</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Any disputes regarding Luma POS fees must be submitted within 30 days of the charge. After 30 days, all charges are considered accepted.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">7. Indemnification</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You agree to indemnify, defend, and hold harmless Luma POS, its affiliates, officers, directors, employees, and agents from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys&apos; fees) arising from:
              </p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Your violation of these Terms</li>
                <li>Your violation of any applicable laws or regulations</li>
                <li>Chargebacks and fraud associated with your account</li>
                <li>Disputes with your customers</li>
                <li>Your products, services, or business practices</li>
                <li>Infringement of any intellectual property or other rights of any third party</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">8. Limitation of Liability</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">8.1 No Liability for Chargebacks</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 uppercase font-semibold">
                Luma POS is not liable for any chargebacks, fraud, or payment disputes. These are solely your responsibility as the merchant.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">8.2 Service Availability</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS strives to maintain 99.9% uptime but does not guarantee uninterrupted service. We are not liable for losses resulting from service interruptions, including lost sales or transaction failures.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">8.3 Maximum Liability</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 uppercase font-semibold">
                To the maximum extent permitted by law, Luma POS&apos;s total liability to you for any claims shall not exceed the amount you paid to Luma POS in the 12 months preceding the claim.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">8.4 Consequential Damages</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 uppercase font-semibold">
                Luma POS shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including lost profits, lost revenue, or lost data.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">9. Dispute Resolution</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">9.1 Chargeback Process</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">When a chargeback occurs:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>Stripe will notify Luma POS, and we will notify you via email</li>
                <li>You will have the opportunity to provide evidence to dispute the chargeback</li>
                <li>You must submit all evidence within the timeframe specified (typically 7-10 days)</li>
                <li>The final decision rests with the cardholder&apos;s bank and card networks</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">9.2 Customer Disputes</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You are responsible for resolving disputes directly with your customers. Luma POS is not a party to these disputes.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">10. Account Termination</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">10.1 Termination by You</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You may terminate your account at any time by providing 30 days&apos; written notice. You remain liable for all fees, chargebacks, and obligations incurred before termination.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">10.2 Termination by Luma POS</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">We may suspend or terminate your account immediately if:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>You breach these Terms</li>
                <li>Your chargeback rate exceeds acceptable thresholds</li>
                <li>We suspect fraud or illegal activity</li>
                <li>Required by law or card network rules</li>
                <li>Your Stripe account is terminated or suspended</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">10.3 Post-Termination</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">Upon termination:</p>
              <ul className="list-disc list-inside text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 space-y-1">
                <li>You remain liable for all outstanding fees, chargebacks, and obligations</li>
                <li>We may retain funds for up to 180 days to cover potential chargebacks</li>
                <li>You must cease using the Service and Luma POS branding</li>
                <li>Provisions regarding liability, indemnification, and dispute resolution survive termination</li>
              </ul>
            </section>

            {/* Section 11 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">11. Data and Privacy</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">11.1 Data Ownership</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You retain ownership of your customer data and transaction records. However, you grant Luma POS a license to use this data to provide the Service and for analytics purposes.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">11.2 PCI Compliance</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS and Stripe maintain PCI-DSS compliance for payment card data. You are responsible for complying with PCI requirements in your business operations.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">11.3 Privacy Policy</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Our collection and use of personal information is governed by our Privacy Policy, incorporated by reference into these Terms.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">12. Modifications</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">12.1 Terms Updates</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Luma POS reserves the right to modify these Terms at any time. Material changes will be notified via email at least 30 days in advance. Continued use of the Service after changes take effect constitutes acceptance.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">12.2 Fee Changes</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                We may modify our fees with 60 days&apos; notice. You may terminate your account if you do not agree to the new fees.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">13. General Provisions</h2>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">13.1 Entire Agreement</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                These Terms, together with our Privacy Policy and any pricing agreements, constitute the entire agreement between you and Luma POS.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">13.2 Governing Law</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                These Terms are governed by the laws of the State of Georgia, United States, without regard to conflict of law principles.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">13.3 Severability</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                If any provision of these Terms is found unenforceable, the remaining provisions continue in full force and effect.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">13.4 No Waiver</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                Failure to enforce any provision does not waive our right to enforce it later.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-white mb-2 sm:mb-3">13.5 Assignment</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                You may not assign these Terms without our written consent. We may assign these Terms to any affiliate or in connection with a merger or sale.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">14. Contact Information</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                For questions about these Terms or to report issues:
              </p>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4">
                <strong className="text-white">Luma POS</strong><br />
                Email:{' '}
                <a href="mailto:support@lumapos.co" className="text-primary hover:underline">
                  support@lumapos.co
                </a>
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-6 sm:mb-8">
              <h2 className="text-lg sm:text-xl font-semibold text-white mb-3 sm:mb-4">15. Acknowledgment</h2>
              <p className="text-gray-400 text-sm sm:text-base mb-3 sm:mb-4 uppercase font-semibold">
                By creating an account and using Luma POS, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, including the provisions regarding your sole liability for chargebacks and fraud.
              </p>
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mt-4">
                <p className="text-yellow-500 text-sm sm:text-base font-medium">
                  <strong>Important Notice:</strong> These Terms of Service contain important provisions regarding your liability for chargebacks and fraud. Please read them carefully. If you have questions, consult with legal counsel before accepting.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
