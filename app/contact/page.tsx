import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-24 sm:pt-32 pb-6 sm:pb-8 bg-black">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="heading-1 mb-3 sm:mb-4">Get in touch</h1>
              <p className="text-base sm:text-lg text-gray-400">
                Questions about Luma? We&apos;re here to help.
              </p>
            </div>
          </div>
        </section>
        <ContactInfo />
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}