'use client'
import { Database } from "@/lib/supabase"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

export default function Page() {
    const router = useRouter()
    const supabase = createClientComponentClient<Database>()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return ( 
        <>
            <div className='text-4xl text-center'>Calendar</div>
            <button onClick={handleSignOut}>Logout</button>
        </>
    )
}