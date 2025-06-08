import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { Input as InputShad } from '@/components/ui/input'
import CurrencyInput from 'react-currency-input-field'
import { useState } from 'react'

import {
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
  Select,
} from '@/components/ui/select'

import { AbstractInputsProps } from './types'
import { Button } from '../../ui/button'

export const Input = ({
  showPasswordTips,
  onValueChange,
  placeholder,
  register,
  options,
  onChange,
  type,
  ...props
}: AbstractInputsProps) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      <div className="relative ">
        {type === 'email' ||
          (type === 'text' && (
            <>
              <div className="flex items-center justify-center">
                <InputShad
                  className="h-10 rounded placeholder:text-[#A1A1AA] text-zinc-200 border border-transparent focus-visible:ring-0 focus:border-zinc-700 bg-zinc-900"
                  placeholder={placeholder}
                  onChange={onChange}
                  {...register}
                  type="text"
                  {...props}
                />
              </div>
            </>
          ))}

        {type === 'currency' && (
          <CurrencyInput
            className="h-10 rounded px-3 text-sm w-full 
          placeholder:text-[#A1A1AA] text-zinc-200
          bg-zinc-900
          border border-transparent
          focus:border-zinc-700 
          ring-0 focus:ring-0 focus:ring-offset-0
          focus-visible:ring-0 focus-visible:ring-offset-0 
          focus:outline-none focus-visible:outline-none"
            intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
            placeholder={placeholder}
            {...register('amount')}
            allowDecimals={true}
            decimalSeparator=","
            groupSeparator="."
            prefix="R$"
          />
        )}

        {type === 'select' && (
          <Select onValueChange={onValueChange}>
            <SelectTrigger
              className="w-full rounded h-10 text-zinc-200
              ring-0 focus:ring-0
        border border-transparent
        focus:border-zinc-700 focus-visible:ring-0 focus-visible:ring-offset-0 
        bg-zinc-900"
            >
              <SelectValue placeholder="Status" className="text-[#A1A1AA]" />
            </SelectTrigger>
            <SelectContent className="border-zinc-800 bg-zinc-900 text-zinc-200 rounded">
              {options?.map((option) => (
                <SelectItem
                  key={option.id}
                  value={option.value}
                  className="focus:bg-zinc-800 text-[#A1A1AA]"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}

        {type === 'password' && (
          <>
            <div className="flex items-center justify-center">
              <InputShad
                className="h-10 rounded placeholder:text-[#A1A1AA] text-zinc-200 border border-transparent focus-visible:ring-0 focus:border-zinc-700 bg-zinc-900"
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                onChange={onChange}
                {...props}
              />
              <Button
                className="absolute right-0 top--0  h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword((prev) => !prev)}
                variant="ghost"
                type="button"
                size="sm"
              >
                {showPassword ? (
                  <FaRegEye
                    className="h-4 w-4 text-zinc-300 opacity-40"
                    aria-hidden="true"
                  />
                ) : (
                  <FaRegEyeSlash
                    className="h-4 w-4 text-zinc-300 opacity-40"
                    aria-hidden="true"
                  />
                )}
                <span className="sr-only">
                  {showPassword ? 'Hide password' : 'Show password'}
                </span>
              </Button>
            </div>
            {showPasswordTips && (
              <div className="flex justify-center items-center mt-4">
                <p className="text-sm text-zinc-300 opacity-5">
                  * The password must be at least 8 characters long
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  )
}
