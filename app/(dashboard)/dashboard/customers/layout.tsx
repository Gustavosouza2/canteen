import { DashBoardLayout } from '@/app/(dashboard)/layout/dashboard'
import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Customers',
  description: 'Generated by create next app',
}

export default function DashLayout({ children }: { children: ReactNode }) {
  return <DashBoardLayout>{children}</DashBoardLayout>
}
