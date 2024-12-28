'use client'

import { useLogin } from './model/useLogin'
import { LoginView } from './view/LoginView'

export default function LoginPage() {
  return <LoginView {...useLogin()} />
}
