export interface Customer {
  createdAt: string
  status: string
  amount: number
  email: string
  name: string
  id: number
}

export type CustomersResponse = {
  data: Customer[]
  count: number
}

export type CreateCustomerResponse = {
  customer: Customer
  status: number
}
