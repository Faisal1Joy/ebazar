'use client'
import { useSearchParams } from 'next/navigation'
import { useFormState, useFormStatus } from 'react-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInWithCredentials } from '@/lib/actions/user.actions'
import { signInDefaultValues } from '@/lib/constants'
import Link from 'next/link'
export default function CredentialsSignInForm() {
  const [data, action] = useFormState(signInWithCredentials, {
    message: '',
    success: false,
  })
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'
  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} className="w-full" variant="default">
        {pending ? 'Submitting...' : 'Sign In with credentials'}
      </Button>
    )
  }
  return (
    <form action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div className="space-y-6">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="m@example.com"
            required
            type="email"
            defaultValue={signInDefaultValues.email}
          />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            required
            type="password"
            defaultValue={signInDefaultValues.password}
          />
        </div>
        <div>
          <SignInButton />
        </div>
        {data && !data.success && (
          <div className="text-center text-destructive">{data.message}</div>
        )}
        {!data && (
          <div className="text-center text-destructive">
            Unknown error happened.{' '}
            <Button onClick={() => window.location.reload()}>
              Please reload
            </Button>
          </div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link
            target="_self"
            className="link"
            href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
          >
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  )
}

// 'use client'

// import { useSearchParams } from 'next/navigation'
// import { useFormState, useFormStatus } from 'react-dom'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import Link from 'next/link'
// import { signInDefaultValues } from '@/lib/constants'

// interface FormState {
//   message: string
//   success: boolean
// }

// export default function CredentialsSignInForm() {
//   const searchParams = useSearchParams()
//   const callbackUrl = searchParams.get('callbackUrl') || '/'

//   // ✅ Fix: Explicitly define types for _prevState and formData
//   const [data, action] = useFormState(
//     async (_prevState: FormState, formData: FormData): Promise<FormState> => {
//       const response = await fetch('/api/auth/signin', {
//         method: 'POST', // ✅ Ensure this is a POST request
//         body: formData,
//         headers: {
//           Accept: 'application/json',
//           'Content-Type': 'application/x-www-form-urlencoded',
//         },
//       })

//       return response.json()
//     },
//     {
//       message: '',
//       success: false,
//     }
//   )

//   const SignInButton = () => {
//     const { pending } = useFormStatus()
//     return (
//       <Button disabled={pending} className="w-full" variant="default">
//         {pending ? 'Submitting...' : 'Sign In with credentials'}
//       </Button>
//     )
//   }

//   return (
//     <form action={action}>
//       <input type="hidden" name="callbackUrl" value={callbackUrl} />
//       <div className="space-y-6">
//         <div>
//           <Label htmlFor="email">Email</Label>
//           <Input
//             id="email"
//             name="email"
//             placeholder="m@example.com"
//             required
//             type="email"
//             defaultValue={signInDefaultValues.email}
//           />
//         </div>
//         <div>
//           <Label htmlFor="password">Password</Label>
//           <Input
//             id="password"
//             name="password"
//             required
//             type="password"
//             defaultValue={signInDefaultValues.password}
//           />
//         </div>
//         <div>
//           <SignInButton />
//         </div>
//         {data && !data.success && (
//           <div className="text-center text-destructive">{data.message}</div>
//         )}
//         {!data && (
//           <div className="text-center text-destructive">
//             Unknown error happened.{' '}
//             <Button onClick={() => window.location.reload()}>
//               Please reload
//             </Button>
//           </div>
//         )}
//         <div className="text-sm text-center text-muted-foreground">
//           Don&apos;t have an account?{' '}
//           <Link
//             target="_self"
//             className="link"
//             href={`/sign-up?callbackUrl=${encodeURIComponent(callbackUrl)}`}
//           >
//             Sign Up
//           </Link>
//         </div>
//       </div>
//     </form>
//   )
// }
