import { Metadata } from 'next'
import { LoginButton } from '@/lib/components/LoginButton'

export const metadata: Metadata = {
  title: 'Login'
}

export default function Page() {
  return(
    <LoginButton />
  )
}