import { NextResponse, type NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma/prisma'
import { revalidateTag } from 'next/cache'

export const dynamic = 'force-dynamic'

// ArcJet configuration - optional to prevent build failures
let arcJet: any = null
try {
  if (process.env.ARCJET_KEY) {
    const { default: arcjet, shield } = await import('@arcjet/next')
    arcJet = arcjet({
      key: process.env.ARCJET_KEY,
      rules: [
        shield({
          mode: 'LIVE',
        }),
      ],
    })
  }
} catch (error) {
  console.warn('ArcJet not configured:', error)
}

export async function GET(request: NextRequest) {
  // Only use ArcJet if configured
  if (arcJet) {
    const decision = await arcJet.protect(request)

    if (decision.isDenied()) {
      return NextResponse.json(
        { error: 'Unauthorized', reason: decision.reason },
        { status: 401 },
      )
    }
  }

  try {
    const searchParams = request.nextUrl.searchParams

    const pageSize = Number(searchParams.get('pageSize') || 10)
    const page = Number(searchParams.get('page') || 1)

    if (pageSize > 100) {
      return NextResponse.json(
        { error: 'Page size too large' },
        { status: 400 },
      )
    }

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
    console.error('Database error:', error)
    return NextResponse.json(
      {
        error: 'Database error',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()

    const createdAt = formData.get('createdAt')?.toString()
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

    const data = await prisma.user.create({
      data: {
        createdAt: createdAt ? new Date(createdAt) : new Date(),
        amount: amount || 0,
        status: status || 'pending',
        name,
        email,
      },
    })

    // Invalidate cache after creating a customer
    revalidateTag('customers')

    return NextResponse.json({ customer: data, status: 200 })
  } catch (err) {
    console.error('Create user error:', err)
    return NextResponse.json(
      {
        error: 'Database error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const formData = await request.formData()

    const amountEdit = Number(formData.get('amount')?.toString())
    const customerId = Number(formData.get('id')?.toString())
    const statusEdit = formData.get('status')?.toString()

    if (!customerId) {
      return NextResponse.json(
        { error: 'Customer ID is required' },
        { status: 400 },
      )
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: customerId,
      },
      data: {
        ...(statusEdit && { status: statusEdit }),
        ...(amountEdit && { amount: amountEdit }),
      },
    })

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    // Invalidate cache after updating a customer
    revalidateTag('customers')

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error('Update user error:', err)

    if (
      err instanceof Error &&
      err.message.includes('Record to update not found')
    ) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(
      {
        error: 'Database error',
        details: err instanceof Error ? err.message : 'Unknown error',
      },
      { status: 500 },
    )
  }
}
