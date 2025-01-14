'use client'

import { SidebarInset } from '@/components/ui/sidebar'
import { ReactNode, useEffect, useState } from 'react'

import { useMobile } from '@/hooks/custom/use-custom-mobile'
import { NavItems } from './NavItem'
import AppSidebar from '@/components/features/side-bar/app-sidebar'

export const DashBoardLayout = ({ children }: { children: ReactNode }) => {
  const [sideBarOpen, setSideBarOpen] = useState<boolean>()
  const onToggleSideBar = () => setSideBarOpen((state) => !state)
  const isMobile = useMobile()

  useEffect(() => {
    console.log(sideBarOpen)
  }, [sideBarOpen])

  // TODO: MUDAR ESTILOS
  return (
    <div className="flex h-screen w-full">
      {isMobile ? <NavItems /> : <AppSidebar />}
      <div className={` ${sideBarOpen ? '-ml-14' : 'ml-1'}  `}>{children}</div>
    </div>
  )
}
