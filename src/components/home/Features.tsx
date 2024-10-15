import { navLinks } from '@/constants'
import Image from 'next/image'
import Link from 'next/link'

const Features = () => {
  return (
    <ul className="sm:flex hidden items-center w-full gap-4">
      {navLinks.slice(1, 5).map((link) => (
        <Link
          key={link.route}
          href={link.route}
          className="flex flex-1 items-center justify-center flex-col gap-2 accent-gradient-ud p-4 rounded-xl"
        >
          <li className="flex items-center justify-center w-fit rounded-full bg-dark-400 p-4">
            <Image src={link.icon} alt={link.label} width={24} height={24} />
          </li>
          <p className="text-sm font-semibold text-center text-dark-400">
            {link.label}
          </p>
        </Link>
      ))}
    </ul>
  )
}

export default Features
