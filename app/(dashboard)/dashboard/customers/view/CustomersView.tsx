'use client'

import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import { MdEdit } from 'react-icons/md'

import { CreateCustomerModal } from '../create-customer'
import { type Customer, type CustomersResponse } from '@/types/customer'
import { DataTable } from '@/components/features/Table'
import { EditCustomerModal } from '../edit-customer'
import { PAGE_SIZE } from '@/constants/pageSize'

type CustomersViewProps = {
  customers: CustomersResponse
}

export const CustomersView = ({ customers }: CustomersViewProps) => {
  const [page, setPage] = useState<number>(1)
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>()

  useEffect(() => {
    if (customers?.count && customers.count <= PAGE_SIZE && page !== 1) {
      setPage(1)
    }
  }, [customers?.count, page])

  const [isOpenCreate, setIsOpenCreate] = useState<boolean>(false)
  const handleIsOpenCreate = () => setIsOpenCreate(!isOpenCreate)

  const [isOpenEdit, setIsOpenEdit] = useState<boolean>(false)
  const handleIsOpenEdit = () => setIsOpenEdit(!isOpenEdit)

  const totalPages = customers?.count
    ? Math.max(1, Math.ceil(customers.count / PAGE_SIZE))
    : 1

  const columns = [
    { name: 'name', label: 'Nome:', size: '30' },
    { name: 'email', label: 'Email:', size: '30' },
    { name: 'status', label: 'Status:', size: '40' },
    { name: 'amount', label: 'Valor:', size: '20' },
    { name: 'actions', label: '', size: '0' },
  ] as const

  const handleIsOpenEditModal = (customerId: number) => {
    const customerToEdit = customers?.data?.find(
      (customer: Customer) => customer.id === customerId,
    )

    if (customerToEdit) {
      setSelectedCustomer(customerToEdit)
      handleIsOpenEdit()
    }
  }

  const ItemsContextMenu = (rowData: Customer) => [
    {
      label: 'Editar',
      icon: () => <MdEdit className="h-4 w-4 fill-current" />,
      onClick: () => handleIsOpenEditModal(rowData.id),
    },
  ]

  return (
    <div className="flex flex-col mt-36 px-10 w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-gray-300 font-mono font-medium tracking-wide ml-5 mt-1">
          Clientes:
        </h1>

        <div>
          <Button
            className="rounded-xl mb-5"
            onClick={handleIsOpenCreate}
            variant="secondary"
          >
            Novo Cliente
          </Button>
        </div>

        <CreateCustomerModal
          isOpen={isOpenCreate}
          onClose={handleIsOpenCreate}
        />
      </div>

      <div>
        <EditCustomerModal
          isOpen={isOpenEdit}
          onClose={handleIsOpenEdit}
          customer={selectedCustomer as Customer}
        />
      </div>

      <DataTable
        onPageChange={(page) => setPage(page)}
        items={ItemsContextMenu}
        totalPages={totalPages}
        data={customers?.data}
        currentPage={page}
        columns={columns}
        title="Clientes"
      />
    </div>
  )
}
