import Image from 'next/image'

import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import backgroundImage from '@/images/background-call-to-action.jpg'

export function CallToAction() {
  return (
    <section
      id="get-started-today"
      className="relative overflow-hidden bg-blue-600 py-32"
    >
      <Image
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
        src={backgroundImage}
        alt=""
        width={2347}
        height={1244}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-lg text-center">
          <h2 className="font-display text-3xl tracking-tight text-white sm:text-4xl">
            Essayez Klyx gratuitement dès aujourd’hui
          </h2>
          <p className="mt-4 text-lg tracking-tight text-white">
            Créez votre compte en 2 minutes, définissez vos créneaux, et
            commencez à recevoir vos premières réservations en ligne — sans
            aucun engagement.
          </p>
          <Button href="/register" color="white" className="mt-10">
            Commencer gratuitement
          </Button>
        </div>
      </Container>
    </section>
  )
}
