import { SetStateAction, Dispatch, useState } from 'react'
import { UseFormRegister, useForm } from 'react-hook-form'
import { useQueryClient } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useToast } from '@/hooks/ui/use-toast'
import {
  FormControl,
  FormMessage,
  FormField,
  FormLabel,
  FormItem,
  Form,
} from '@/components/ui/form'
import axios from 'axios'

import { Button } from '@/components/features/Button'
import { Input } from '@/components/features/Input'
import { CreateCustomerSchema } from '../schema'
import { StepKey } from '..'

type CreateCustomerFormProps = {
  setCurrentStep: Dispatch<SetStateAction<StepKey>>
}

type InputsProps = Array<{
  type: 'email' | 'password' | 'select' | 'currency'
  name: 'email' | 'name' | 'amount' | 'status'
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
  const queryClient = useQueryClient()

  const { toast } = useToast()

  const form = useForm({
    defaultValues: { email: '', name: '', amount: '', status: '' },
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

  const onSubmit = async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('amount', form.getValues('amount').toString().slice(3))
    formData.append('created_at', new Date().toString())
    formData.append('status', form.getValues('status'))
    formData.append('email', form.getValues('email'))
    formData.append('name', form.getValues('name'))

    await axios
      .post('/api/dashboard/customer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(async (response) => {
        setCurrentStep(1)
        await queryClient.invalidateQueries({ queryKey: ['User'] })
        return response.data
      })
      .catch(() => {
        toast({
          title: 'Algo deu errado!',
          description: 'Erro ao criar um cliente, por favor, tente novamente!',
          variant: 'destructive',
        })
      })
      .finally(() => setIsLoading(false))
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
      type: 'currency',
      label: 'Valor:',
      name: 'amount',
      id: 4,
    },
  ]

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
                    onChangeCurrency={field.onChange}
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

        <div className="mt-16 flex-wrap flex">
          <Button
            type="submit"
            isLoading={isLoading}
            disabled={!isValid || !watch('status') || !watch('amount')}
          >
            {isLoading ? 'ENVIANDO...' : 'ENVIAR'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
