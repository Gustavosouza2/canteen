import { NextResponse, type NextRequest } from 'next/server'
import arcjet, { shield } from '@arcjet/next'
import { PrismaClient } from '@prisma/client'

const arcJet = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
})

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  const decision = await arcJet.protect(request)
  const searchParams = new URLSearchParams(request.url)

  const pageSize = Number(searchParams.get('pageSize') || 10)
  const page = Number(searchParams.get('page') || 1)

  if (decision.isDenied()) {
    return NextResponse.json(
      { error: 'Unauthorized', reason: decision.reason },
      { status: 401 },
    )
  }

  if (decision.isAllowed()) {
    try {
      const count = await prisma.user.count()

      if (!count) {
        return NextResponse.json({ data: [], count: 0 })
      }

      const totalPages = Math.ceil(count / pageSize)
      const adjustedPage = Math.min(page, totalPages)
      const skip = (adjustedPage - 1) * pageSize

      const data = await prisma.user.findMany({
        skip,
        take: pageSize,
        orderBy: {
          id: 'desc',
        },
      })

      return NextResponse.json({ data, count })
    } catch (error) {
      console.error(error)
      return NextResponse.json(
        {
          error: 'Database error',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        { status: 500 },
      )
    }
  }
}

export async function POST(request: NextRequest) {
  const formData = await request.formData()

  const createdAt = formData.get('created_at')?.toString()
  const amount = Number(formData.get('amount')?.toString())
  const status = formData.get('status')?.toString()
  const email = formData.get('email')?.toString()
  const name = formData.get('name')?.toString()

  if (!name || !email) {
    return NextResponse.json(
      {
        error: 'Validation error',
        details: 'Name and email are required',
      },
      { status: 400 },
    )
  }

  try {
    const data = await prisma.user.create({
      data: {
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        amount,
        status: status || 'pending',
        name,
        email,
      },
    })

    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        error: 'Database error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 400 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  const formData = await request.formData()

  const amountEdit = Number(formData.get('amount')?.toString())
  const customerId = Number(formData.get('id')?.toString())
  const statusEdit = formData.get('status')?.toString()

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: customerId,
      },
      data: {
        status: statusEdit,
        amount: amountEdit,
      },
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error(err)
    return NextResponse.json(
      {
        error: 'Database error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 400 },
    )
  }
}
