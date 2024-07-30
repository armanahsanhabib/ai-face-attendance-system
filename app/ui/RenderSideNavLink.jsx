'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const RenderSideNavLink = ({ links, colors, showSideNav, setShowSideNav }) => {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] items-center gap-2 rounded-md border bg-gray-50 text-sm font-medium ${colors.hoverBg} ${colors.hoverText} flex-none justify-start p-2 px-3 ${pathname === link.href && `${colors.border} ${colors.lightBg} ${colors.text}`}`}
            onClick={() => setShowSideNav(false)}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="">{link.name}</p>
          </Link>
        )
      })}
    </>
  )
}

export default RenderSideNavLink
