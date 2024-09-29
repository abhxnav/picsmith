import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'

const fontRoboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto',
})

export const metadata: Metadata = {
  title: 'PicSmith',
  description: 'AI-powered image editor and generator',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider
      appearance={{ baseTheme: dark, variables: { colorPrimary: '#4ade80' } }}
      afterSignOutUrl="/"
    >
      <html lang="en">
        <body
          className={cn(
            'min-h-screen bg-dark-400 text-dark-800 font-sans antialiased',
            fontRoboto.variable
          )}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
