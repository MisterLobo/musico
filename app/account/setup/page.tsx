'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'

export default function Page() {
  const router = useRouter()
  const [role, setRole] = useState<'customer' | 'business' | undefined>()
  const createAccount = async (url: string) => {
    console.log('role:', role)
    const response = await fetch('/api/user/setup', {
      method: 'POST',
      body: JSON.stringify({
        account_type: role,
      })
    })
    const json = await response.json()
    if (response.status === 200) {
      router.push(url)
    }
  }
  const createCustomerAccount = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setRole('customer')
    await createAccount('/')
  }
  const createBusinessAccount = async (e: React.SubmitEvent) => {
    e.preventDefault()
    setRole('business')
    await createAccount('/dashboard')
  }
  return (
    <main className="@container/main min-h-screen flex flex-col items-center">
      <div className="w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>musico</Link>
            </div>
          </div>
        </nav>
        <div className=" flex flex-col gap-2">
          <div className="flex flex-row gap-4 min-w-5xl">
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Customer</CardTitle>
                <CardDescription>I am looking for studio rentals</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={createCustomerAccount}>
                  <Button type="submit" className="flex w-full cursor-pointer">Select</Button>
                </form>
              </CardContent>
            </Card>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Business Owner</CardTitle>
                <CardDescription>I own a studio for rental</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={createBusinessAccount}>
                  <Button type="submit" className="flex w-full cursor-pointer">Select</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}