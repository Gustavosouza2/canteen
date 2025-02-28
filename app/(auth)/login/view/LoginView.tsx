import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

import { Button } from '@/components/features/Button'
import { Input } from '@/components/features/Input'
import type { useLogin } from '../model/useLogin'

export const LoginView = (props: ReturnType<typeof useLogin>) => {
  const { register, isValid, form, isPending, onSubmit } = props

  return (
    <main className="relative bg-[#080808] h-screen w-screen flex items-center justify-center p-5 overflow-hidden">
      <div className="absolute inset-0">
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
          onSubmit={form.handleSubmit(onSubmit)}
          className="relative z-10 space-y-6 bg-transparent backdrop-blur-sm flex flex-col items-center justify-center rounded-lg md:p-16 p-11"
        >
          <div className="flex flex-col items-start justify-items-start justify-between font-mono mb-10">
            <h1 className="md:text-4xl text-xl tracking-widest font-mono font-semibold text-zinc-300 mb-2 flex items-center w-max animate-fade animate-once animate-duration-1000">
              BEM VINDO DE VOLTA
            </h1>
            <p className="text-md text-[#A1A1AA] font-mono font-extralight opacity-100 animate-fade animate-once animate-duration-1000 text-center">
              Veja o que esta acontecendo com o seu negócio
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
            {isPending ? 'ENTRANDO' : 'ENTRAR'}
          </Button>
        </form>
      </Form>
    </main>
  )
}
