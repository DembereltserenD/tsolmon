'use client'

import { LoginForm } from '@/components/auth/login-form'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900">
            Sign in to your account
          </h1>
          <LoginForm />
        </div>
      </div>
    </div>
  )
}
