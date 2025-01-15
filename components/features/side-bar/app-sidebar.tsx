"use client";

import * as React from "react";

import {
  SidebarContent,
  SidebarFooter,
  SidebarRail,
  Sidebar,
} from "@/components/ui/sidebar";

import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

type SideBarProps = {
  navItems: {
    icon?: () => JSX.Element;
    isActive?: boolean;
    title: string;
    url: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];

  user: {
    name: string;
    email: string;
  };
};
export default function AppSidebar({ navItems, user }: SideBarProps) {
  return (
    <Sidebar collapsible="icon" className="w-52 bg-[#0F0F10]">
      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
