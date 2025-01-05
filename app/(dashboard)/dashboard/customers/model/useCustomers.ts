import useUsersQuery from '@/hooks/custom/use-users'

export const useCustomers = () => {
  const { data: customers, isLoading } = useUsersQuery()

  const columns = [
    { name: 'name', label: 'Nome:', size: '30' },
    { name: 'email', label: 'Email:', size: '30' },
    { name: 'status', label: 'Status:', size: '40' },
    { name: 'amount', label: 'Valor:', size: '20' },
  ]

  return {
    customers,
    isLoading,
    columns,
  }
}
