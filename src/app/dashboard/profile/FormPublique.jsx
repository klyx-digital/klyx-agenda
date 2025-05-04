'use client'

import { useActionState } from 'react'
import { infoEntreprise } from './action'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/16/solid'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import {
  Field,
  Label,
  Description,
  FieldGroup,
  Fieldset,
  Legend,
} from '@/components/ui/fieldset'
import { Select } from '@/components/ui/select'
import { Text } from '@/components/ui/text'
import { Textarea } from '@/components/ui/textarea'

export function FormPublique() {
  const initialState = { message: {}, error: '' }
  const [state, formAction, isPending] = useActionState(
    infoEntreprise,
    initialState,
  )
  return (
    <section>
      {/* EN-TÊTE D'INFORMATION */}
      <div className="mb-8 rounded-lg border border-indigo-100 bg-blue-50 px-6 py-5 shadow-sm">
        <h1 className="mb-1 text-lg font-bold text-blue-800">
          Page publique Klyx
        </h1>
        <p className="text-sm text-blue-700">
          Toutes les informations ci-dessous seront affichées sur votre page
          publique Klyx. Remplissez-les avec attention pour valoriser votre
          activité et rassurer vos clients.
        </p>
      </div>
      <div className="space-y-10">
        {/* SECTION: Informations générales */}
        <section className="rounded-xl border border-gray-100 bg-white/80 px-6 py-8 shadow-sm">
          <form action={formAction}>
            {/* // SECTION: Informations générales */}
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Informations générales
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Ces informations définissent l’identité de votre entreprise sur
              Klyx.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <Field>
                  <Label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-900"
                  >
                    Nom de l’entreprise
                  </Label>
                  <Input
                    name="name"
                    type="text"
                    aria-label="Nom de l’entreprise"
                    placeholder="Nom de votre entreprise"
                  />
                </Field>
              </div>
              <div className="col-span-full">
                <Field>
                  <Label>Présentation de l’entreprise</Label>
                  <Textarea
                    name="about"
                    rows={4}
                    aria-label="Présentation de l'entreprise"
                    placeholder="Décrivez votre entreprise, votre expertise ou votre approche en quelques phrases engageantes."
                    defaultValue={''}
                  />
                  <Description>
                    <span className="mt-2 text-xs text-gray-500">
                      Ce texte sera affiché en haut de votre page publique.
                    </span>
                  </Description>
                </Field>
                <div className="mt-2">
                  <Button type="submit" color="blue">
                    Mettre à jour mes informations générales
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </section>

        {/* SECTION: Présentation & visuels */}
        <section className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 shadow-sm">
          {/* // SECTION: Présentation & visuels */}
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Visuels et identité
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Ajoutez un logo et une image de couverture pour renforcer l’identité
            visuelle de votre entreprise.
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="col-span-full">
              <Field>
                <Label>Logo de l’entreprise</Label>
                <div className="mt-2 flex items-center gap-x-4">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-24 text-gray-300"
                  />
                  <Button
                    type="button"
                    aria-label="Changer le logo de l’entreprise"
                  >
                    Modifier le logo
                  </Button>
                </div>
              </Field>
            </div>
            <div className="col-span-full">
              <Field>
                <Label htmlFor="cover-photo">Image de couverture</Label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
                      <Field>
                        <Label htmlFor="file-upload">
                          <span>Téléverser un fichier</span>
                          <input
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            aria-label="Téléverser une image de couverture"
                          />
                        </Label>
                      </Field>
                      <span className="px-2 text-gray-400">|</span>
                      <span>ou glissez-déposez un fichier</span>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                      PNG, JPG ou GIF (10 Mo max)
                    </p>
                  </div>
                </div>
              </Field>
            </div>
          </div>
        </section>

        {/* SECTION: Coordonnées */}
        <section className="rounded-xl border border-gray-100 bg-white/80 px-6 py-8 shadow-sm">
          <form>
            {/* // SECTION: Coordonnées */}
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Coordonnées et localisation
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Indiquez vos coordonnées pour faciliter la prise de contact et la
              venue de vos clients.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Field>
                  <Label htmlFor="country">Pays</Label>
                  <div className="relative mt-2">
                    <Select
                      name="country"
                      autoComplete="country-name"
                      aria-label="Pays"
                    >
                      <option>France</option>
                      <option>Belgique</option>
                    </Select>
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="pointer-events-none absolute top-3 right-2 size-5 text-gray-400"
                    />
                  </div>
                </Field>
              </div>
              <div className="col-span-full">
                <Field>
                  <Label htmlFor="street-address">Adresse</Label>
                  <Input
                    name="streetaddress"
                    type="text"
                    autoComplete="street-address"
                    aria-label="Adresse"
                    placeholder="Adresse complète"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2 sm:col-start-1">
                <Field>
                  <Label htmlFor="city">Ville</Label>
                  <Input
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    aria-label="Ville"
                    placeholder="Ville"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field>
                  <Label htmlFor="postal-code">Code postal</Label>
                  <Input
                    name="postalcode"
                    type="number"
                    autoComplete="postal-code"
                    aria-label="Code postal"
                    placeholder="Code postal"
                  />
                </Field>
              </div>
            </div>
          </form>
        </section>

        {/* SECTION: Horaires */}
        <section className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 shadow-sm">
          {/* // SECTION: Horaires */}
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Horaires d’ouverture
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Précisez vos horaires d’ouverture pour chaque jour de la semaine.
          </p>
          <div className="space-y-2">
            {[
              'Lundi',
              'Mardi',
              'Mercredi',
              'Jeudi',
              'Vendredi',
              'Samedi',
              'Dimanche',
            ].map((day, idx) => (
              <div
                key={day}
                className={`grid grid-cols-1 gap-y-2 rounded-md sm:grid-cols-12 sm:items-center sm:gap-x-4 ${
                  idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                } px-2 py-2`}
              >
                <div className="text-sm font-medium text-gray-900 sm:col-span-2">
                  {day}
                </div>
                <div className="sm:col-span-4">
                  <Field>
                    <Input
                      type="datetime-local"
                      name={`${day.toLowerCase()}-start`}
                      id={`${day.toLowerCase()}-start`}
                      aria-label={`Heure de début ${day}`}
                      placeholder="Début"
                    />
                  </Field>
                </div>
                <div className="sm:col-span-4">
                  <Field>
                    <Input
                      type="time"
                      name={`${day.toLowerCase()}-end`}
                      id={`${day.toLowerCase()}-end`}
                      aria-label={`Heure de fin ${day}`}
                      placeholder="Fin"
                    />
                  </Field>
                </div>
                <div className="text-xs text-gray-500 sm:col-span-2">
                  <span className="hidden sm:inline">Heure d’ouverture</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION: Services proposés */}
        <section className="rounded-xl border border-gray-100 bg-white/80 px-6 py-8 shadow-sm">
          {/* // SECTION: Services proposés */}
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Services proposés
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Présentez vos services avec description, tarif et durée. Ces
            informations seront visibles sur votre page publique.
          </p>
          <div className="space-y-8">
            {/* Structure directe pour un service, à rendre dynamique plus tard */}
            <div className="grid grid-cols-1 items-end gap-x-6 gap-y-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Field>
                  <Label htmlFor="service-name-0">Nom du service</Label>
                  <Input
                    type="text"
                    name="servicename"
                    aria-label="Nom du service"
                    placeholder="Nom du service"
                  />
                </Field>
              </div>
              <div className="sm:col-span-2">
                <Field>
                  <Label htmlFor="service-duration-0">Durée (min)</Label>
                  <Input
                    type="number"
                    name="serviceduration"
                    aria-label="Durée du service"
                    placeholder="Durée"
                  />
                </Field>
              </div>
              <div className="sm:col-span-1">
                <Field>
                  <Label htmlFor="service-price-0">Prix (€)</Label>
                  <Input
                    type="number"
                    name="serviceprice"
                    aria-label="Prix du service"
                    placeholder="Prix"
                  />
                </Field>
              </div>
              <div className="sm:col-span-6">
                <Field>
                  <Label htmlFor="service-description-0">
                    Description du service
                  </Label>
                  <Textarea
                    name="servicedescription"
                    id="service-description-0"
                    rows={2}
                    aria-label="Description du service"
                    placeholder="Décrivez en quelques mots le service proposé"
                  />
                </Field>
              </div>
            </div>
            <div>
              <Button
                type="button"
                className="mt-4"
                aria-label="Ajouter un service"
                outline
              >
                + Ajouter un service
              </Button>
            </div>
          </div>
        </section>

        {/* SECTION: Réseaux sociaux */}
        <section className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 shadow-sm">
          {/* // SECTION: Réseaux sociaux */}
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Réseaux sociaux & site web
          </h2>
          <p className="mb-6 text-sm text-gray-600">
            Ajoutez vos liens pour renforcer votre présence en ligne et la
            confiance de vos clients.
          </p>
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <Field>
                <Label htmlFor="username">URL de votre page publique</Label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 outline-gray-300 focus-within:outline-2 focus-within:outline-blue-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm">
                      klyx-agenda.com/pro/
                    </div>
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="votre-identifiant"
                      aria-label="Identifiant de la page publique"
                    />
                  </div>
                </div>
              </Field>
            </div>
            <div className="sm:col-span-3">
              <Field>
                <Label htmlFor="facebook">Lien Facebook</Label>
                <Input
                  type="url"
                  name="facebook"
                  id="facebook"
                  placeholder="https://facebook.com/votrepage"
                  aria-label="Lien Facebook"
                />
              </Field>
            </div>
            <div className="sm:col-span-3">
              <Field>
                <Label htmlFor="instagram">Lien Instagram</Label>
                <Input
                  type="url"
                  name="instagram"
                  id="instagram"
                  placeholder="https://instagram.com/votreprofil"
                  aria-label="Lien Instagram"
                />
              </Field>
            </div>
            <div className="sm:col-span-3">
              <Field>
                <Label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien LinkedIn
                </Label>
                <Input
                  type="url"
                  name="linkedin"
                  id="linkedin"
                  placeholder="https://linkedin.com/in/votreprofil"
                  aria-label="Lien LinkedIn"
                />
              </Field>
            </div>
            <div className="sm:col-span-3">
              <Field>
                <Label htmlFor="tiktok">Lien TikTok</Label>
                <Input
                  type="url"
                  name="tiktok"
                  id="tiktok"
                  placeholder="https://tiktok.com/@votreprofil"
                  aria-label="Lien TikTok"
                />
              </Field>
            </div>
            <div className="sm:col-span-6">
              <Field>
                <Label htmlFor="website">Site web professionnel</Label>
                <Input
                  type="url"
                  name="website"
                  id="website"
                  placeholder="https://www.votresite.com"
                  aria-label="Site web professionnel"
                />
              </Field>
            </div>
          </div>
        </section>

        {/* SECTION: URL publique + aperçu */}
        <section className="rounded-xl border border-gray-100 bg-white/80 px-6 py-8 shadow-sm">
          {/* // SECTION: URL publique + aperçu */}
          <h2 className="mb-2 text-lg font-semibold text-gray-900">
            Aperçu de votre page publique
          </h2>
          <p className="mb-4 text-sm text-gray-600">
            Consultez un aperçu de votre page telle qu’elle apparaîtra à vos
            clients.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-base text-gray-500">
              klyx-agenda.com/pro/
              <span className="font-semibold text-gray-800">
                votre-identifiant
              </span>
            </span>
            <Link
              href=""
              className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus:outline-indigo-600"
              aria-label="Voir ma page publique (nouvel onglet)"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voir ma page publique
              <ArrowTopRightOnSquareIcon
                className="h-4 w-4 text-blue-500"
                aria-hidden="true"
              />
            </Link>
          </div>
        </section>
      </div>
      <div className="mt-8 flex items-center justify-end gap-x-6">
        <Button type="button" plain>
          Annuler
        </Button>
        <Button type="submit">Enregistrer</Button>
      </div>
    </section>
  )
}
