'use client'

import { useUserContext } from '../../../../context/userContext'
import { Chart } from '@/components/features/chart/Chart'
import { Card } from '@/components/features/card/Card'
import useUsersQuery from '@/hooks/custom/use-users'

export default function Home() {
  const { email } = useUserContext()

  const { data: customers } = useUsersQuery()

  const cardItems = [
    {
      info: `Bem vindo de volta ${email?.slice(0, 7) || 'Admin'}!`,
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

  return (
    <main className="flex flex-col gap-6 p-6 md:-ml-72 ml-9 md:mt-3 mx-14 items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data={cardItems} />
      </div>

      <div className="w-full">
        <Chart />
      </div>
    </main>
  )
}
