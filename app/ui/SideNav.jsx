'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from 'react-icons/md'
import RenderSideNavLink from './RenderSideNavLink'

const SideNav = ({ links, text, colors }) => {
  const [showSideNav, setShowSideNav] = useState(false)

  return (
    <div
      className={clsx(
        'fixed z-50 flex h-full w-64 flex-col px-3 py-4 transition-all duration-300 md:px-2 xl:relative',
        {
          'left-0 border-r bg-gray-100 shadow-xl xl:static xl:border-0 xl:bg-transparent xl:shadow-none':
            showSideNav === true,
          '-left-64 w-0 p-0 xl:left-0 xl:w-64': showSideNav === false,
        },
      )}
    >
      <Link
        className={`mb-2 flex h-20 items-end justify-start rounded-md border ${colors.bg} p-4 md:h-40`}
        href="/teacher"
      >
        <div className="w-32 text-white md:w-40">
          <span className="text-xl font-medium">{text}</span>
        </div>
      </Link>
      <div className="flex grow flex-col justify-between gap-y-2">
        <RenderSideNavLink
          links={links}
          colors={colors}
          showSideNav={showSideNav}
          setShowSideNav={setShowSideNav}
        />
        <div className="h-auto w-full grow rounded-md border bg-gray-50"></div>
        <form>
          <button
            className={`flex h-[48px] w-full items-center gap-2 rounded-md border bg-gray-50 p-3 text-sm font-medium ${colors.hoverBg} hover:${colors.text} flex-none`}
          >
            {/* <PowerIcon className="w-6" /> */}
            <div className="">Sign Out</div>
          </button>
        </form>
      </div>
      <button
        type="button"
        className={clsx(
          'fixed top-1/2 block -translate-y-1/2 rounded-r-lg bg-sky-300 px-1 py-8 text-xl transition-all duration-300 xl:hidden',
          {
            'left-64': showSideNav === true,
            'left-0': showSideNav === false,
          },
        )}
        onClick={() => setShowSideNav(!showSideNav)}
      >
        {showSideNav ? (
          <MdOutlineArrowBackIosNew />
        ) : (
          <MdOutlineArrowForwardIos />
        )}
      </button>
    </div>
  )
}

export default SideNav
