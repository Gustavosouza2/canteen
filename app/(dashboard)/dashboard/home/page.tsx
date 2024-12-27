'use client'

import { useUser } from '../../../../context/userContext'
import { Card } from '@/components/Card/Card'

export default function Home() {
  const { email, token } = useUser()

  console.log({
    email,
    token,
  })

  return (
    <main className="flex flex-col items-center justify-between">
      <Card
        title="subscription"
        description="total de valores gastos esse mes"
        info="+360"
      />
    </main>
  )
}
