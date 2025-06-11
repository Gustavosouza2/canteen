'use client'

import { SidebarProvider } from '@/components/ui/sidebar'
import { Cookies } from 'react-cookie'
import { Toaster } from '@/components/ui/toaster'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { UserContextProvider } from '@/context/userContext'
import { CustomerIcon, HomeIcon, OrdersIcon } from '@/assets/icons'
import AppSidebar from '@/components/features/SideBar'
import '../styles/globals.css'
import { redirect, usePathname } from 'next/navigation'
import { ReactQueryClientProvider } from '@/services/query/QueryClientProvider'

const navigationItems = [
  {
    title: 'Home',
    url: '/dashboard/home',
    icon: HomeIcon,
  },
  {
    title: 'Clientes',
    url: '/dashboard/customers',
    icon: CustomerIcon,
  },
  {
    title: 'Pedidos',
    url: '/dashboard/orders',
    icon: OrdersIcon,
    isDisabled: true,
  },
  {
    title: 'Menu',
    url: '/dashboard/menu',
    icon: CustomerIcon,
  },
]

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = new Cookies()
  const pathname = usePathname()

  const user = cookieStore.get('user')
  const token = cookieStore.get('token')

  const handleLogout = async () => {
    cookieStore.remove('token')
    cookieStore.remove('user')
    redirect('/login')
  }

  return (
    <UserContextProvider token={token} user={user}>
       <ReactQueryClientProvider>
        <html
        lang="en"
        className={`${GeistSans.className} ${GeistMono.className}`}
      >
        <body className="bg-[#0F0F10] flex w-screen h-screen overflow-hidden">
          <Toaster />
          <SidebarProvider>
            {pathname !== '/login' && (
              <AppSidebar user={user} navItems={navigationItems} logout={handleLogout} />
            )}
            {children}
          </SidebarProvider>
        </body>
      </html>
      </ReactQueryClientProvider>
    </UserContextProvider>
  )
}
