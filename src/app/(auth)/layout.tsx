import { Logo } from '@/components'
import { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <main className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full h-screen bg-dark-400 text-dark-800">
      <div className="w-full md:w-1/2 flex gap-2 md:gap-5 items-center justify-center pb-10 md:p-0">
        <Logo variant="tag" className="h-20 md:h-40 w-fit md:px-8" />
        {/* <div className="flex items-center gap-4">
          <Logo variant="short" className="h-16 md:h-fit w-fit" />
          <div className="flex flex-col">
            <p className="font-dancing text-accent-400 text-2xl md:text-[110px] leading-none">
              PicSmith
            </p>
            <p className="font-baloo text-dark-800 text-md md:text-3xl leading-none">
              Create Magic With A Click
            </p>
          </div>
        </div> */}
      </div>
      <div className="w-px bg-dark-600 h-1/2 hidden md:block" />
      <div className="w-full md:w-1/2 flex items-center justify-center">
        {children}
      </div>
    </main>
  )
}

export default Layout
