import { Button } from '@/components/ui/Button'

export function SubscriptionButton({ searchParams }) {
  return (
    <form action="/api/checkout_sessions" method="POST">
      <section>
        <Button type="submit" role="link" color="white">
          Passer à Klyx Pro
        </Button>
      </section>
    </form>
  )
}
