import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { UseFormRegister } from 'react-hook-form'
import { useState } from 'react'

import { Input as InputShad, type InputProps } from '@/components/ui/input'
import { Button } from '../../ui/button'

type InputProperty = InputProps & {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  register: UseFormRegister<any>
  type: 'email' | 'password'
  showPasswordTips?: boolean
  placeholder: string
}

export const Input = ({
  showPasswordTips,
  placeholder,
  className,
  register,
  onChange,
  type,
  ...props
}: InputProperty) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <>
      <div className="relative ">
        {type === 'email' && (
          <>
            <div className="flex items-center justify-center">
              <InputShad
                placeholder={placeholder}
                className={className}
                onChange={onChange}
                {...register}
                type="text"
                {...props}
              />
            </div>
          </>
        )}

        {type === 'password' && (
          <>
            <div className="flex items-center justify-center">
              <InputShad
                type={showPassword ? 'text' : 'password'}
                placeholder={placeholder}
                className={className}
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
