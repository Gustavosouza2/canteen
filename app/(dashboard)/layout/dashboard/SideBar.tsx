import * as React from 'react'
import {
  Sidebar as SideBarShad,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from '@/components/ui/sidebar'

import { CustomerIcon, HomeIcon } from '@/components/icons'

interface NavItem {
  disabled?: boolean
  external?: boolean
  title: string
  href?: string
  icon: () => JSX.Element
}

const items: NavItem[] = [
  {
    title: 'Home',
    href: '/dashboard/home',
    icon: HomeIcon,
  },
  {
    title: 'Customers',
    href: '/dashboard/customers',
    icon: CustomerIcon,
  },
]

export const Sidebar = () => {
  return (
    <SideBarShad className="border-[#a1a1aa28] bg-[#1E1E20] w-36">
      <SidebarContent className="bg-[#1E1E20]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#fafafaaf] hover:bg-[#1E1E20] hover:text-[#373738] bg-transparent"
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span className="font-mono font-semibold ">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </SideBarShad>
  )
}
