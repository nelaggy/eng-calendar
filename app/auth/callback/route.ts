import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('token')

  if (code) {
    const supabase = createClient()
    const {data, error} = await supabase.auth.verifyOtp({
      type: 'magiclink',
      token_hash: code
    })
    if (error) {
      const { data, error} = await supabase.auth.verifyOtp({
        type: 'signup',
        token_hash: code
      })
      if (error) {
        return NextResponse.json('error has occurred, please try again')
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(requestUrl.origin)
}