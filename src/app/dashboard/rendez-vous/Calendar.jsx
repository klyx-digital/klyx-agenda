'use client'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
  BriefcaseIcon,
} from '@heroicons/react/20/solid'
import { Edit } from './Edit'
import { getRdvByUser } from './action'
import { useState } from 'react'
import { fr } from 'date-fns/locale'
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  format,
  isSameMonth,
  isToday,
  addMonths,
  subMonths,
} from 'date-fns'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Calendar({ rdvs }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState('')

  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
  const currentMonthLabel = format(currentMonth, 'MMMM yyyy', { locale: fr })

  const rdvDates = rdvs.map((rdv) => format(new Date(rdv.date), 'yyyy-MM-dd'))
  const rdvsOfSelectedDate = rdvs.filter(
    (rdv) => format(new Date(rdv.date), 'yyyy-MM-dd') === selectedDate,
  )

  const days = eachDayOfInterval({ start, end }).map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    isCurrentMonth: isSameMonth(date, currentMonth),
    isToday: isToday(date),
    isSelected: format(date, 'yyyy-MM-dd') === selectedDate,
    hasRdv: rdvDates.includes(format(date, 'yyyy-MM-dd')),
  }))

  return (
    <div>
      <h2 className="text-base font-semibold text-gray-900">
        Prochains rendez-vous
      </h2>
      <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
        <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
          <div className="flex items-center text-gray-900">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Mois précédent</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">
              {currentMonthLabel}
            </div>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Mois suivant</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-xs/6 text-gray-500">
            <div>L</div>
            <div>M</div>
            <div>M</div>
            <div>J</div>
            <div>V</div>
            <div>S</div>
            <div>D</div>
          </div>
          <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow-sm ring-1 ring-gray-200">
            {days.map((day, dayIdx) => (
              <button
                key={day.date}
                type="button"
                onClick={() => setSelectedDate(day.date)}
                className={classNames(
                  'py-1.5 hover:bg-gray-100 focus:z-10',
                  day.isCurrentMonth ? 'bg-white' : 'bg-gray-50',
                  (day.isSelected || day.isToday) && 'font-semibold',
                  day.isSelected && 'text-white',
                  !day.isSelected &&
                    day.isCurrentMonth &&
                    !day.isToday &&
                    'text-gray-900',
                  !day.isSelected &&
                    !day.isCurrentMonth &&
                    !day.isToday &&
                    'text-gray-400',
                  day.isToday && !day.isSelected && 'text-blue-600',
                  dayIdx === 0 && 'rounded-tl-lg',
                  dayIdx === 6 && 'rounded-tr-lg',
                  dayIdx === days.length - 7 && 'rounded-bl-lg',
                  dayIdx === days.length - 1 && 'rounded-br-lg',
                )}
              >
                <time
                  dateTime={day.date}
                  className={classNames(
                    'mx-auto flex size-7 items-center justify-center rounded-full',
                    day.isSelected && day.isToday && 'bg-blue-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
                {day.hasRdv && (
                  <span className="mx-auto block h-1 w-1 rounded-full bg-green-500"></span>
                )}
              </button>
            ))}
          </div>
          {selectedDate && (
            <div className="mt-6 text-left">
              <h3 className="text-sm font-semibold text-gray-900">
                Rendez-vous du{' '}
                {format(new Date(selectedDate), 'dd MMMM yyyy', { locale: fr })}
              </h3>
              {rdvsOfSelectedDate.length > 0 ? (
                <ul className="mt-2 space-y-2 text-sm text-gray-700">
                  {rdvsOfSelectedDate.map((rdv) => (
                    <li
                      key={rdv.id}
                      className="rounded border px-3 py-2 shadow-sm"
                    >
                      <p>
                        <strong>{rdv.client.name}</strong> à{' '}
                        {format(new Date(rdv.date), 'HH:mm')}
                      </p>
                      <p>
                        {rdv.service.name} – {rdv.service.duration} min
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-2 text-sm text-gray-500">
                  Aucun rendez-vous ce jour-là.
                </p>
              )}
            </div>
          )}
          <Edit />
        </div>
        <ol className="mt-4 divide-y divide-gray-100 text-sm/6 lg:col-span-7 xl:col-span-8">
          {rdvs.map((rdv) => (
            <li key={rdv.id} className="relative flex gap-x-6 py-6 xl:static">
              <div className="flex-auto">
                <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">
                  {rdv.client.name}
                </h3>
                <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                  <div className="flex items-start gap-x-3">
                    <dt className="mt-0.5">
                      <span className="sr-only">Date</span>
                      <CalendarIcon
                        className="size-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>
                      <time dateTime={rdv.datetime}>
                        {format(
                          new Date(rdv.date),
                          "EEEE d MMMM yyyy 'à' HH:mm",
                          { locale: fr },
                        )}
                      </time>
                    </dd>
                  </div>
                  <div className="mt-2 flex items-start gap-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400/50 xl:pl-3.5">
                    <dt className="mt-0.5">
                      <span className="sr-only">Lieu</span>
                      <BriefcaseIcon
                        className="size-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </dt>
                    <dd>{rdv.service.name}</dd>
                  </div>
                </dl>
              </div>
              <Menu
                as="div"
                className="absolute top-6 right-0 xl:relative xl:top-auto xl:right-auto xl:self-center"
              >
                <div>
                  <MenuButton className="-m-2 flex items-center rounded-full p-2 text-gray-500 hover:text-gray-600">
                    <span className="sr-only">Ouvrir les options</span>
                    <EllipsisHorizontalIcon
                      className="size-5"
                      aria-hidden="true"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                >
                  <div className="py-1">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Modifier
                      </a>
                    </MenuItem>
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                      >
                        Annuler
                      </a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
