import { useState } from 'react'
import { Input as InputShad } from '@/components/ui/input'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'

type InputProps = {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  type: 'email' | 'text' | 'password'
  showPasswordTips?: boolean
  placeholder: string
}

export const Input = ({
  showPasswordTips,
  placeholder,
  type,
  onChange,
}: InputProps) => {
  const [showPasswordState, setShowPasswordState] = useState<boolean>(false)

  return (
    <>
      <InputShad placeholder={placeholder} type={type} onChange={onChange}>
        <div onClick={() => setShowPasswordState(!showPasswordState)}>
          {showPasswordState ? (
            <FaRegEye className=" group-hover:scale-105 transition-all" />
          ) : (
            <FaRegEyeSlash className=" group-hover:scale-105 transition-all" />
          )}
        </div>
      </InputShad>
      {showPasswordTips && (
        <div className="flex justify-center items-center">
          <p className="text-sm text-zinc-300 opacity-5">
            * The password must be at least 8 characters long
          </p>
        </div>
      )}
    </>
  )
}
