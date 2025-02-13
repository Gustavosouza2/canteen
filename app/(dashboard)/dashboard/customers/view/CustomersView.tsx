import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/features/Table/Table'
import { CreateCustomerModal } from '../create-customer'
import { useCustomers } from '../model/useCustomers'
import { EditCustomerModal } from '../edit-customer'
import { MdEdit, MdDelete } from 'react-icons/md'

export const customersView = (props: ReturnType<typeof useCustomers>) => {
  const {
    handleIsOpenCreate,
    handleIsOpenEdit,
    isOpenCreate,
    isOpenEdit,
    totalPages,
    isLoading,
    customers,
    setPage,
    columns,
    page,
  } = props

  const ItemsContextMenu = [
    {
      icon: () => <MdEdit className="h-4 w-4 fill-current" />,
      text: 'Editar',
      onOpen: () => handleIsOpenEdit(),
    },
    {
      icon: () => <MdDelete className="h-4 w-4 fill-current" />,
      text: 'Excluir',
      onOpen: () => {},
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
            variant="secondary"
            className="rounded-xl mb-5"
            onClick={handleIsOpenCreate}
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
        <EditCustomerModal isOpen={isOpenEdit} onClose={handleIsOpenEdit} />
      </div>

      <DataTable
        onPageChange={(page) => setPage(page)}
        items={ItemsContextMenu}
        data={customers as any}
        totalPages={totalPages}
        isLoading={isLoading}
        currentPage={page}
        columns={columns}
        title="Clientes"
      />
    </div>
  )
}
