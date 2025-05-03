import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import {
  CalendarIcon,
  UserPlusIcon,
  CurrencyEuroIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Stat({ stats }) {
  return (
    <div>
      <h1 className="text-base font-semibold text-gray-900">Bienvenue</h1>
      <p>Voici votre résumé du jour</p>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const icons = {
            'Dernier RDV': CalendarIcon,
            'Nouveaux clients': UserPlusIcon,
            'Revenus générés': CurrencyEuroIcon,
            Messages: ChatBubbleLeftEllipsisIcon,
          }

          const Icon = icons[item.name] || CalendarIcon

          return (
            <div
              key={item.name}
              className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
            >
              <dt>
                <div className="absolute rounded-md bg-indigo-500 p-3">
                  <Icon aria-hidden="true" className="h-6 w-6 text-white" />
                </div>
                <p className="ml-16 truncate text-sm font-medium text-gray-500">
                  {item.name}
                </p>
              </dt>
              <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">
                  {item.value}
                </p>
                {item.change && (
                  <p
                    className={classNames(
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600',
                      'ml-2 flex items-baseline text-sm font-semibold',
                    )}
                  >
                    {item.changeType === 'increase' ? (
                      <ArrowUpIcon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 self-center text-green-500"
                      />
                    ) : (
                      <ArrowDownIcon
                        aria-hidden="true"
                        className="h-5 w-5 shrink-0 self-center text-red-500"
                      />
                    )}
                    <span className="sr-only">
                      {' '}
                      {item.changeType === 'increase'
                        ? 'Augmentation'
                        : 'Diminution'}{' '}
                      de{' '}
                    </span>
                    {item.change}
                  </p>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <Link
                      href={
                        item.name === 'Prochain RDV'
                          ? '/dashboard/rendez-vous'
                          : item.name === 'Nouveaux clients ce mois'
                            ? '/dashboard/clients'
                            : item.name === 'Revenus générés ce mois'
                              ? '/dashboard/clients'
                              : '#'
                      }
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Voir tout
                      <span className="sr-only"> {item.name} stats</span>
                    </Link>
                  </div>
                </div>
              </dd>
            </div>
          )
        })}
      </dl>
    </div>
  )
}
