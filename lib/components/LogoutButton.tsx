'use client'
import { createClient } from "@/utils/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "./ui/Button"

export const Logout=  () => {
    const router = useRouter()
    const supabase = createClient()
    const handleSignOut = async () => {
        await supabase.auth.signOut()
        router.refresh()
    }
    return (
        <div className="absolute right-10 top-6">
            <Button onClick={handleSignOut}>Logout</Button>
        </div>
    )
}