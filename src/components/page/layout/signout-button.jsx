'use client'
import { signOut } from 'next-auth/react'

export function SignOut() {
  return <span onClick={() => signOut()}>Déconnexion</span>
}
