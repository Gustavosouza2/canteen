'use client'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Cookies, CookiesProvider } from 'react-cookie'
import { Toaster } from '@/components/ui/toaster'
import { usePathname } from 'next/navigation'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'

import { ReactQueryClientProvider } from '@/services/query/QueryClientProvider'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { UserContextProvider, useUserContext } from '@/context/userContext'
import { CustomerIcon, HomeIcon, OrdersIcon } from '@/assets/icons'
import { useMobile } from '@/hooks/custom/useCustomMobile'
import AppSidebar from '@/components/features/SideBar'
import '../styles/globals.css'

export default function ClientLayoutRoot({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = createClientComponentClient()
  const { handleLogout } = useUserContext()

  const isMobile = useMobile()
  const cookies = new Cookies()
  const pathname = usePathname()
  const user = cookies.get('user')
  const token = cookies.get('token')

  const onLogout = async () => {
    await supabase.auth.signOut().then(() => handleLogout())
  }

  const items = [
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
  ]

  return (
    <CookiesProvider>
      <UserContextProvider token={token} user={user}>
        <ReactQueryClientProvider>
          <html
            lang="en"
            className={`${GeistSans.className} ${GeistMono.className}`}
          >
            <body className=" bg-[#0F0F10] flex w-screen h-screen overflow-hidden">
              <Toaster />

              <SidebarProvider>
                {pathname !== '/login' && (
                  <>
                    <AppSidebar
                      logout={onLogout}
                      navItems={items}
                      user={user}
                    />
                    {isMobile ? null : (
                      <SidebarTrigger className="mt-5 rounded ml-5 w-5 h-5" />
                    )}
                  </>
                )}
                <div className="flex-1">{children}</div>
              </SidebarProvider>
            </body>
          </html>
        </ReactQueryClientProvider>
      </UserContextProvider>
    </CookiesProvider>
  )
}
