'use client'

import { redirect, usePathname } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Cookies } from 'react-cookie'

import { CustomerIcon, HomeIcon, MenuIcon, OrdersIcon } from '@/assets/icons'
import { UserContextProvider } from '@/context/userContext'
import { SidebarProvider } from '@/components/ui/sidebar'
import AppSidebar from '@/components/features/SideBar'
import { Toaster } from '@/components/ui/toaster'

import '../styles/globals.css'

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
    icon: MenuIcon,
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
      <html
        lang="en"
        className={`${GeistSans.className} ${GeistMono.className}`}
      >
        <body className="bg-[#0F0F10] flex w-screen h-screen overflow-hidden">
          <Toaster />
          <SidebarProvider>
            {pathname !== '/login' && (
              <AppSidebar
                user={user}
                navItems={navigationItems}
                logout={handleLogout}
              />
            )}
            {children}
          </SidebarProvider>
        </body>
      </html>
    </UserContextProvider>
  )
}
