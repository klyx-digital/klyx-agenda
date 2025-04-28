import { Inter, Lexend } from 'next/font/google'
import clsx from 'clsx'

import '@/styles/tailwind.css'

export const metadata = {
  title: 'Klyx Agenda',
  description:
    'Klyx vous aide à gérer vos rendez-vous, encaisser vos paiements en ligne et envoyer des rappels automatiques. Une solution tout-en-un, simple et efficace.',
}

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const lexend = Lexend({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lexend',
})

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={clsx(
        'h-full scroll-smooth bg-white antialiased',
        inter.variable,
        lexend.variable,
      )}
    >
      <body className="flex h-full flex-col">{children}</body>
    </html>
  )
}
