import { CardProps } from '@/components/features/Card'
import { useUserContext } from '@/context/userContext'
import { useCustomersList } from '@/hooks/custom/useCustomers'

const PAGE_SIZE = 10

export const useHome = () => {
  const { userData } = useUserContext()

  const { data: customers, isLoading } = useCustomersList(1, PAGE_SIZE)

  const totalAmount = customers?.data
    ?.map((customer) => customer?.amount)
    .reduce((acc: number, currAmount: number) => {
      return acc + currAmount
    }, 0)

  const cardItems: CardProps[] = [
    {
      title: `Bem vindo de volta ${userData?.email?.slice(0, 7) || 'Admin'}!`,
      typeInfo: 'decrypted',
      type: 'string',
    },
    {
      info: customers?.data?.length.toString() ?? '',
      description: 'Total de clientes adicionados',
      title: 'Clientes',
      typeInfo: 'text',
      type: 'number',
    },
    {
      description: 'Número total de vendas realizadas',
      title: 'Valor total de vendas',
      info:
        totalAmount
          ?.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })
          .slice(3, 6) ?? '',
      typeInfo: 'text',
      type: 'number',
    },
  ]

  return {
    cardItems,
    customers,
    isLoading,
  }
}
