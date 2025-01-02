import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

interface CardProps {
  description?: string
  title?: string
  info?: string
}

interface CardMapProps {
  data: Array<CardProps>
  isLoading: boolean
}
export const Card = ({ data, isLoading }: CardMapProps) => {
  return data.map((item, i) => (
    <>
      {isLoading ? (
        <Skeleton className="w-[330px] h-36 rounded-xl " />
      ) : (
        <CardShadcn
          className="w-full rounded-xl border  border-[#DA4453] bg-transparent"
          key={i}
        >
          <CardHeader>
            <CardTitle className="text-[#D1D1D2] font-mono text-md whitespace-normal tracking-wide">
              {item.title}
            </CardTitle>
            <p className="text-[#D1D1D2] text-2xl font-bold whitespace-normal">
              {item.info}
            </p>
            <CardDescription className="font-sans text-sm text-[#A1A1AA] whitespace-normal">
              {item.description}
            </CardDescription>
          </CardHeader>
        </CardShadcn>
      )}
    </>
  ))
}
