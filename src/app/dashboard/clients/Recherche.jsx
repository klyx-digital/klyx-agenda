'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useDebouncedCallback } from 'use-debounce'
import { Input, InputGroup } from '@/components/ui/input'

export function Recherche() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const { replace } = useRouter()

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')
    if (term) {
      params.set('query', term)
    } else {
      params.delete('query')
    }
    replace(`${pathname}?${params.toString()}`)
  }, 300)

  return (
    <section className="mb-6">
      <div className="mb-4">
        <h1 className="text-2xl font-semibold text-gray-900">Mes clients</h1>
      </div>
      <div>
        <label htmlFor="search" className="sr-only">
          Recherche
        </label>
        <InputGroup>
          <MagnifyingGlassIcon />
          <Input
            type="text"
            name="search"
            id="search"
            defaultValue={searchParams.get('query')?.toString()}
            onChange={(e) => handleSearch(e.target.value)}
            aria-label="Search"
            placeholder="Rechercher un client…"
          />
        </InputGroup>
      </div>
    </section>
  )
}
