import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextRequest, NextResponse } from "next/server"
import { createClient } from "./utils/supabase/server"

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    const supabase = createClient()

    const user = (await supabase.auth.getUser()).data.user
    if (user && req.nextUrl.pathname.startsWith('/login')) {
        return Response.redirect(new URL('/calendar', req.url))
    }
    if (!user && req.nextUrl.pathname.startsWith('/calendar')) {
        return Response.redirect(new URL('/login', req.url))
    }

    return res
}