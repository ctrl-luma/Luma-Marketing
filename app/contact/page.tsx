import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import ContactInfo from '@/components/ContactInfo'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-gray-950 to-black">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="heading-1 mb-6">Get in touch</h1>
              <p className="text-lead text-gray-300">
                Have questions about Luma POS? Want to schedule a demo or discuss 
                custom pricing? We're here to help your business grow.
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