import {
  CalendarIcon,
  ChatBubbleBottomCenterTextIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline'

const timeline = [
  {
    id: 1,
    content: 'Nouveau rendez-vous réservé par',
    target: 'Marie Dupont',
    href: '#',
    date: '27 avr.',
    datetime: '2024-04-27',
    icon: CalendarIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 2,
    content: 'Client a envoyé un message',
    target: 'Jean Martin',
    href: '#',
    date: '27 avr.',
    datetime: '2024-04-27',
    icon: ChatBubbleBottomCenterTextIcon,
    iconBackground: 'bg-green-500',
  },
  {
    id: 3,
    content: 'Nouveau client inscrit',
    target: 'Sophie Bernard',
    href: '#',
    date: '26 avr.',
    datetime: '2024-04-26',
    icon: UserPlusIcon,
    iconBackground: 'bg-blue-400',
  },
  {
    id: 4,
    content: 'Rendez-vous confirmé avec',
    target: 'Paul Lefevre',
    href: '#',
    date: '26 avr.',
    datetime: '2024-04-26',
    icon: CalendarIcon,
    iconBackground: 'bg-blue-500',
  },
  {
    id: 5,
    content: 'Message reçu de',
    target: 'Emma Dubois',
    href: '#',
    date: '25 avr.',
    datetime: '2024-04-25',
    icon: ChatBubbleBottomCenterTextIcon,
    iconBackground: 'bg-green-500',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Feeds() {
  return (
    <div className="mt-8 flow-root">
      <ul role="list" className="-mb-8">
        {timeline.map((event, eventIdx) => (
          <li key={event.id}>
            <div className="relative pb-8">
              {eventIdx !== timeline.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  <span
                    className={classNames(
                      event.iconBackground,
                      'flex size-8 items-center justify-center rounded-full ring-8 ring-white',
                    )}
                  >
                    <event.icon
                      aria-hidden="true"
                      className="size-5 text-white"
                    />
                  </span>
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm text-gray-500">
                      {event.content}{' '}
                      <a
                        href={event.href}
                        className="font-medium text-gray-900"
                      >
                        {event.target}
                      </a>
                    </p>
                  </div>
                  <div className="text-right text-sm whitespace-nowrap text-gray-500">
                    <time dateTime={event.datetime}>{event.date}</time>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
