'use client'

import Link from 'next/link'
import { Logo } from '@/components'
import { Button, Sheet, SheetContent, SheetTrigger } from '@/components/ui'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { navLinks } from '@/constants'
import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b border-dark-500 shadow-sm shadow-dark-500 bg-dark-400 p-5  lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Logo variant="full" className="h-7 w-fit" />
      </Link>

      <nav className="flex gap-2">
        {/* When signed in */}
        <SignedIn>
          <UserButton />

          <Sheet>
            <SheetTrigger>
              <Image
                src="/assets/icons/menu.svg"
                alt="menu"
                width={32}
                height={32}
              />
            </SheetTrigger>
            <SheetContent className="bg-dark-400 sm:w-64">
              <>
                <Logo variant="full" className="h-7 w-fit" />

                <ul className="mt-8 flex w-full flex-col items-start gap-5">
                  {navLinks.slice(0, 6).map((link) => {
                    const isActive = link.route === pathname
                    return (
                      <li
                        key={link.route}
                        className={`flex p-18 whitespace-nowrap w-full rounded-xl ${
                          isActive
                            ? 'bg-accent-400 text-dark-400'
                            : 'text-dark-800'
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
              </>
            </SheetContent>
          </Sheet>
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
    </header>
  )
}

export default MobileNav
