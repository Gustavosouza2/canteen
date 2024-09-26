'use client'

// import { createSupabaseBrowser } from '@/lib/supabase/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
// import { useTransition } from 'react'
import Image from 'next/image'
import { z } from 'zod'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

import LoginImage from '../../../assets/images/LoginImg.jpg'
import { LoginSchema } from '@/utils/login-schema'
import { Input } from '@/components/Input/Input'
import { Button } from '@/components/ui/button'

export default function LoginPage() {
  // const [isPending, startTransition] = useTransition()

  const form = useForm({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(LoginSchema),
    shouldUnregister: true,
  })

  const {
    formState: { isValid },
  } = form

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
      <main className=" bg-[#121214] h-screen w-screen flex items-center justify-center p-5">
        <div className="grid w-full h-full  grid-cols-1  box-anim md:grid-cols-2 rounded-md ">
          <div className="relative hidden md:block rounded-md p-32">
            <Image
              className="rounded-lg w-full h-full object-cover "
              src={LoginImage}
              quality={100}
              fill={true}
              alt="login"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121214] to-transparent opacity-85 rounded-s-md"></div>
            <h1 className="absolute text-zinc-800 text-6xl font-bold top-56 left-40 tracking-wider">
              DashTrack
            </h1>

            <p className="absolute text-zinc-800 text-1xl font-normal bottom-24 left-16 ">
              Your real-time control technology that transforms data into
              insights!
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6  bg-[#121214] flex flex-col items-center justify-center w-full rounded-e-md md:p-32 p-11"
            >
              <div className="flex flex-col items-start justify-items-start">
                <h1 className="md:text-4xl text-xl font-semibold text-zinc-300 mb-2 flex items-center">
                  Login to your
                  <p className="bg-gradient-to-r from-[#434343] to-[#5d5d5f] bg-clip-text text-transparent md:text-4xl text-xl ml-2">
                    Dashboard
                  </p>
                </h1>
                <p className="text-md text-zinc-300 font-extralight opacity-100 ">
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
                      className="text-zinc-300 font-normal tracking-wider"
                    >
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 text-zinc-300 border border-transparent focus:border-zinc-600 focus:outline-none bg-zinc-900"
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
                  <FormItem className="w-full">
                    <FormLabel
                      htmlFor="password"
                      className="text-zinc-300 font-normal tracking-wider"
                    >
                      Password
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 text-zinc-300 border border-transparent focus:border-zinc-600 focus:outline-none bg-zinc-900"
                        placeholder="*********"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
              <Button
                className="md:w-2/3 w-50 bg-gradient-to-r from-[#434343] to-[#1d1d20] hover:bg-gray-900"
                disabled={!isValid}
              >
                Sign In
              </Button>
            </form>
          </Form>
        </div>
      </main>
    </>
  )
}
