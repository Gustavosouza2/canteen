'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import LoginImage from '../../../assets/images/Login image.png'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoginSchema } from '@/utils/login-schema'
// import { createSupabaseBrowser } from '@/lib/supabase/client'
// import { useTransition } from 'react'
import { z } from 'zod'
import { Input } from '@/components/Input/Input'

export default function LoginPage() {
  // const [isPending, startTransition] = useTransition()

  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: '', password: '' },
    shouldUnregister: true,
  })

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    // const supabase = createSupabaseBrowser()
    // if (!isPending) {
    //   startTransition(async () => {
    //     const { error } = await supabase.auth.signIn({
    //       email: data.email,
    //       password: data.password,
    //     })
    //     if (error) {
    //       alert('Failed to sign in')
    //     } else {
    //       alert('Logged in successfully')
    //     }
    //   })
    // }

    console.log(data.email)
  }
  return (
    <>
      <main className="bg-[#09090B] h-screen w-screen flex items-center justify-center p-10">
        <div className="grid w-full h-full  grid-cols-1  box-anim md:grid-cols-2 rounded-md ">
          <div className="relative hidden md:block rounded-md p-32">
            <Image
              className="object-cover "
              src={LoginImage}
              fill={true}
              alt="login"
            />
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6  bg-zinc-100 flex flex-col items-center justify-center w-full"
            >
              <div className="flex flex-col items-start justify-items-start">
                <h1 className="md:text-3xl text-lg font-bold text-zinc-700">
                  Login to your dashboard
                </h1>
                <p className="text-xs text-zinc-700 opacity-100">
                  See what is going on with your business
                </p>
              </div>
              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email" className="text-zinc-700">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-zinc-700"
                        placeholder="example@gmail.com"
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
                  <FormItem>
                    <FormLabel htmlFor="password" className="text--zinc-700">
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-8 text-zinc-700"
                        placeholder="*********"
                        type="password"
                        showPasswordTips={true}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button className="md:w-2/3 w-max">login</Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
