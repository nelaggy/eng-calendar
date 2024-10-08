'use client'
import { useRouter } from "next/navigation"
import { LinkButton } from "./ui/LinkButton"

export const LoginButton = () => {
    const router = useRouter()
    return (
        <div className='flex justify-center items-center align-middle flex-col h-screen'>
            <LinkButton href={'/api/auth/login'}>Login</LinkButton>
        </div>
    )
  }