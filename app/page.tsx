'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { redirect, useRouter } from 'next/navigation'

import type { Database } from '@/lib/supabase'

export default function Page() {
  redirect('/calendar')
}