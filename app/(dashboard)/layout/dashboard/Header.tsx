import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { UserMenu } from '@/components/features/user-menu/UserMenu'

import { useUser } from '@/context/userContext'

export const HeaderDashboard = () => {
  const { email } = useUser()

  const rawUserName = email?.slice(0, 7)

  return (
    <header className="fixed top-0 left-0 right-0 z-10 flex justify-end items-center h-16 px-4 bg-[#1E1E20] border-b-2 border-[#a1a1aa28]">
      <div className="flex flex-row gap-2">
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            height={15}
            width={15}
          />
          <AvatarFallback>GS</AvatarFallback>
        </Avatar>
        <UserMenu
          name={rawUserName || 'Admin'}
          email={email || 'Admin@gmail.com'}
        />
      </div>
    </header>
  )
}
