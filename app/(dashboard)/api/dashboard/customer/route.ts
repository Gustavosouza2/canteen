import { NextResponse } from 'next/server'

import { getSupabaseBrowserClient } from '@/lib/supabase'

export async function POST(request: Request) {
  const client = getSupabaseBrowserClient()
  const formData = await request.formData()

  const amount = Number(formData.get('amount')?.toString())
  const status = formData.get('status')?.toString()
  const email = formData.get('email')?.toString()
  const name = formData.get('name')?.toString()

  try {
    const { data, error } = await client
      .from('User')
      .insert([
        {
          email,
          name,
          amount,
          status,
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
