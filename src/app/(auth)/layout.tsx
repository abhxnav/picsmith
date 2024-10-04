import { Logo } from '@/components'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full h-screen bg-dark-400 text-dark-800">
      <div className="w-1/2 flex gap-2 md:gap-5 items-center justify-center pb-10 md:p-0">
        <div>
          <Logo variant="short" className="h-16 md:h-28 w-fit" />
        </div>
        <div className="flex flex-col gap-1">
          <Logo variant="text" className="h-10 md:h-20 w-fit" />
          <p className="font-semibold text-[8px] md:text-sm">
            CREATE MAGIC WITH A CLICK
          </p>
        </div>
      </div>
      <div className="w-px bg-dark-600 h-1/2 hidden md:block" />
      <div className="w-1/2 flex items-center justify-center">{children}</div>
    </main>
  )
}

export default Layout
