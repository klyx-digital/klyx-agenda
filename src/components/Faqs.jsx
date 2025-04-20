import Image from 'next/image'

import { Container } from '@/components/Container'
import backgroundImage from '@/images/background-faqs.jpg'

const faqs = [
  [
    {
      question: 'Est-ce que Klyx propose un plan gratuit ?',
      answer:
        'Oui. Le plan gratuit vous permet de gérer jusqu’à 10 rendez-vous par mois, avec confirmation par email. Parfait pour tester la plateforme sans risque.',
    },
    {
      question: 'Puis-je accepter les paiements en ligne ?',
      answer:
        'Absolument. Vous pouvez encaisser vos clients via Stripe ou PayPal directement depuis la plateforme, en toute sécurité.',
    },
  ],
  [
    {
      question: 'Dois-je installer une application ou un logiciel ?',
      answer:
        'Non, tout fonctionne 100 % en ligne depuis votre navigateur. Klyx est accessible depuis n’importe quel appareil (ordinateur, tablette, mobile).',
    },
    {
      question:
        'Est-ce que mes clients reçoivent un rappel avant leur rendez-vous ?',
      answer:
        'Oui, automatiquement ! Ils reçoivent une confirmation par email, puis un rappel par email ou SMS selon votre abonnement.',
    },
  ],
  [
    {
      question: 'Comment mes données sont-elles sécurisées ?',
      answer:
        'Vos données sont hébergées en Europe, protégées par chiffrement et sauvegardées quotidiennement. Nous respectons le RGPD.',
    },

    {
      question: 'Puis-je arrêter mon abonnement à tout moment ?',
      answer:
        'Bien sûr. Nos abonnements sont sans engagement. Vous pouvez arrêter ou modifier votre formule quand vous le souhaitez, en un clic.',
    },
  ],
]

export function Faqs() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-title"
      className="relative overflow-hidden bg-slate-50 py-20 sm:py-32"
    >
      <Image
        className="absolute top-0 left-1/2 max-w-none translate-x-[-30%] -translate-y-1/4"
        src={backgroundImage}
        alt=""
        width={1558}
        height={946}
        unoptimized
      />
      <Container className="relative">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2
            id="faq-title"
            className="font-display text-3xl tracking-tight text-slate-900 sm:text-4xl"
          >
            Questions fréquentes
          </h2>
          <p className="mt-4 text-lg tracking-tight text-slate-700">
            Vous avez une question sur nos fonctionnalités, nos tarifs ou la
            sécurité de vos données ? Voici les réponses aux questions les plus
            courantes. Et si vous en avez d’autres, notre équipe est à votre
            écoute.
          </p>
        </div>
        <ul
          role="list"
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3"
        >
          {faqs.map((column, columnIndex) => (
            <li key={columnIndex}>
              <ul role="list" className="flex flex-col gap-y-8">
                {column.map((faq, faqIndex) => (
                  <li key={faqIndex}>
                    <h3 className="font-display text-lg/7 text-slate-900">
                      {faq.question}
                    </h3>
                    <p className="mt-4 text-sm text-slate-700">{faq.answer}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
