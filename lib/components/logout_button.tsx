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
        <button className="absolute right-10 top-6" onClick={handleSignOut}>Logout</button>
    )
}