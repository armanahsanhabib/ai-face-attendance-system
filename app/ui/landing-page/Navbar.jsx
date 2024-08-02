'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  return (
    <nav className="flex justify-center space-x-8 font-medium">
      <Link href="#home" className="text-gray-800 hover:text-blue-600">
        Home
      </Link>
      <Link href="#about" className="text-gray-800 hover:text-blue-600">
        About
      </Link>
      <Link href="#features" className="text-gray-800 hover:text-blue-600">
        Features
      </Link>
      <Link href="#pricing" className="text-gray-800 hover:text-blue-600">
        Pricing
      </Link>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="flex items-center gap-1 text-gray-800 hover:text-blue-600 focus:outline-none"
        >
          <span>Login</span>
          <IoIosArrowDown
            className={clsx('text-lg transition-all', {
              'rotate-180': dropdownOpen,
            })}
          />
        </button>
        {dropdownOpen && (
          <div className="absolute left-0 mt-2 w-48 rounded-lg border bg-white shadow-lg">
            <a
              href="/admin"
              className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
            >
              Admin Panel
            </a>
            <a
              href="/teacher"
              className="block border-b px-4 py-2 text-gray-800 hover:bg-blue-100"
            >
              Teacher Panel
            </a>
            <a
              href="/student"
              className="block px-4 py-2 text-gray-800 hover:bg-blue-100"
            >
              Student Panel
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
