"use client";

import { CollapsibleTrigger, Collapsible } from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    icon?: () => JSX.Element;
    isActive?: boolean;
    title: string;
    url: string;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-md mb-10 mt-5">Kuro</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible text-md"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton>
                  <Link href={item.url}>
                    <div className="flex justify-between items-center gap-2">
                      {item.icon && <item.icon />}
                      <span className="text-md font-mono text-zinc-300">
                        {item.title}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
