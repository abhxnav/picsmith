'use client'

import Link from 'next/link'
import { Logo } from '@/components'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui'

const Sidebar = () => {
  const pathname = usePathname()

  return (
    <aside className="hidden h-screen w-72 bg-dark-400 p-5 shadow-md shadow-green-200/50 lg:flex">
      <div className="flex size-full flex-col gap-4">
        <Link href="/" className="flex items-center gap-2 md:py-2">
          <Logo />
        </Link>

        <nav className="h-full flex-col justify-between md:flex md:gap-4">
          {/* When signed in */}
          <SignedIn>
            <div className="flex flex-col justify-between h-full">
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {navLinks.slice(0, 6).map((link) => {
                  const isActive = link.route === pathname
                  return (
                    <li
                      key={link.route}
                      className={`flex justify-center items-center text-base font-semibold w-full whitespace-nowrap rounded-xl bg-cover transition-all hover:bg-accent-400 hover:shadow-inner group ${
                        isActive
                          ? 'bg-accent-400 text-dark-400'
                          : 'text-dark-700'
                      }`}
                    >
                      <Link
                        href={link.route}
                        className="text-base font-semibold flex items-center size-full gap-4 py-2 px-4 hover:brightness-0 hover:text-dark-400"
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={30}
                          height={30}
                          className={`${isActive && 'brightness-0'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
              <ul className="hidden w-full flex-col items-start gap-2 md:flex">
                {navLinks.slice(6).map((link) => {
                  const isActive = link.route === pathname
                  return (
                    <li
                      key={link.route}
                      className={`flex justify-center items-center text-base font-semibold w-full whitespace-nowrap rounded-xl bg-cover transition-all hover:bg-accent-400 hover:shadow-inner group ${
                        isActive
                          ? 'bg-accent-400 text-dark-400'
                          : 'text-dark-700'
                      }`}
                    >
                      <Link
                        href={link.route}
                        className="text-base font-semibold flex items-center size-full gap-4 py-2 px-4 hover:brightness-0 hover:text-dark-400"
                      >
                        <Image
                          src={link.icon}
                          alt={link.label}
                          width={30}
                          height={30}
                          className={`${isActive && 'brightness-0'}`}
                        />
                        {link.label}
                      </Link>
                    </li>
                  )
                })}
                <div className="bg-dark-500 h-px w-full" />
                <li className="py-2">
                  <UserButton
                    showName
                    appearance={{
                      elements: {
                        userButtonBox: 'flex flex-row-reverse px-4',
                        avatarBox: 'w-8 h-8',
                        userButtonOuterIdentifier:
                          'text-base font-semibold text-dark-700',
                      },
                    }}
                  />
                </li>
              </ul>
            </div>
          </SignedIn>

          {/* When signed out */}
          <SignedOut>
            <Button
              asChild
              className="buttonpy-4 px-6 flex-center gap-3 rounded-full p-16-semibold focus-visible:ring-offset-0 focus-visible:ring-transparent bg-accent-400 bg-cover"
            >
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
