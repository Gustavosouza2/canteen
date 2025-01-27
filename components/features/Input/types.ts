import { type InputProps } from '@/components/ui/input'
import { type UseFormRegister } from 'react-hook-form'

type InputProperty = InputProps & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
  type: 'email' | 'password' | 'select'
  showPasswordTips?: boolean
  placeholder: string
}

type SelectInputProps = {
  onValueChange?: (value: string) => void
  options?: Array<{
    label: string
    value: string
    id: number
  }>
}

type CurrencyInputProps = {
  prefix?: string
}

export type AbstractInputsProps = SelectInputProps &
  CurrencyInputProps &
  InputProperty
