import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/ui/SlimLayout'

export default function NotFound() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <p className="mt-20 text-sm font-medium text-gray-700">404</p>
      <h1 className="mt-3 text-lg font-semibold text-gray-900">
        Page non trouvée
      </h1>
      <p className="mt-3 text-sm text-gray-700">
        Désolé, nous n’avons pas pu trouver la page que vous recherchez.
      </p>
      <Button href="/" className="mt-10">
        Go back home
      </Button>
    </SlimLayout>
  )
}
