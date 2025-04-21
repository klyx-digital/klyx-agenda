import { CallToAction } from '@/components/layout/CallToAction'
import { Faqs } from '@/components/section/home/Faqs'
import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/section/home/Hero'
import { Pricing } from '@/components/section/home/Pricing'
import { PrimaryFeatures } from '@/components/section/home/PrimaryFeatures'
import { SecondaryFeatures } from '@/components/section/home/SecondaryFeatures'
import { Testimonials } from '@/components/section/home/Testimonials'

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
