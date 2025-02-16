import useUsersQuery from '@/hooks/custom/useUsers'
import { type Customer } from '@/types/customer'

import { useEffect, useState } from 'react'

const PAGE_SIZE = 10

export const useCustomers = () => {
  const [page, setPage] = useState<number>(1)

  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
  const handleIsOpenCreate = () => setIsOpenCreate(!isOpenCreate)

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const handleIsOpenEdit = () => setIsOpenEdit(!isOpenEdit)

  const { data: customers, isLoading } = useUsersQuery(page, PAGE_SIZE)

  const totalPages = customers?.count
    ? Math.max(1, Math.ceil(customers.count / PAGE_SIZE))
    : 1

  useEffect(() => {
    if (customers?.count && customers.count <= PAGE_SIZE && page !== 1) {
      setPage(1)
    }
  }, [customers?.count, page])

  const columns = [
    { name: 'name', label: 'Nome:', size: '30' },
    { name: 'email', label: 'Email:', size: '30' },
    { name: 'status', label: 'Status:', size: '40' },
    { name: 'amount', label: 'Valor:', size: '20' },
    { name: 'actions', label: '', size: '0' },
  ] as const

  return {
    customers: customers?.data || [],
    setSelectedCustomer,
    handleIsOpenCreate,
    selectedCustomer,
    handleIsOpenEdit,
    isOpenCreate,
    isOpenEdit,
    totalPages,
    isLoading,
    setPage,
    columns,
    page,
  }
}
