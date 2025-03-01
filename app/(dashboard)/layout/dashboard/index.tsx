'use client'

import { ReactNode } from 'react'

import { useMobile } from '@/hooks/custom/useCustomMobile'
import { HeaderDashboard } from './Header'
import { NavItems } from './NavItem'

export const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const isMobile = useMobile()

  return (
    <div className="w-full flex flex-col justify-start items-center h-full py-7 overflow-scroll md:overflow-visible">
      {isMobile && (
        <div className="w-full sticky top-0 z-10 mb-4">
          <HeaderDashboard />
        </div>
      )}
      <div className="w-screen">{children}</div>
      {isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-10">
          <NavItems />
        </div>
      )}
    </div>
  )
}
