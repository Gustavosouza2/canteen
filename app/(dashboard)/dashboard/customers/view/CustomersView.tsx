import { Button } from '@/components/ui/button'

import { DataTable } from '@/components/features/Table/Table'
import { CreateCustomerModal } from '../create-customer'
import { useCustomers } from '../model/useCustomers'

export const customersView = (props: ReturnType<typeof useCustomers>) => {
  const {
    handleIsOpen,
    totalPages,
    isLoading,
    customers,
    setPage,
    columns,
    isOpen,
    page,
  } = props

  return (
    <div className="flex flex-col w-full md:mr-96 px-10">
      <div className="flex flex-row justify-between">
        <h1 className="text-gray-300 font-mono font-medium tracking-wide ml-5 mt-1">
          Clientes:
        </h1>

        <div>
          <Button
            variant="secondary"
            onClick={handleIsOpen}
            className="rounded-xl mb-5"
          >
            Novo Cliente
          </Button>
        </div>

        <CreateCustomerModal isOpen={isOpen} onClose={handleIsOpen} />
      </div>

      <DataTable
        onPageChange={(page) => setPage(page)}
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
