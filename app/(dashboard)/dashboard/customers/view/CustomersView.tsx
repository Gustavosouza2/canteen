import { Button } from '@/components/ui/button'
import { MdEdit } from 'react-icons/md'

import { CreateCustomerModal } from '../create-customer'
import { DataTable } from '@/components/features/Table'
import { EditCustomerModal } from '../edit-customer'
import { useCustomers } from '../model/useCustomers'
import { Customer } from '@/types/customer'

export const customersView = (props: ReturnType<typeof useCustomers>) => {
  const {
    setSelectedCustomer,
    handleIsOpenCreate,
    handleIsOpenEdit,
    selectedCustomer,
    isOpenCreate,
    isOpenEdit,
    totalPages,
    isLoading,
    customers,
    setPage,
    columns,
    page,
  } = props

  const handleIsOpenEditModal = (customerId: number) => {
    const customerToEdit = customers.find(
      (customer: Customer) => customer.id === customerId,
    )
    if (customerToEdit) {
      setSelectedCustomer(customerToEdit)
      handleIsOpenEdit()
    }
  }

  const ItemsContextMenu = (rowData: Customer) => [
    {
      text: 'Editar',
      icon: () => <MdEdit className="h-4 w-4 fill-current" />,
      onOpen: () => handleIsOpenEditModal(rowData.id),
    },
  ]

  return (
    <div className="flex flex-col w-full md:mr-96 px-10">
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
        isLoading={isLoading}
        currentPage={page}
        columns={columns}
        data={customers}
        title="Clientes"
      />
    </div>
  )
}
