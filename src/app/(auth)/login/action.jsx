'use server'

import { signIn } from '@/auth'
import { AuthError } from 'next-auth'
import { redirect } from 'next/navigation' // au cas où tu préfères gérer toi-même

export async function authenticateUser(prevState, formData) {
  try {
    // 1. on convertit bien FormData -> objet
    const credentials = Object.fromEntries(formData)

    // 2. on tente la connexion
    await signIn('credentials', {
      ...credentials,
      redirectTo: '/dashboard', // ou retire-le si tu veux gérer redirect() toi-même
    })

    // 3a. Si tu **n’utilises pas** redirectTo :
    // redirect('/dashboard')

    return {} // succès (aucun message d’erreur)
  } catch (error) {
    /* --- on ne gère QUE les AuthError --- */
    if (error instanceof AuthError) {
      // mauvais login / mdp
      return { message: 'Email ou mot de passe incorrect' }
    }

    /* --- on laisse passer la redirection --- */
    if (error?.message?.startsWith('NEXT_REDIRECT')) {
      throw error // laisse Next.js gérer la redirection
    }

    // toute autre erreur inconnue
    return { message: 'Une erreur est survenue. Veuillez réessayer.' }
  }
}
