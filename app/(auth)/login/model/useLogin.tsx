import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/ui/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { z } from 'zod'

import { LoginSchema } from '@/utils/login-schema'

export const useLogin = () => {
  const [isPending, startTransition] = useTransition()

  const supabase = createClientComponentClient()
  const { toast } = useToast()
  const router = useRouter()

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
        const { error, data: loginData } =
          await supabase.auth.signInWithPassword({
            email: data.email,
            password: data.password,
          })
        const token = loginData.session?.access_token

        if (token) {
          router.push('/dashboard/home')
        }
        if (error) {
          toast({
            title: 'Login Failed',
            description:
              'The email or password you entered is incorrect. Please check your credentials and try again',
            variant: 'default',
          })
        } else {
          router.push('/dashboard/home')
        }
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
