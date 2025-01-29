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
