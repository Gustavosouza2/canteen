import arcjet, { shield } from '@arcjet/next'
import { NextResponse } from 'next/server'

import { getSupabaseBrowserClient } from '@/lib/supabase'
import useSupabase from '@/hooks/custom/useSupabase'

const arcJet = arcjet({
  key: process.env.ARCJET_KEY!,
  rules: [
    shield({
      mode: 'LIVE',
    }),
  ],
})
export async function GET(request: Request) {
  const decision = await arcJet.protect(request)
  const client = useSupabase()
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
    const { count } = await client
      .from('User')
      .select('*', { count: 'exact', head: true })

    if (!count) {
      return { data: [], count: 0 }
    }

    const totalPages = Math.ceil(count / pageSize)
    const adjustedPage = Math.min(page, totalPages)
    const from = (adjustedPage - 1) * pageSize
    const to = from + pageSize - 1

    try {
      const { data, error } = await client
        .from('User')
        .select('*')
        .range(from, to)
        .order('id', { ascending: false })

      if (error) {
        console.error('Error fetching users:', error)
        throw error
      }

      return { data, count }
    } catch (error) {
      console.log(error)
      console.error('Error in getUsers function:', error)
      throw error
    }
  }
}

export async function POST(request: Request) {
  const client = getSupabaseBrowserClient()
  const formData = await request.formData()

  const createdAt = formData.get('created_at')?.toString()
  const amount = Number(formData.get('amount')?.toString())
  const status = formData.get('status')?.toString()
  const email = formData.get('email')?.toString()
  const name = formData.get('name')?.toString()

  try {
    const { data, error } = await client
      .from('User')
      .insert([
        {
          createdAt,
          amount,
          status,
          name,
          email,
        },
      ])
      .select('*')

    if (error) throw error

    return NextResponse.json(data)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'API Error' }, { status: 400 })
  }
}

export async function PATCH(request: Request) {
  const client = getSupabaseBrowserClient()
  const formData = await request.formData()

  const amountEdit = Number(formData.get('amount')?.toString())
  const customerId = Number(formData.get('id')?.toString())
  const statusEdit = formData.get('status')?.toString()

  try {
    const { error } = await client
      .from('User')
      .update({ status: statusEdit, amount: amountEdit })
      .eq('id', customerId)

    if (error) throw error

    const { data: updatedUser, error: fetchError } = await client
      .from('User')
      .select('*')
      .eq('id', customerId)
      .single()

    if (fetchError) throw fetchError

    if (!updatedUser) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(updatedUser)
  } catch (err) {
    console.error(err)
    return NextResponse.json({ message: 'API Error' }, { status: 400 })
  }
}
