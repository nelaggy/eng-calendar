import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "./utils/supabase/server"
import { withMiddlewareAuthRequired,  getSession } from "@auth0/nextjs-auth0/edge"

export default async function middleware (req: NextRequest) {
        const res = NextResponse.next()
    
        const supabase = createClient()
    
        const user_id = (await supabase.auth.getSession()).data.session?.user
        if (user_id && req.nextUrl.pathname.startsWith('/login')) {
            return Response.redirect(new URL('/calendar', req.url))
        }
        if (!user_id && req.nextUrl.pathname == '/calendar') {
            return Response.redirect(new URL('/login', req.url))
        }
    
        return res
}