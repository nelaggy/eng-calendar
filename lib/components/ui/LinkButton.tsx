import Link from "next/link"

export const LinkButton = ({
    href,
    children
}: {
    href: string
    children: React.ReactNode
}) => {
    return (
        <a href={href} className='py-2.5 px-6 text-sm border border-gray-300 rounded-lg shadow-xs bg-transparent font-semibold transition-all duration-500 hover:bg-gray-50 hover:text-gray-900'>
            {children}
        </a>
    )
}
            