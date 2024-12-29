'use client'

import { useUsersQuery } from '@/hooks/custom/use-users'
import { useUserContext } from '../../../../context/userContext'
import { Card } from '@/components/features/card/Card'

export default function Home() {
  const { email, token } = useUserContext()

  const { data } = useUsersQuery()

  console.log({
    email,
    token,
    data,
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
