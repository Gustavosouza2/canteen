import { IoMdAdd } from 'react-icons/io'
import { Button } from '../Button'
import { useMobile } from '@/hooks/custom/useCustomMobile'

type ButtonAddItemMenuProps = {
  onClick: () => void
}

export const ButtonAddItemMenu = ({ onClick }: ButtonAddItemMenuProps) => {
  const isMobile = useMobile()

  const size = isMobile ? 'w-[200px] h-[200px]' : 'w-[260px] h-[260px]'

  return (
    <div className={`${size} rounded-md flex items-center justify-center`}>
      <Button
        className="rounded-xl bg-primary/10 border-[#FFFA]/10 border hover:bg-primary/10"
        onClick={onClick}
      >
        <div className="flex items-center justify-center text-7xl">
          <IoMdAdd className="text-white" size={isMobile ? 40 : 80} />
        </div>
      </Button>
    </div>
  )
}
