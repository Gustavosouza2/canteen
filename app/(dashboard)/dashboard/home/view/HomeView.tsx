'use client'

import { Card, type CardProps } from '@/components/features/Card'
import { Chart } from '@/components/features/Chart'
import { type User } from '@supabase/supabase-js'
import { type Customer } from '@/types/customer'

type HomeViewProps = {
  customers: { data: Customer[]; count: number }
  user: User | null
}

export default function HomeView({ user, customers }: HomeViewProps) {
  const userData = {
    email: user?.email,
    name: user?.email?.split('@')[0],
  }

  const totalAmount =
    customers?.data
      ?.map((customer: Customer) => customer?.amount)
      .reduce((acc: number, currAmount: number) => {
        return acc + currAmount
      }, 0) || 0

  const cardItems: CardProps[] = [
    {
      title: `Bem vindo de volta ${userData?.email?.slice(0, 7) || 'Admin'}!`,
      typeInfo: 'decrypted',
      type: 'string',
    },
    {
      info: customers?.data?.length.toString() ?? '0',
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
    <main className="flex flex-col gap-6 py-20 mt-40 px-10 items-center justify-center scrollbar-hide">
      <div className="w-full max-w-6xl">
        <div className="block md-mobile:hidden">
          <div className="mb-4">
            <Card data={[cardItems[0]]} isLoading={false} key={user?.id} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-1">
              <Card data={[cardItems[1]]} isLoading={false} key={user?.id} />
            </div>

            <div className="md:col-span-1">
              <Card data={[cardItems[2]]} isLoading={false} key={user?.id} />
            </div>
          </div>
        </div>

        <div className="hidden md-mobile:block">
          <div className="grid grid-cols-3 gap-4">
            <Card data={cardItems} isLoading={false} key={user?.id} />
          </div>
        </div>
      </div>

      <div className="w-full max-w-7xl">
        <Chart isLoading={false} data={customers?.data ?? []} />
      </div>
    </main>
  )
}
