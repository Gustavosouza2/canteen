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

import { CreateCustomerSchema } from '../../create-customer/schema'
import { useUserContext } from '@/context/userContext'
import { Button } from '@/components/features/Button'
import { Input } from '@/components/features/Input'
import { Customer } from '@/types/customer'
import { StepKey } from '..'

type EditCustomerFormProps = {
  setCurrentStep: Dispatch<SetStateAction<StepKey>>
  customer: Customer
}

type InputsProps = Array<{
  type: 'email' | 'password' | 'select' | 'currency'
  name: 'amount' | 'status'
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

export const EditCustomerForm = ({
  setCurrentStep,
  customer,
}: EditCustomerFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { token } = useUserContext()

  const { toast } = useToast()

  const form = useForm({
    defaultValues: { amount: '', status: '' },
    resolver: zodResolver(CreateCustomerSchema),
    shouldUnregister: true,
  })

  const selectOptions = [
    { label: 'Pagar Depois', value: 'pending', id: 1 },
    { label: 'Pago', value: 'done', id: 2 },
  ]

  const onSubmit = async () => {
    setIsLoading(true)

    const formData = new FormData()
    formData.append('amount', form.getValues('amount').toString().slice(3))
    formData.append('status', form.getValues('status'))
    formData.append('id', customer?.id.toString() ?? '')

    await axios
      .patch('/api/dashboard/customer', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
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
          description:
            'Erro ao editar os dados do cliente, por favor, tente novamente!',
          variant: 'destructive',
        })
      })
      .finally(() => setIsLoading(false))
  }

  const inputs: InputsProps = [
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
      <form>
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

        <div className="mt-44 flex-wrap flex">
          <Button type="submit" onClick={onSubmit} isLoading={isLoading}>
            {isLoading ? 'ENVIANDO...' : 'ENVIAR'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
