import * as React from 'react'
import {
  Sidebar as SideBarShad,
  SidebarGroupContent,
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
} from '@/components/ui/sidebar'

import { CustomerIcon, HomeIcon } from '@/assets/icons'

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
    href: '/home',
    icon: HomeIcon,
  },
  {
    title: 'Customers',
    href: '/home',
    icon: CustomerIcon,
  },
]

export const Sidebar = () => {
  return (
    <SideBarShad className="border-[#a1a1aa28] bg-[#1E1E20]">
      <SidebarContent className="bg-[#1E1E20]">
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className="text-[#fafafa70] hover:bg-[#1E1E20] hover:text-[#373738] bg-transparent"
                  >
                    <a href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
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
