import { ChevronDown } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '../../ui/button'

interface UserMenuProps {
  name: string | null
  email: string | null
}
export const UserMenu = ({ email, name }: UserMenuProps) => {
  return (
    <Popover>
      <PopoverTrigger
        asChild
        className="md:mr-16 bg-transparent border-1 border-[#a1a1aa28] hover:bg-[#1E1E20] hover:text-[#373738]"
      >
        <Button variant="outline" size="icon">
          <ChevronDown className="text-[#fafafaaf] hover:bg-[#1E1E20] hover:text-[#373738]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex border-[#fafafa70] bg-[#1E1E20] mr-10 mt-2">
        <div className=" flex-col gap-2 justify-end items-center">
          <div className="flex flex-row gap-2">
            <p className="text-[#fafafaaf] text-sm font-mono font-semibold">
              Name:
            </p>
            <p className="text-[#fafafaaf] text-sm font-mono font-light">
              {name}
            </p>
          </div>

          <div className="flex flex-row gap-2">
            <p className="text-[#fafafaaf] text-sm font-mono font-semibold">
              Email:
            </p>
            <p className="text-[#fafafaaf] text-sm font-mono font-light">
              {email}
            </p>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
