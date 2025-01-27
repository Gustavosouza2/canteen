import { Button as ButtonShad } from '@/components/ui/button'

import { Spinner } from '@/assets/icons/SpinnerIcon'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading: boolean
  children: ReactNode
}
export const Button = ({ isLoading, children, ...props }: ButtonProps) => {
  return (
    <ButtonShad
      className="w-full rounded bg h-10 bg-[#212121] text-[#FFFFFF] font-sans font-medium hover:bg-neutral-900 hover:text-slate-300"
      {...props}
    >
      {isLoading ? <Spinner className="" /> : children}
    </ButtonShad>
  )
}
