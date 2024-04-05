'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

import type { Database } from '@/lib/supabase'

export default function Login() {
  const router = useRouter()
  const supabase = createClientComponentClient<Database>()

  const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/';
  
    // Make sure to include https:// when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing /.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google', 
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
          hd: 'cam.ac.uk'
        },
        redirectTo: `${getURL()}auth/callback`
      },
    })
    router.refresh()
  }

  return (
    <>
      <button onClick={handleSignIn}>Sign in</button>
    </>
  )
}