"use client";

import { CollapsibleTrigger, Collapsible } from "@/components/ui/collapsible";
import {
  SidebarMenuButton,
  SidebarGroupLabel,
  SidebarMenuItem,
  SidebarGroup,
  SidebarMenu,
} from "@/components/ui/sidebar";

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
      <SidebarGroupLabel className="text-md"></SidebarGroupLabel>
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
                  {item.icon && <item.icon />}
                  <a href={item.url}>
                    <span>{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
