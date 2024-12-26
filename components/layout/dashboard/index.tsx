'use client'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { ReactNode, useState, useEffect } from 'react'

import { useMobile } from '@/hooks/use-custom-mobile'
import { NavItems } from './NavItem'
import { Sidebar } from './SideBar'

export const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)
  const isMobile = useMobile()

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div>
      {isMobile && (
        <>
          <NavItems />
        </>
      )}
      <SidebarProvider>
        <div>
          {!isMobile && (
            <>
              <Sidebar />

              <>
                <SidebarTrigger className="bg-transparent text-[#fafafa70] hover:bg-[#2b2b2c] hover:text-[#fafafa70]" />
                {children}
              </>
            </>
          )}
        </div>
      </SidebarProvider>
    </div>
  )
}
