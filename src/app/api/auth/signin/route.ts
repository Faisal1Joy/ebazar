import { NextResponse } from 'next/server'
import { signInWithCredentials } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  try {
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
    }

    const formData = await req.formData()
    const result = await signInWithCredentials({}, formData)

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error', details: error },
      { status: 500 }
    )
  }
}

// ✅ Block `GET` requests explicitly
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
