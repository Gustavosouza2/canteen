import { Chart } from '@/components/features/Chart'
import { Card } from '@/components/features/Card'
import { useHome } from '../model/useHome'

export const HomeView = (props: ReturnType<typeof useHome>) => {
  const { cardItems, isLoading, customers } = props

  return (
    <main className="grid flex-col gap-6 md:-ml-96 sm:px-10 my-24 items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card data={cardItems} isLoading={isLoading} />
      </div>
      <div className="grid grid-cols-1 gap-4">
        <Chart isLoading={isLoading} data={customers?.data ?? []} />
      </div>
    </main>
  )
}
