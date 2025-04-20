import Link from 'next/link'

import { Button } from '@/components/Button'
import { SelectField, TextField } from '@/components/Fields'
import { Logo } from '@/components/Logo'
import { SlimLayout } from '@/components/SlimLayout'

export default function Register() {
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
        action="#"
        className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2"
      >
        <TextField
          label="Prénom"
          name="first_name"
          type="text"
          autoComplete="given-name"
          required
        />
        <TextField
          label="Nom"
          name="last_name"
          type="text"
          autoComplete="family-name"
          required
        />
        <TextField
          className="col-span-full"
          label="Adresse email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
        <TextField
          className="col-span-full"
          label="Mot de passe"
          name="password"
          type="password"
          autoComplete="new-password"
          required
        />
        <SelectField
          className="col-span-full"
          label="Comment avez-vous connu Klyx ?"
          name="referral_source"
        >
          <option>Bouche-à-oreille</option>
          <option>Réseaux sociaux</option>
          <option>Recherche Google</option>
          <option>Recommandation d’un client</option>
          <option>Autre</option>
        </SelectField>
        <div className="col-span-full">
          <Button type="submit" variant="solid" color="blue" className="w-full">
            <span>
              S’inscrire <span aria-hidden="true">&rarr;</span>
            </span>
          </Button>
        </div>
      </form>
    </SlimLayout>
  )
}
