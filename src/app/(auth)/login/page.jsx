import Link from 'next/link'

import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/ui/SlimLayout'

export default function Login() {
  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Connectez-vous à votre compte
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Pas encore inscrit ?{' '}
        <Link
          href="/register"
          className="font-medium text-blue-600 hover:underline"
        >
          Créez un compte
        </Link>{' '}
        gratuitement
      </p>
      <form action="#" className="mt-10 grid grid-cols-1 gap-y-8">
        <TextField
          label="Adresse email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
        <div>
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              Se connecter<span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
