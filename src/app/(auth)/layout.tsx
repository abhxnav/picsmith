import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex justify-center items-center min-h-screen w-full bg-dark-400 text-dark-800">
      {children}
    </main>
  )
}

export default Layout
