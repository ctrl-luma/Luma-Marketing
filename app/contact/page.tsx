import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import StarryBackground from '@/components/StarryBackground'

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <StarryBackground className="fixed inset-0 z-0" />
      <div className="relative z-10">
        <Header />
        <main>
          <section className="pt-24 sm:pt-32 pb-6 sm:pb-8">
            <div className="container">
              <div className="max-w-2xl mx-auto text-center">
                <h1 className="heading-1 mb-3">Contact Us</h1>
                <p className="text-base sm:text-lg text-gray-400">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </section>
          <ContactForm />
        </main>
        <Footer />
      </div>
    </div>
  )
}