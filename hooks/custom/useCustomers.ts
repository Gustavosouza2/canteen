import { Customer, CustomersResponse } from '@/types/customer'
import { serverFetch } from '@/lib/api'

export const useCustomersList = async (
  page: number,
  pageSize: number,
): Promise<CustomersResponse> => {
  try {
    const res = await serverFetch<CustomersResponse>(
      `/api/dashboard/customer?page=${page}&pageSize=${pageSize}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        next: {
          tags: ['customers'],
        },
        cache: 'force-cache',
      },
    )

    if (!res.data) {
      throw new Error(`HTTP error! status: 404`)
    }

    return {
      data: res.data as Customer[],
      count: res.count,
    }
  } catch (error) {
    console.error('Error fetching customers:', error)
    throw error
  }
}
