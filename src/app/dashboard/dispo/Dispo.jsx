'use client'

import { DialogDispo } from './DialogDispo'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EllipsisHorizontalIcon,
} from '@heroicons/react/20/solid'
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
  addDays,
  subDays,
} from 'date-fns'
import { useEffect, useRef, useState } from 'react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dispo({ rdvs }) {
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  useEffect(() => {
    setSelectedDate(new Date())
  }, [])
  const start = startOfWeek(startOfMonth(currentMonth), { weekStartsOn: 1 })
  const end = endOfWeek(endOfMonth(currentMonth), { weekStartsOn: 1 })
  const currentMonthLabel = format(currentMonth, 'MMMM yyyy', { locale: fr })

  // TEMP test data for appointments

  const days = eachDayOfInterval({ start, end }).map((date) => ({
    date: format(date, 'yyyy-MM-dd'),
    isCurrentMonth: isSameMonth(date, currentMonth),
    isToday: isToday(date),
    isSelected:
      selectedDate &&
      format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd'),
  }))

  const container = useRef(null)
  const containerNav = useRef(null)
  const containerOffset = useRef(null)

  const [now, setNow] = useState(null)

  return (
    <div className="flex h-full flex-col">
      <header className="flex flex-none items-center justify-between border-b border-gray-200 px-6 py-4">
        <div>
          <h1 className="text-base font-semibold text-gray-900">
            {selectedDate && (
              <time dateTime={selectedDate.toISOString()} className="sm:hidden">
                {format(selectedDate, 'd MMMM yyyy', { locale: fr })}
              </time>
            )}
            {selectedDate && (
              <time
                dateTime={selectedDate.toISOString()}
                className="hidden sm:inline"
              >
                {format(selectedDate, 'd MMMM yyyy', { locale: fr })}
              </time>
            )}
          </h1>
          {selectedDate && (
            <p className="mt-1 text-sm text-gray-500">
              {format(selectedDate, 'EEEE', { locale: fr })}
            </p>
          )}
        </div>
        <div className="flex items-center">
          <div className="relative flex items-center rounded-md bg-white shadow-xs md:items-stretch">
            <button
              type="button"
              onClick={() =>
                setSelectedDate((prev) => prev && subDays(prev, 1))
              }
              className="flex h-9 w-12 items-center justify-center rounded-l-md border-y border-l border-gray-300 pr-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pr-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Jour précédent</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            {selectedDate && (
              <button
                type="button"
                onClick={() => setSelectedDate(new Date())}
                className="hidden border-y border-gray-300 px-3.5 text-sm font-semibold text-gray-900 hover:bg-gray-50 focus:relative md:block"
              >
                {isToday(selectedDate)
                  ? 'Aujourd’hui'
                  : format(selectedDate, 'd MMMM', { locale: fr })}
              </button>
            )}
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              onClick={() =>
                setSelectedDate((prev) => prev && addDays(prev, 1))
              }
              className="flex h-9 w-12 items-center justify-center rounded-r-md border-y border-r border-gray-300 pl-1 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:pl-0 md:hover:bg-gray-50"
            >
              <span className="sr-only">Jour suivant</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="hidden md:ml-4 md:flex md:items-center">
            <div className="ml-6 h-6 w-px bg-gray-300" />
            <DialogDispo />
          </div>
          <Menu as="div" className="relative ml-6 md:hidden">
            <MenuButton className="-mx-2 flex items-center rounded-full border border-transparent p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Ouvrir le menu</span>
              <EllipsisHorizontalIcon className="size-5" aria-hidden="true" />
            </MenuButton>

            <MenuItems
              transition
              className="absolute right-0 z-10 mt-3 w-36 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden data-closed:scale-95 data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
            >
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Créer un événement
                  </a>
                </MenuItem>
              </div>
              <div className="py-1">
                <MenuItem>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                  >
                    Aller à aujourdhui
                  </a>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
      </header>
      <div className="isolate flex flex-auto overflow-hidden bg-white">
        <div ref={container} className="flex flex-auto flex-col overflow-auto">
          <div className="flex w-full flex-auto">
            <div className="w-14 flex-none bg-white ring-1 ring-gray-100" />
            <div className="grid flex-auto grid-cols-1 grid-rows-1">
              {/* Horizontal lines */}
              <div
                className="col-start-1 col-end-2 row-start-1 grid divide-y divide-gray-100"
                style={{ gridTemplateRows: 'repeat(48, minmax(3.5rem, 1fr))' }}
              >
                <div ref={containerOffset} className="row-end-1 h-7"></div>
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    00h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    01h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    02h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    03h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    04h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    05h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    06h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    07h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    08h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    09h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    10h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    11h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    12h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    13h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    14h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    15h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    16h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    17h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    18h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    19h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    20h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    21h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    22h
                  </div>
                </div>
                <div />
                <div>
                  <div className="sticky left-0 -mt-2.5 -ml-14 w-14 pr-2 text-right text-xs/5 text-gray-400">
                    23h
                  </div>
                </div>
                <div />
              </div>

              {/* Events */}
              <ol
                className="col-start-1 col-end-2 row-start-1 grid grid-cols-1"
                style={{
                  gridTemplateRows: '1.75rem repeat(288, minmax(0, 1fr)) auto',
                }}
              >
                {Array.isArray(rdvs) &&
                  selectedDate &&
                  rdvs
                    .filter(
                      (rdv) =>
                        format(new Date(rdv.date), 'yyyy-MM-dd') ===
                        format(selectedDate, 'yyyy-MM-dd'),
                    )
                    .map((rdv) => {
                      const rdvDate = new Date(rdv.date)
                      const hours = rdvDate.getHours()
                      const minutes = rdvDate.getMinutes()
                      const startRow = hours * 12 + Math.floor(minutes / 5) + 2
                      const rowSpan = Math.ceil(
                        (rdv.service?.duration ?? 30) / 5,
                      )

                      // Palette de couleurs pour alternance
                      const colors = [
                        {
                          bg: 'bg-blue-50',
                          hover: 'hover:bg-blue-100',
                          text: 'text-blue-700',
                          subtext: 'text-blue-500',
                          hoverText: 'group-hover:text-blue-700',
                        },
                        {
                          bg: 'bg-pink-50',
                          hover: 'hover:bg-pink-100',
                          text: 'text-pink-700',
                          subtext: 'text-pink-500',
                          hoverText: 'group-hover:text-pink-700',
                        },
                        {
                          bg: 'bg-indigo-50',
                          hover: 'hover:bg-indigo-100',
                          text: 'text-indigo-700',
                          subtext: 'text-indigo-500',
                          hoverText: 'group-hover:text-indigo-700',
                        },
                        {
                          bg: 'bg-yellow-50',
                          hover: 'hover:bg-yellow-100',
                          text: 'text-yellow-700',
                          subtext: 'text-yellow-500',
                          hoverText: 'group-hover:text-yellow-700',
                        },
                      ]
                      const color =
                        colors[rdv.id?.charCodeAt(0) % colors.length]

                      return (
                        <li
                          key={rdv.id}
                          className="relative mt-px flex"
                          style={{ gridRow: `${startRow} / span ${rowSpan}` }}
                        >
                          <a
                            href="#"
                            className={`group absolute inset-1 flex flex-col overflow-y-auto rounded-lg ${color.bg} p-2 text-xs/5 ${color.hover}`}
                          >
                            <p
                              className={`order-1 font-semibold ${color.text}`}
                            >
                              {rdv.client?.name}
                            </p>
                            <p
                              className={`${color.subtext} ${color.hoverText}`}
                            >
                              {rdv.service?.name}
                            </p>
                            <p
                              className={`${color.subtext} ${color.hoverText}`}
                            >
                              <time dateTime={rdvDate.toISOString()}>
                                {format(rdvDate, 'HH:mm')}
                              </time>
                            </p>
                          </a>
                        </li>
                      )
                    })}
              </ol>
            </div>
          </div>
        </div>
        <div className="hidden w-1/2 max-w-md flex-none border-l border-gray-100 px-8 py-10 md:block">
          <div className="flex items-center text-center text-gray-900">
            <button
              type="button"
              onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeftIcon className="size-5" aria-hidden="true" />
            </button>
            <div className="flex-auto text-sm font-semibold">
              {' '}
              {currentMonthLabel}
            </div>
            <button
              type="button"
              onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Next month</span>
              <ChevronRightIcon className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 grid grid-cols-7 text-center text-xs/6 text-gray-500">
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
                onClick={() => setSelectedDate(new Date(day.date))}
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
                  day.isToday && !day.isSelected && 'text-indigo-600',
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
                    day.isSelected && day.isToday && 'bg-indigo-600',
                    day.isSelected && !day.isToday && 'bg-gray-900',
                  )}
                >
                  {day.date.split('-').pop().replace(/^0/, '')}
                </time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
