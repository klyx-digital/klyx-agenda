import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import {
  ChevronDownIcon,
  ArrowTopRightOnSquareIcon,
} from '@heroicons/react/16/solid'
import { Field, Label } from '@/components/ui/fieldset'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

export function FormPublique() {
  return (
    <section>
      <form>
        <div className="space-y-12">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Profil public professionnel
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Ces informations seront visibles par vos clients sur votre page
              professionnelle. Renseignez-les avec soin pour refléter votre
              identité et attirer de nouveaux clients.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="col-span-full space-y-2">
                <h3 className="text-base font-semibold">
                  Informations générales de l’entreprise
                </h3>
                <p className="text-sm text-gray-700">
                  Présentez votre activité en quelques lignes claires et
                  percutantes.
                </p>
                <Field>
                  <Label htmlFor="name">Nom de l’entreprise</Label>
                  <Input
                    name="name"
                    id="name"
                    aria-label="Nom de l’entreprise"
                  />
                </Field>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-900"
                >
                  Présentation de l&apos;entreprise
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    aria-label="Présentation de l'entreprise"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    defaultValue={''}
                  />
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  Décrivez votre entreprise, votre expertise ou votre approche.
                  Ce texte apparaîtra en haut de votre page publique.
                </p>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium text-gray-900"
                >
                  Logo de l’entreprise
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    aria-hidden="true"
                    className="size-24 text-gray-300"
                  />
                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50"
                    aria-label="Changer le logo de l’entreprise"
                  >
                    Modifier le logo
                  </button>
                </div>
              </div>
              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium text-gray-900"
                >
                  Image de couverture
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      aria-hidden="true"
                      className="mx-auto size-12 text-gray-300"
                    />
                    <div className="mt-4 flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500"
                      >
                        <span>Téléverser un fichier</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          aria-label="Téléverser une image de couverture"
                        />
                      </label>
                      <p className="pl-1">ou glissez-déposez un fichier</p>
                    </div>
                    <p className="text-xs text-gray-600">
                      PNG, JPG ou GIF (10 Mo max)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Services proposés
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Listez les services que vous proposez avec leur description, leur
              tarif et leur durée. Ces informations seront visibles sur votre
              page publique.
            </p>
            <div className="mt-6 space-y-8">
              {/* Structure directe pour un service, à rendre dynamique plus tard */}
              <div className="grid grid-cols-1 items-end gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    className="block text-sm font-medium text-gray-900"
                    htmlFor="service-name-0"
                  >
                    Nom du service
                  </label>
                  <input
                    type="text"
                    name="service-name-0"
                    id="service-name-0"
                    aria-label="Nom du service"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label
                    className="block text-sm font-medium text-gray-900"
                    htmlFor="service-duration-0"
                  >
                    Durée (en minutes)
                  </label>
                  <input
                    type="number"
                    name="service-duration-0"
                    id="service-duration-0"
                    aria-label="Durée du service"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label
                    className="block text-sm font-medium text-gray-900"
                    htmlFor="service-price-0"
                  >
                    Prix (€)
                  </label>
                  <input
                    type="number"
                    name="service-price-0"
                    id="service-price-0"
                    aria-label="Prix du service"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
                <div className="sm:col-span-6">
                  <label
                    className="block text-sm font-medium text-gray-900"
                    htmlFor="service-description-0"
                  >
                    Description du service
                  </label>
                  <textarea
                    name="service-description-0"
                    id="service-description-0"
                    rows={2}
                    aria-label="Description du service"
                    className="mt-2 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                    placeholder="Décrivez en quelques mots le service proposé"
                  />
                </div>
              </div>
              <div>
                <button
                  type="button"
                  className="mt-4 inline-flex items-center rounded-md bg-indigo-50 px-3 py-1.5 text-sm font-medium text-indigo-700 ring-1 ring-indigo-600/20 ring-inset hover:bg-indigo-100"
                  aria-label="Ajouter un service"
                >
                  + Ajouter un service
                </button>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base/7 font-semibold text-gray-900">
              Coordonnées et localisation
            </h2>
            <p className="mt-1 text-sm/6 text-gray-600">
              Indiquez votre adresse pour rassurer vos clients sur votre
              localisation et faciliter leur venue.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Pays
                </label>
                <div className="mt-2 grid grid-cols-1">
                  <select
                    id="country"
                    name="country"
                    autoComplete="country-name"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  >
                    <option>France</option>
                    <option>Belgique</option>
                  </select>
                  <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="street-address"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Adresse
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    autoComplete="street-address"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="city"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Ville
                </label>
                <div className="mt-2">
                  <input
                    id="city"
                    name="city"
                    type="text"
                    autoComplete="address-level2"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="postal-code"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Code postal
                </label>
                <div className="mt-2">
                  <input
                    id="postal-code"
                    name="postal-code"
                    type="text"
                    autoComplete="postal-code"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Horaires d’ouverture
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Indiquez vos horaires d’ouverture pour chaque jour de la semaine.
              Vos clients pourront consulter ces informations sur votre page
              publique.
            </p>
            <div className="mt-10 space-y-2">
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
                    idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                  } px-2 py-2`}
                >
                  <div className="text-sm font-medium text-gray-900 sm:col-span-2">
                    {day}
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="time"
                      name={`${day.toLowerCase()}-start`}
                      id={`${day.toLowerCase()}-start`}
                      aria-label={`Heure de début ${day}`}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                  <div className="sm:col-span-4">
                    <input
                      type="time"
                      name={`${day.toLowerCase()}-end`}
                      id={`${day.toLowerCase()}-end`}
                      aria-label={`Heure de fin ${day}`}
                      className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 shadow-sm outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                    />
                  </div>
                  <div className="text-sm text-gray-500 sm:col-span-2">
                    <span className="hidden sm:inline">Heure d’ouverture</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-base font-semibold text-gray-900">
              Liens sociaux et site web
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Ajoutez vos liens vers les réseaux sociaux ou votre site web pour
              renforcer votre présence en ligne et la confiance de vos clients.
            </p>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien du site web
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline-1 -outline-offset-1 outline-gray-300 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <div className="shrink-0 text-base text-gray-500 select-none sm:text-sm">
                      klyx-agenda.com/pro/
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="janesmith"
                      aria-label="Identifiant de la page publique"
                      className="block min-w-0 grow py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="facebook"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien Facebook
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="facebook"
                    id="facebook"
                    placeholder="https://facebook.com/votrepage"
                    aria-label="Lien Facebook"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="instagram"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien Instagram
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="instagram"
                    id="instagram"
                    placeholder="https://instagram.com/votreprofil"
                    aria-label="Lien Instagram"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="linkedin"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien LinkedIn
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="linkedin"
                    id="linkedin"
                    placeholder="https://linkedin.com/in/votreprofil"
                    aria-label="Lien LinkedIn"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="tiktok"
                  className="block text-sm font-medium text-gray-900"
                >
                  Lien TikTok
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="tiktok"
                    id="tiktok"
                    placeholder="https://tiktok.com/@votreprofil"
                    aria-label="Lien TikTok"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium text-gray-900"
                >
                  Site web personnel ou professionnel
                </label>
                <div className="mt-2">
                  <input
                    type="url"
                    name="website"
                    id="website"
                    placeholder="https://www.votresite.com"
                    aria-label="Site web personnel ou professionnel"
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button type="button" className="text-sm font-semibold text-gray-900">
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Enregistrer
          </button>
        </div>
      </form>
      <div className="mt-8 flex items-center justify-end">
        <Link
          href=""
          className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline focus:outline-none"
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
  )
}
