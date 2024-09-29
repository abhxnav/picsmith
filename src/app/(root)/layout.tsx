import { ReactNode } from 'react'
import { MobileNav, Sidebar } from '@/components'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex min-h-screen w-full flex-col bg-dark-400 lg:flex-row">
      <Sidebar />
      <MobileNav />

      <div className="mt-16 flex-1 overflow-auto py-8 lg:mt-0 lg:max-h-screen lg:py-10">
        <div className="max-w-5xl mx-auto px-5 md:px-10 w-full text-dark-800 font-semibold text-base">
          {children}
        </div>
      </div>
    </main>
  )
}

export default Layout
