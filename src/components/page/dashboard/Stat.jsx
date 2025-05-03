import { ArrowDownIcon, ArrowUpIcon } from '@heroicons/react/20/solid'
import {
  CalendarIcon,
  UserPlusIcon,
  CurrencyEuroIcon,
  ChatBubbleLeftEllipsisIcon,
} from '@heroicons/react/24/outline'

const stats = [
  {
    id: 1,
    name: 'Prochain RDV',
    stat: '12 avril 2024, 14:30',
    icon: CalendarIcon,
    change: '3',
    changeType: 'increase',
  },
  {
    id: 2,
    name: 'Nouveaux clients',
    stat: '24',
    icon: UserPlusIcon,
    change: '4',
    changeType: 'increase',
  },
  {
    id: 3,
    name: 'Revenus (€)',
    stat: '5,430',
    icon: CurrencyEuroIcon,
    change: '12%',
    changeType: 'increase',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Stat() {
  return (
    <div>
      <h1 className="text-base font-semibold text-gray-900">Bienvenue</h1>
      <p>Voici votre résumé du jour</p>

      <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => (
          <div
            key={item.id}
            className="relative overflow-hidden rounded-lg bg-white px-4 pt-5 pb-12 shadow-sm sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <item.icon aria-hidden="true" className="h-6 w-6 text-white" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">
                {item.stat}
              </p>
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
              <div className="absolute inset-x-0 bottom-0 bg-gray-50 px-4 py-4 sm:px-6">
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Voir tout<span className="sr-only"> {item.name} stats</span>
                  </a>
                </div>
              </div>
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
