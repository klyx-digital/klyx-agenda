'use client'

import { useActionState, startTransition } from 'react'
import { useState } from 'react'
import {
  infoEntreprise,
  LocalisationEntreprise,
  updateHoraires,
  updateService,
  updateLinks,
  saveLogoOrBanner,
} from './action'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/16/solid'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Field, Label, Description } from '@/components/ui/fieldset'
import { Textarea } from '@/components/ui/textarea'

function FormError({ errors, field }) {
  return (
    <div id={`${field}-error`} aria-live="polite" aria-atomic="true">
      {Array.isArray(errors?.[field]) &&
        errors[field].map((error) => (
          <p key={error} className="mt-1 text-sm text-red-600">
            {error}
          </p>
        ))}
    </div>
  )
}

export function FormPublique() {
  const initialState = { message: {}, errors: {} }
  const [infoState, submitInfo, isSubmittingInfo] = useActionState(
    infoEntreprise,
    initialState,
  )

  const [locationState, submitLocation, isSubmittingLocation] = useActionState(
    LocalisationEntreprise,
    initialState,
  )

  const [horaireState, submitHoraires, isSubmittingHoraires] = useActionState(
    updateHoraires,
    initialState,
  )
  const [serviceState, submitService, isSubmittingService] = useActionState(
    updateService,
    initialState,
  )
  const [linksState, submitLinks, isSubmittingLinks] = useActionState(
    updateLinks,
    initialState,
  )
  // Pour les visuels
  const [imageState, submitImage, isSubmittingImage] = useActionState(
    saveLogoOrBanner,
    initialState,
  )
  const [logo, setLogo] = useState(null)
  const [banner, setBanner] = useState(null)

  const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  const UPLOAD_PRESET = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

  // Nouveau handleUpload pour fichiers contrôlés (logo/banner)
  const handleUpload = async (e, type) => {
    const file = e.target.files?.[0]
    if (!file) return

    const formDataCloud = new FormData()
    formDataCloud.append('file', file)
    formDataCloud.append('upload_preset', UPLOAD_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formDataCloud,
      },
    )

    const data = await res.json()
    if (!data.secure_url) return

    if (type === 'logo') setLogo(data.secure_url)
    if (type === 'banner') setBanner(data.secure_url)
    // Plus d'appel submitImage ici, seulement maj state
  }

  // Gestion soumission manuelle images
  const handleImageSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    if (logo) formData.append('logo', logo)
    if (banner) formData.append('banner', banner)
    startTransition(() => {
      submitImage(formData)
    })
  }
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
          <form action={submitInfo}>
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
                    aria-describedby="name-error"
                  />
                  <FormError errors={infoState.errors} field="name" />
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
                    aria-describedby="about-error"
                  />
                  <FormError errors={infoState.errors} field="about" />
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
                  {infoState.error && (
                    <p className="mt-2 text-sm text-red-600">
                      {infoState.error}
                    </p>
                  )}
                  {typeof infoState.message === 'string' && (
                    <p className="mt-2 text-sm text-green-600">
                      {infoState.message}
                    </p>
                  )}
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
          <form onSubmit={(e) => handleImageSubmit(e)}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <Field>
                  <Label>Logo de l’entreprise</Label>
                  <div className="mt-2 flex items-center gap-x-4">
                    {logo && (
                      <img
                        src={logo}
                        width={70}
                        height={70}
                        alt="Logo"
                        className="rounded-full object-cover"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={async (e) => {
                        await handleUpload(e, 'logo')
                      }}
                      aria-label="Téléverser un logo"
                      value={undefined}
                    />
                  </div>
                  {imageState?.error && (
                    <p className="mt-2 text-sm text-red-600">
                      {imageState.error}
                    </p>
                  )}
                </Field>
              </div>
              <div className="col-span-full">
                <Field>
                  <Label htmlFor="cover-photo">Image de couverture</Label>
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 bg-white px-6 py-10">
                    <div className="text-center">
                      {banner ? (
                        <img
                          src={banner}
                          alt="Bannière"
                          className="mx-auto h-32 rounded-lg object-cover"
                        />
                      ) : (
                        <>
                          <PhotoIcon
                            aria-hidden="true"
                            className="mx-auto size-12 text-gray-300"
                          />
                          <p className="mt-4 text-sm text-gray-600">
                            Aucun fichier sélectionné
                          </p>
                        </>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                          await handleUpload(e, 'banner')
                        }}
                        aria-label="Téléverser une image de couverture"
                        className="mt-4"
                        value={undefined}
                      />
                      {imageState?.error && (
                        <p className="mt-2 text-sm text-red-600">
                          {imageState.error}
                        </p>
                      )}
                    </div>
                  </div>
                </Field>
              </div>
            </div>
            {/* Le bouton de soumission images est déplacé ici, hors de Field */}
            <div className="mt-4">
              {typeof imageState?.message === 'string' && (
                <p className="mt-2 text-sm text-green-600">
                  {imageState.message}
                </p>
              )}
              <Button type="submit" color="blue">
                Mettre à jour les images
              </Button>
            </div>
          </form>
        </section>

        {/* SECTION: Coordonnées */}
        <section className="rounded-xl border border-gray-100 bg-white/80 px-6 py-8 shadow-sm">
          <form action={submitLocation}>
            {/* // SECTION: Coordonnées */}
            <h2 className="mb-2 text-lg font-semibold text-gray-900">
              Coordonnées et localisation
            </h2>
            <p className="mb-6 text-sm text-gray-600">
              Indiquez vos coordonnées pour faciliter la prise de contact et la
              venue de vos clients.
            </p>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="col-span-full">
                <Field>
                  <Label htmlFor="street-address">Adresse</Label>
                  <Input
                    name="streetaddress"
                    type="text"
                    autoComplete="street-address"
                    aria-label="Adresse"
                    placeholder="Adresse complète"
                    aria-describedby="streetaddress-error"
                  />
                  <FormError
                    errors={locationState.errors}
                    field="streetaddress"
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
                    aria-describedby="city-error"
                  />
                  <FormError errors={locationState.errors} field="city" />
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
                    aria-describedby="postalcode-error"
                  />
                  <FormError errors={locationState.errors} field="postalcode" />
                </Field>
              </div>
            </div>
            <div className="py-4">
              <Button type="submit" color="blue">
                Enregistrer mes coordonnées visibles sur la page publique
              </Button>
              {locationState.error && (
                <p className="mt-2 text-sm text-red-600">
                  {locationState.error}
                </p>
              )}
              {typeof locationState.message === 'string' && (
                <p className="mt-2 text-sm text-green-600">
                  {locationState.message}
                </p>
              )}
            </div>
          </form>
        </section>

        {/* SECTION: Horaires */}
        <section className="rounded-xl border border-gray-100 bg-gray-50 px-6 py-8 shadow-sm">
          <form action={submitHoraires}>
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
                        type="time"
                        name={`${day.toLowerCase()}-start`}
                        id={`${day.toLowerCase()}-start`}
                        aria-label={`Heure de début ${day}`}
                        placeholder="Début"
                        aria-describedby={`${day.toLowerCase()}-start-error`}
                      />
                      <FormError
                        errors={horaireState.errors}
                        field={`${day.toLowerCase()}-start`}
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
                        aria-describedby={`${day.toLowerCase()}-end-error`}
                      />
                      <FormError
                        errors={horaireState.errors}
                        field={`${day.toLowerCase()}-end`}
                      />
                    </Field>
                  </div>
                  <div className="text-xs text-gray-500 sm:col-span-2">
                    <span className="hidden sm:inline">Heure d’ouverture</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                color="blue"
                disabled={isSubmittingHoraires}
              >
                Enregistrer mes horaires
              </Button>
              {horaireState.error && (
                <p className="mt-2 text-sm text-red-600">
                  {horaireState.error}
                </p>
              )}
              {typeof horaireState.message === 'string' && (
                <p className="mt-2 text-sm text-green-600">
                  {horaireState.message}
                </p>
              )}
            </div>
          </form>
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
          <form action={submitService} className="space-y-8">
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
                    aria-describedby="servicename-error"
                  />
                  <FormError errors={serviceState.errors} field="servicename" />
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
                    aria-describedby="serviceduration-error"
                  />
                  <FormError
                    errors={serviceState.errors}
                    field="serviceduration"
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
                    aria-describedby="serviceprice-error"
                  />
                  <FormError
                    errors={serviceState.errors}
                    field="serviceprice"
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
                    rows={2}
                    aria-label="Description du service"
                    placeholder="Décrivez en quelques mots le service proposé"
                    aria-describedby="servicedescription-error"
                  />
                  <FormError
                    errors={serviceState.errors}
                    field="servicedescription"
                  />
                </Field>
              </div>
            </div>
            <div>
              <Button
                type="submit"
                className="pt-4"
                color="blue"
                aria-label="Enregistrer le service"
                disabled={isSubmittingService}
              >
                Enregistrer le service
              </Button>
              {serviceState.error && (
                <p className="mt-2 text-sm text-red-600">
                  {serviceState.error}
                </p>
              )}
              {typeof serviceState.message === 'string' && (
                <p className="mt-2 text-sm text-green-600">
                  {serviceState.message}
                </p>
              )}
            </div>
          </form>
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
          <form action={submitLinks}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <Field>
                  <Label htmlFor="facebook">Lien Facebook</Label>
                  <Input
                    type="url"
                    name="facebook"
                    id="facebook"
                    placeholder="https://facebook.com/votrepage"
                    aria-label="Lien Facebook"
                    aria-describedby="facebook-error"
                  />
                  <FormError errors={linksState.errors} field="facebook" />
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
                    aria-describedby="instagram-error"
                  />
                  <FormError errors={linksState.errors} field="instagram" />
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
                    aria-describedby="linkedin-error"
                  />
                  <FormError errors={linksState.errors} field="linkedin" />
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
                    aria-describedby="tiktok-error"
                  />
                  <FormError errors={linksState.errors} field="tiktok" />
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
                    aria-describedby="website-error"
                  />
                  <FormError errors={linksState.errors} field="website" />
                </Field>
              </div>
              <div className="mt-4 sm:col-span-6">
                <Button
                  type="submit"
                  color="blue"
                  aria-label="Enregistrer les liens sociaux"
                  disabled={isSubmittingLinks}
                >
                  Enregistrer mes liens sociaux et site web
                </Button>
                {linksState.error && (
                  <p className="mt-2 text-sm text-red-600">
                    {linksState.error}
                  </p>
                )}
                {typeof linksState.message === 'string' && (
                  <p className="mt-2 text-sm text-green-600">
                    {linksState.message}
                  </p>
                )}
              </div>
            </div>
          </form>
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
    </section>
  )
}
