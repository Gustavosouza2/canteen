import { useQuery } from '@tanstack/react-query'

import { Customer, CustomersResponse } from '@/types/customer'

export const useCustomersList = (page: number, pageSize: number) => {
  const queryKey = ['User', page, pageSize]

  const queryFn = async (): Promise<CustomersResponse> => {
    try {
      const res = await fetch(
        `/api/dashboard/customer?page=${page}&pageSize=${pageSize}`,
      )

      const text = await res.text()
      if (!text) {
        throw new Error('Empty response received')
      }

      const response = JSON.parse(text)
      return {
        data: response.data as Customer[],
        count: response.count,
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return useQuery({
    staleTime: 1000 * 60,
    queryKey,
    retry: 2,
    queryFn,
  })
}
