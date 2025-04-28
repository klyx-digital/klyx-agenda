import { CallToAction } from '@/components/page/layout/CallToAction'
import { Faqs } from '@/components/page/home/Faqs'
import { Footer } from '@/components/page/layout/Footer'
import { Header } from '@/components/page/layout/Header'
import { Hero } from '@/components/page/home/Hero'
import { Pricing } from '@/components/page/home/Pricing'
import { PrimaryFeatures } from '@/components/page/home/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/page/home/SecondaryFeatures'
import { Testimonials } from '@/components/page/home/Testimonials'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <PrimaryFeatures />
        <SecondaryFeatures />
        <CallToAction />
        <Testimonials />
        <Pricing />
        <Faqs />
      </main>
      <Footer />
    </>
  )
}
