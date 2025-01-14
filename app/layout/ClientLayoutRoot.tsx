'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { Cookies, CookiesProvider } from 'react-cookie'
import { Toaster } from '@/components/ui/toaster'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import { ReactQueryClientProvider } from '@/services/query/QueryClientProvider'
import { UserContextProvider } from '@/context/userContext'
import '../styles/globals.css'

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = new Cookies()
  const user = cookies.get('user')
  const token = cookies.get('token')

  return (
    <CookiesProvider>
      <UserContextProvider token={token} user={user}>
        <ReactQueryClientProvider>
          <html lang="en">
            <body
              className={`${GeistSans.className} ${GeistMono.className} bg-[#0F0F10]`}
            >
              <Toaster />
              <SidebarProvider>{children}</SidebarProvider>
            </body>
          </html>
        </ReactQueryClientProvider>
      </UserContextProvider>
    </CookiesProvider>
  )
}
