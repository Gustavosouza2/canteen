'use client'

import { ContextMenuItemsProps } from '@/types/context-menu-items'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { VscKebabVertical } from 'react-icons/vsc'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export const ContextMenuItems = ({ items }: ContextMenuItemsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <VscKebabVertical className="w-5 h-5 flex items-center" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex items-center gap-3 flex-col bg-[#09090b] rounded">
        {items.map((item) => (
          <DropdownMenuItem
            key={item.label}
            onClick={item.onOpen}
            className="flex items-center gap-2 focus:outline-none hover:bg-zinc-900 w-full cursor-pointer"
          >
            <div className="w-5 h-5 flex items-center ml-3">{item.icon()}</div>
            <span className="text-sm font-mono font-medium text-zinc-300">
              {item.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
