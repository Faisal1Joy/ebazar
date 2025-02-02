import { NextResponse } from 'next/server'
import { signInWithCredentials } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  const formData = await req.formData()
  const result = await signInWithCredentials({}, formData)

  return NextResponse.json(result)
}

// ✅ Fix: Return a 405 response for unsupported methods
export async function GET() {
  return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 })
}
