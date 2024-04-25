import { createClient } from '@supabase/supabase-js';
import { AppRouteHandlerFnContext, Session, handleAuth, handleCallback, getSession, handleLogin } from '@auth0/nextjs-auth0/edge';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge'

const afterCallback = async (req: NextRequest, session: Session) => {
    return session
  }
  

export const GET = handleAuth({
    login: handleLogin({authorizationParams: {connection: 'raven'}}),
    callback: async (req: NextRequest, ctx: AppRouteHandlerFnContext) => {
        const res = (await handleCallback(req, ctx, { afterCallback })) as NextResponse;
        const session = await getSession(req, res);
        if (session) {
            const user_id = session.user.sub.split('|')
            const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!, {
                auth: {
                  autoRefreshToken: false,
                  persistSession: false
                }
            })
            const {data} = await supabase.auth.admin.generateLink({
                type: 'magiclink', 
                email: user_id[user_id.length -1],
                options: {
                    data: {
                        given_name: session.user.given_name,
                        family_name: session.user.family_name,
                        display_name: session.user.given_name
                    }
                }
            })
            const hash = data.properties?.hashed_token
            const redir = `${req.nextUrl.origin}/auth/callback?token=${hash}`

            if(hash) {
                return NextResponse.redirect(redir)
            }
        }
        return NextResponse.redirect(process.env.AUTH0_BASE_URL!)
    }
});