'use client'

import { ReactNode, useState, useEffect } from 'react'

import { HeaderLogin } from './Header'
import { FooterLogin } from './Footer'

export const LoginLayoutComponent = ({ children }: { children: ReactNode }) => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <div className="flex flex-col h-screen">
      <HeaderLogin />
      <main className="flex-1">{children}</main>
      <FooterLogin />
    </div>
  )
}
