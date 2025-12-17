import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import { Mail, Clock } from 'lucide-react'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 sm:pt-32 pb-4 sm:pb-6 bg-black">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="heading-1 mb-3 sm:mb-4">Get in touch</h1>
              <p className="text-base sm:text-lg text-gray-400 mb-4">
                Questions about Luma? We&apos;re here to help.
              </p>
              <div className="inline-flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm bg-gray-900/50 border border-gray-800 rounded-full px-4 sm:px-6 py-2">
                <a
                  href="mailto:support@lumapos.co"
                  className="flex items-center gap-2 text-primary hover:text-primary-400 transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  <span className="font-medium">support@lumapos.co</span>
                </a>
                <span className="text-gray-700">•</span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Clock className="h-4 w-4 text-green-500" />
                  <span>Responds within 24h</span>
                </span>
              </div>
            </div>
          </div>
        </section>
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}