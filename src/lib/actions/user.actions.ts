// 'use server'
// import { isRedirectError } from 'next/dist/client/components/redirect'
// import { signIn, signOut } from '@/auth'
// import { signInFormSchema } from '../validator'
// export async function signInWithCredentials(
//   prevState: unknown,
//   formData: FormData
// ) {
//   try {
//     const user = signInFormSchema.parse({
//       email: formData.get('email'),
//       password: formData.get('password'),
//     })
//     await signIn('credentials', user)
//     return { success: true, message: 'Sign in successfully' }
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error
//     }
//     return { success: false, message: 'Invalid email or password' }
//   }
// }
// export const SignOut = async () => {
//   await signOut()
// }

'use server'
import { redirect } from 'next/navigation'
import { signIn, signOut } from '@/auth'
import { signInFormSchema } from '../validator'

export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    })

    await signIn('credentials', user)

    // Redirect after successful login
    redirect('/dashboard') // Change '/dashboard' to your desired route

    return { success: true, message: 'Sign in successfully' }
  } catch (error) {
    // Instead of using getRedirectError, check if it's an actual error
    if (error instanceof Error && error.message.includes('Redirect')) {
      throw error
    }

    return { success: false, message: 'Invalid email or password' }
  }
}

export const SignOut = async () => {
  await signOut()
}
