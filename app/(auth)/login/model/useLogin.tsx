import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/ui/use-toast'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { z } from 'zod'

import { useUserContext } from '@/context/userContext'
import { LoginSchema } from '@/utils/login-schema'
import { Cookies } from 'react-cookie'

export const useLogin = () => {
  const [isPending, startTransition] = useTransition()
  const cookies = new Cookies()

  const { handleLogin } = useUserContext()

  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    shouldUnregister: true,
  })

  const {
    register,
    formState: { isValid },
  } = form

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    if (!isPending) {
      startTransition(async () => {
        await supabase.auth
          .signInWithPassword({
            email: data.email,
            password: data.password,
          })
          .then((res) => {
            handleLogin(res.data as any)
            cookies.set('userData', {
              userName: res.data?.user?.phone,
              email: res.data?.user?.email,
              id: res.data?.user?.id,
              token: res.data?.session?.access_token,
            })
          })
          .catch(() => {
            toast({
              title: 'Login Failed!',
              description:
                'The email or password you entered is incorrect. Please check your credentials and try again',
              variant: 'default',
            })
          })
      })
    }
  }

  return {
    form,
    register,
    isValid,
    onSubmit,
    isPending,
  }
}
