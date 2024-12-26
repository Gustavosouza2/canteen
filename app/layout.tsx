import { Toaster } from '@/components/ui/toaster'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata } from 'next'

import { UserContextProvider } from '@/context/userContext'
import './globals.css'

export const metadata: Metadata = {
  title: {
    template: '%s | DashTrack',
    default: 'DashTrack',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <UserContextProvider>
      <html lang="en">
        <body
          className={`${GeistSans.className} ${GeistMono.className} bg-[#121214]`}
        >
          <Toaster />
          {children}
        </body>
      </html>
    </UserContextProvider>
  )
}
