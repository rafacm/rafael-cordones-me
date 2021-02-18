import { useState } from 'react'
import Link from 'next/link'

const items = [
  { href: 'https://www.linkedin.com/in/rafaelcordones/', text: 'LinkedIn' },
  { href: 'https://github.com/rafacm', text: 'GitHub' },
  { href: 'https://twitter.com/rafacm', text: 'Twitter' },
  { href: 'https://speakerdeck.com/rafacm/', text: 'Talks' }
]

export default function Navigation() {
  const [isExpanded, toggleExpansion] = useState(false)
  return (
    <nav className="container mx-auto px-6 py-3">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href={`/`}>
              <a><span className="font-semibold text-2xl tracking-tight">rafael cordones</span></a>
            </Link>
          </div>
          { /* Mobile menu button */}
          <div className="flex md:hidden">
            <button onClick={() => toggleExpansion(!isExpanded)}
                    className="navbar-burger flex items-center text-green-600 p-3">
              <svg className="block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <title>Mobile menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        { /* Mobile Menu open: "block", Menu closed: "hidden" */}
        <div
          className={`md:flex items-center ${isExpanded ? `block` : `hidden`}`}>
          <div className="flex flex-col mt-2 md:flex-row md:mt-0 md:mx-1">
            {items.map((item, index) => (
              <Link key={index} href={item.href}>
                <a
                  className="my-1 text-gray-700 leading-5 hover:text-blue-600 hover:underline md:mx-4 md:my-0"
                  href={item.href}>
                  {item.text}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}
