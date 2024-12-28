import { Spinner } from '@/components/features/spinner/Spinner'
import { Input } from '@/components/features/input/Input'
import { Button } from '@/components/ui/button'

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useLogin } from '../model/useLogin'

export const LoginView = (props: ReturnType<typeof useLogin>) => {
  const { register, isValid, form, isPending, onSubmit } = props

  return (
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
                  className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
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
                  className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
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
  )
}
