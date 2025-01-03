import { useUserContext } from '@/context/userContext'
import useUsersQuery from '@/hooks/custom/use-users'

export const useHome = () => {
  const { userData } = useUserContext()

  const { data: customers, isLoading } = useUsersQuery()

  const cardItems = [
    {
      info: `Bem vindo de volta ${userData?.email?.slice(0, 7) || 'Admin'}!`,
    },
    {
      title: 'Clientes',
      info: customers?.length.toString(),
      description: 'Total de clientes adicionados',
    },
    {
      title: 'Valor total de vendas',
      info: `R$${10}`,
      description: 'Numero total de vendas realizadas',
    },
  ]

  return {
    cardItems,
    isLoading,
  }
}
