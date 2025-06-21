import { Chart } from '@/components/features/Chart'
import { Card, CardProps } from '@/components/features/Card'
import { getServerUser } from '@/server-actions/get-user'
import { useCustomersList } from '@/hooks/custom/useCustomers'
import { Customer } from '@/types/customer'

const PAGE_SIZE = 10

export const HomeView = async () => {
  const user = await getServerUser()

  const userData = {
    email: user?.email,
    name: user?.email?.split('@')[0],
  }
  const params = new URLSearchParams()

  params.set('page', '1')
  params.set('pageSize', PAGE_SIZE.toString())

  const page = Number(params.get('page'))
  const pageSize = Number(params.get('pageSize'))

  const customers = await useCustomersList(page, pageSize)
  console.log(customers.data)

  const totalAmount = customers?.data
    ?.map((customer: Customer) => customer?.amount)
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
      info: totalAmount.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      }),
      typeInfo: 'text',
      type: 'number',
    },
  ]

  return (
    <main className="grid flex-col gap-6 px-10 items-center justify-center scrollbar-hide">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data={cardItems} isLoading={false} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Chart isLoading={false} data={customers?.data ?? []} />
      </div>
    </main>
  )
}
