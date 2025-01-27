import { SetStateAction, Dispatch, useEffect, useState } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'

import { Button } from '@/components/features/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/features/Input'
import { CreateCustomerSchema } from '../schema'
import { StepKey } from '..'

type CreateCustomerFormProps = {
  setCurrentStep: Dispatch<SetStateAction<StepKey>>
}

type InputsProps = Array<{
  name: 'email' | 'name' | 'amount' | 'status'
  type: 'email' | 'password' | 'select'
  options?: Array<{
    label: string
    value: string
    id: number
  }>
  register: UseFormRegister<any>
  placeholder: string
  label: string
  id: number
}>

export const CreateCustomerForm = ({
  setCurrentStep,
}: CreateCustomerFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const form = useForm({
    defaultValues: { email: '', name: '', amount: 0, status: '' },
    resolver: zodResolver(CreateCustomerSchema),
    shouldUnregister: true,
  })

  const selectOptions = [
    { label: 'Pagar Depois', value: 'pending', id: 1 },
    { label: 'Pago', value: 'done', id: 2 },
  ]

  const {
    watch,
    formState: { isValid },
  } = form

  const onSubmit = () => {
    setIsLoading(true)
    setCurrentStep(1)
  }

  const inputs: InputsProps = [
    {
      placeholder: 'Nome do cliente',
      register: form.register,
      label: 'Nome:',
      type: 'email',
      name: 'name',
      id: 2,
    },
    {
      placeholder: 'example@gmail.com',
      register: form.register,
      label: 'Email:',
      name: 'email',
      type: 'email',
      id: 1,
    },
    {
      placeholder: 'Status da compra:',
      options: selectOptions,
      register: form.register,
      label: 'Status:',
      name: 'status',
      type: 'select',
      id: 3,
    },
    {
      placeholder: 'Valor da compra',
      register: form.register,
      label: 'Valor:',
      name: 'amount',
      type: 'email',
      id: 4,
    },
  ]

  useEffect(() => {
    const subscription = watch((value) => console.log(value))
    return () => subscription.unsubscribe()
  }, [form, watch])

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {inputs.map((input) => (
          <FormField
            key={input.id}
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full gap-1 mt-2">
                <FormLabel
                  className="text-[#A1A1AA] font-sans tracking-wider font-semibold"
                  htmlFor={input.name}
                >
                  {input.label}
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder={input.placeholder}
                    onValueChange={field.onChange}
                    register={input.register}
                    options={input.options}
                    type={input.type}
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <div className="mt-10 flex-wrap flex">
          <Button type="submit" isLoading={isLoading} disabled={!isValid}>
            Enviar
          </Button>
        </div>
      </form>
    </Form>
  )
}
