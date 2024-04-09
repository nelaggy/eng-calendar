'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"

export default function Logout () {
    const router = useRouter()
    const supabase = createClient()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <button className="absolute right-4 top-4" onClick={handleSignOut}>Logout</button>
    )
}