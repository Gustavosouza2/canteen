import { Button as ButtonShad } from '@/components/ui/button'
import { Spinner } from '../spinner/Spinner'

type ButtonProps = {
  variant?: 'primary' | 'secondary'
  isLoading: boolean
  title: string
}
export const Button = ({ isLoading, title }: ButtonProps) => {
  return (
    <ButtonShad className="" variant="default">
      {isLoading ? <Spinner className="" /> : title}
    </ButtonShad>
  )
}
