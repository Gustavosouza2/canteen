'use client'

import { DataTable } from '@/components/features/table'
import useUsersQuery from '@/hooks/custom/use-users'

export default function Customers() {
  const { data: customers, isLoading } = useUsersQuery()
  console.log(customers)

  const columns = [
    { name: 'name', label: 'Nome:', size: '40' },
    { name: 'email', label: 'Email:', size: '40' },
    { name: 'status', label: 'Status:', size: '20' },
    { name: 'amount', label: 'Amount:', size: '20' },
  ]

  return (
    <div className="flex h-full w-full md:-ml-44 items-center justify-center">
      <DataTable
        data={customers as any}
        isLoading={isLoading}
        columns={columns}
        title="Customers"
      />
    </div>
  )
}
