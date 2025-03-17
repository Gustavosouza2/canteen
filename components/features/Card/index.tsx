import { Skeleton } from '@/components/ui/skeleton'
import {
  Card as CardShadcn,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import DecryptedText from '../Texts/DecryptedText/DecryptedText'
import CountUp from '../Texts/CountNumber/CountNumber'

export interface CardProps {
  typeInfo: 'text' | 'decrypted'
  type?: 'number' | 'string'
  description?: string
  title?: string
  info?: string
}

interface CardMapProps {
  data: Array<CardProps>
  isLoading: boolean
}

export const Card = ({ data, isLoading }: CardMapProps) => {
  return data.map((item, index: number) => (
    <>
      {isLoading ? (
        <Skeleton className="w-[330px] h-36 rounded-xl " />
      ) : (
        <CardShadcn
          className="w-full rounded-xl border border-[#FFFA]/10 bg-[#0E0E10]"
          key={index}
        >
          <CardHeader>
            {item.typeInfo === 'text' ? (
              <CardTitle className="text-[#D1D1D2] font-mono text-md whitespace-normal tracking-wide">
                {item.title}
              </CardTitle>
            ) : (
              <div className="text-[#D1D1D2] font-mono text-lg font-bold whitespace-normal">
                <DecryptedText
                  characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!?123456$#*&"
                  revealDirection="center"
                  text={item.title ?? ''}
                  maxIterations={20}
                  animateOn="view"
                  speed={100}
                />
              </div>
            )}

            {item.type === 'number' ? (
              <CountUp
                className="count-up-text"
                to={Number.parseInt(item.info || '0')}
                direction="up"
                separator=","
                duration={1}
                from={0}
              />
            ) : (
              <p className="text-[#D1D1D2] text-2xl font-sans font-bold whitespace-normal">
                {item.info}
              </p>
            )}

            <CardDescription className="font-sans text-sm text-[#A1A1AA] whitespace-normal">
              {item.description}
            </CardDescription>
          </CardHeader>
        </CardShadcn>
      )}
    </>
  ))
}
