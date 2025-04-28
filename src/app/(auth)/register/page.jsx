'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { TextField } from '@/components/ui/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/ui/SlimLayout'
import { useActionState } from 'react'
import { registerUser } from './action'

export default function Register() {
  const initialState = {
    errors: {},
    message: null,
  }
  const [state, formAction, isPending] = useActionState(
    registerUser,
    initialState,
  )

  return (
    <SlimLayout>
      <div className="flex">
        <Link href="/" aria-label="Home">
          <Logo className="h-10 w-auto" />
        </Link>
      </div>
      <h2 className="mt-20 text-lg font-semibold text-gray-900">
        Créez votre compte gratuitement
      </h2>
      <p className="mt-2 text-sm text-gray-700">
        Vous avez déjà un compte ?{' '}
        <Link
          href="/login"
          className="font-medium text-blue-600 hover:underline"
        >
          Connectez-vous ici
        </Link>{' '}
      </p>
      <form
        action={formAction}
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="Prénom"
          name="firstName"
          type="text"
          autoComplete="given-name"
        />
        {state.errors?.firstName && (
          <div className="mt-2 text-sm text-red-600">
            {state.errors.firstName[0]}
          </div>
        )}
        <TextField
          label="Nom"
          name="lastName"
          type="text"
          autoComplete="family-name"
        />
        {state.errors?.lastName && (
          <div className="mt-2 text-sm text-red-600">
            {state.errors.lastName[0]}
          </div>
        )}
        <TextField
          className="col-span-full"
          label="Adresse email"
          name="email"
          type="email"
          autoComplete="email"
        />
        {state.errors?.email && (
          <div className="mt-2 text-sm text-red-600">
            {state.errors.email[0]}
          </div>
        )}
        <TextField
          className="col-span-full"
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
        />
        {state.errors?.password && (
          <div className="mt-2 text-sm text-red-600">
            {state.errors.password[0]}
          </div>
        )}

        <div className="col-span-full">
          <Button
            disabled={isPending}
            type="submit"
            variant="solid"
            color="blue"
            className="w-full"
          >
            <span>
              {isPending ? 'Inscription...' : 'S’inscrire'}
              <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
