export const config = {
  urls: {
    base:
      process.env.NEXT_PUBLIC_BASE_URL ||
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : ''),

    api: {
      customers: '/api/dashboard/customer',
    },
  },

  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },

  cache: {
    customers: {
      tags: ['customers'],
      revalidate: 60,
    },
  },
} as const

export function buildApiUrl(path: string): string {
  const baseUrl = config.urls.base

  if (!baseUrl && typeof window !== 'undefined') {
    return `${window.location.origin}${path}`
  }

  if (baseUrl) {
    const cleanPath = path.startsWith('/') ? path : `/${path}`
    return `${baseUrl}${cleanPath}`
  }

  return `http://localhost:3000${path}`
}
