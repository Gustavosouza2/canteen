'use client'

import { useFormStatus, useFormState} from "react-dom" 
import { useCallback, useEffect } from 'react'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'

import { LoginSchema } from '@/app/(auth)/schema/login-schema'
import { loginAction } from '@/server-actions/server-login'
import { Button } from '@/components/features/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'
import {  useToast } from '@/hooks/ui/use-toast'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

const initialState = {
  error: "",
  success: false,
}

export function LoginForm() {
  const { pending: isPending } = useFormStatus()
  const [state, formAction] = useFormState(loginAction, initialState)

  const { toast } = useToast()

  const stateActionValidate =  useCallback((state: typeof initialState) => {  
    if (state?.error) {
      toast({
        title: 'O Login falhou!',
        description:
          'O Email ou a senha estão incorretos, tente novamente!',
        variant: 'default',
      })
    }
    if(state.success) {
      toast({
        title: 'Login realizado com sucesso!',
        description:
          'Você está sendo redirecionado para a dashboard!',
        variant: 'default',
      })
      redirect('/dashboard/home')
    }
  }, [state?.error, state?.success, toast])


  useEffect(() => {
    stateActionValidate(state as typeof initialState)
  }, [state?.error, state?.success, stateActionValidate])

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    shouldUnregister: true,
  })

  const {
    register,
    formState: { isValid },
  } = form

  return (
    <main className="relative bg-[#080808] h-screen w-screen flex items-center justify-between md:py-12 py-0 overflow-hidden">
      <div className="grid w-screen h-screen grid-cols-1 box-anim md:grid-cols-2 rounded-md">
        <div className="hidden md:flex inset-0">
          <style jsx>{`
            @keyframes electricFlow {
              0%,
              100% {
                opacity: 0.1;
              }
              50% {
                opacity: 0.3;
              }
            }

            .electric-grid {
              position: absolute;
              inset: 0;
              background-image: linear-gradient(
                  to right,
                  rgba(255, 255, 255, 0.2) 1px,
                  transparent 1px
                ),
                linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 0.2) 1px,
                  transparent 1px
                );
              background-size: 4rem 4rem;
              mask-image: radial-gradient(
                circle at center,
                black,
                transparent 80%
              );
              animation: electricFlow 2s infinite;
            }

            .electric-grid::before,
            .electric-grid::after {
              content: '';
              position: absolute;
              inset: 0;
              background-image: inherit;
              background-size: inherit;
              mask-image: inherit;
              animation: electricFlow 2s infinite;
            }

            .electric-grid::before {
              animation-delay: -0.5s;
            }

            .electric-grid::after {
              animation-delay: -1s;
            }
          `}</style>
          <div className="electric-grid"></div>
        </div>
        <Form {...form}>
          <form
            action={formAction}
            className="relative z-10  w-full space-y-6 bg-[#121113] flex flex-col items-center justify-center rounded md:p-16 p-11"
          >
            <div className="flex flex-col items-center md:items-start justify-center md:justify-items-start font-mono mb-10">
              <h1 className="md:text-4xl text-base tracking-widest font-sans font-semibold text-zinc-300 mb-2 flex items-center w-max animate-fade animate-once animate-duration-1000">
                BEM VINDO DE VOLTA
              </h1>
              <p className="text-md text-[#A1A1AA] font-mono font-extralight opacity-100 animate-fade animate-once animate-duration-1000 text-center">
                Veja o que esta acontecendo com o seu negócio!
              </p>
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="email"
                    className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                  >
                    Email:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="example@gmail.com"
                      register={register}
                      type="text"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="password"
                    className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                  >
                    Password:
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="*********"
                      register={register}
                      type="password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button disabled={!isValid} type="submit" isLoading={isPending}>
              {isPending ? 'ENTRANDO...' : 'ENTRAR'}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  )
}
