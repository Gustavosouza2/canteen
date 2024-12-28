import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

interface CardProps {
  description: string
  title: string
  info: string
}
export const Card = ({ description, title, info }: CardProps) => {
  return (
    <CardShadcn className="w-[290px] rounded-xl border  border-[#DA4453] bg-transparent">
      <CardHeader>
        <CardTitle className="text-[#D1D1D2] font-mono text-sm">
          {title}
        </CardTitle>
        <p className="text-[#D1D1D2] text-2xl font-bold">{info}</p>
        <CardDescription className="font-sans text-sm text-[#A1A1AA]">
          {description}
        </CardDescription>
      </CardHeader>
    </CardShadcn>
  )
}
