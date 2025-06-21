import { useCustomersList } from '@/hooks/custom/useCustomers'
import { CustomersView } from './view/CustomersView'
import { PAGE_SIZE } from '@/constants/pageSize'

export default async function Customers() {
  // TODO: IMPLEMENTATION OF PAGINATION
  const customers = await useCustomersList(1, PAGE_SIZE)

  return <CustomersView customers={customers} />
}
