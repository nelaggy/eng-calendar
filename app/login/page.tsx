import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

import type { Database } from '@/lib/supabase'
import { Metadata } from 'next'
import Login from '@/lib/components/login_button'

export const metadata: Metadata = {
  title: 'Login'
}

export default function Page() {
  return(
    <div className='flex justify-center items-center align-middle flex-col h-screen'>
      <Login />
    </div>
  )
}