import { useQuery } from '@tanstack/react-query'
import type { Customer, CustomersResponse } from '@/types/customer'

export const useCustomersList = (page: number, pageSize: number) => {
  const queryKey = ['User', page, pageSize]

  const queryFn = async (): Promise<CustomersResponse> => {
    try {
      const res = await fetch(
        `/api/dashboard/customer?page=${page}&pageSize=${pageSize}`,
      )

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }

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
      console.error('Fetch customers error:', error)
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
