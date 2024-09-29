import Link from 'next/link'
import { Logo } from '@/components'

const MobileNav = () => {
  return (
    <header className="flex justify-between items-center fixed h-16 w-full border-b-4 border-green-400 bg-dark-400 p-5 lg:hidden">
      <Link href="/" className="flex items-center gap-2 md:py-2">
        <Logo variant="full" className="text" />
      </Link>
    </header>
  )
}

export default MobileNav
