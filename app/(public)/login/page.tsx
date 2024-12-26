'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { z } from 'zod'

import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'
import { Spinner } from '@/components/Spinner/Spinner'
import { LoginSchema } from '@/utils/login-schema'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
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

  return (
    <>
      <main className=" bg-[#121214] h-screen w-screen flex items-center justify-center p-5">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6  bg-[#121214] flex flex-col items-center justify-center max-w-max rounded-e-md md:p-16 p-11"
          >
            <div className="flex flex-col items-start justify-items-start justify-between font-mono">
              <h1 className="md:text-4xl text-xl  font-semibold text-zinc-300 mb-2 flex items-center w-max animate-fade animate-once animate-duration-1000">
                Login to your
                <p className="bg-gradient-to-r from-[#BD3F32] to-[#DA4453] bg-clip-text text-transparent md:text-5xl text-2xl ml-2 animate-fade animate-once animate-duration-1000">
                  Dashboard
                </p>
              </h1>
              <p className="text-md text-[#A1A1AA] font-mono font-extralight opacity-100 animate-fade animate-once animate-duration-1000 text-center">
                See what is going on with your business
              </p>
            </div>
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel
                    htmlFor="email"
                    className="text-[#A1A1AA] font-normal tracking-wider font-sans"
                  >
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 text-[#A1A1AA] border border-transparent focus:border-zinc-600 focus:outline-none bg-zinc-900"
                      placeholder="example@gmail.com"
                      register={register}
                      type="email"
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
                    className="text-[#A1A1AA] font-normal tracking-wider font-sans"
                  >
                    Password
                  </FormLabel>
                  <FormControl>
                    <Input
                      className="h-10 text-[#A1A1AA] border border-transparent focus:border-zinc-600 focus:outline-none bg-zinc-900"
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
            <Button
              className="w-full h-11 bg-gradient-to-r from-[#BD3F32] to-[#DA4453] hover:from-[#ac323e] hover:to-[#993429] text-white font-semibold rounded-md"
              disabled={!isValid}
              type="submit"
            >
              {isPending ? <Spinner className="" /> : 'Sign In'}
            </Button>
          </form>
        </Form>
      </main>
    </>
  )
}
