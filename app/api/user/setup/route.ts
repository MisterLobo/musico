import { createClient } from '@/lib/supabase/server'
import { cookies, headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from '@/lib/db'

export async function POST(request: NextRequest) {
  const hd = await headers()
  const accessToken = hd.get('x-access-token') as string
  const refreshToken = hd.get('x-refresh-token') as string
  console.log(accessToken, refreshToken)
  const supabase = await createClient();
  const { data: claimsData, error: claimsError } = await supabase.auth.getClaims()
  console.log(claimsData?.claims.sub)
  const json = await request.json()

  const { count } = await supabase.from('tenants')
    .select('*', { count: 'exact', head: true })
  console.log('count:', count)
  if (count === 0) {
    const { data: tenantData, error: tenantError } = await supabase.from('tenants')
      .insert({
        owner_id: claimsData?.claims.sub,
        type: json.account_type,
        status: 'active',
      })
      .select()

    console.log(tenantData, tenantError)
    return NextResponse.json({ data: tenantData, error: tenantError })
  }

  return NextResponse.json({
    ok: true,
  }, { status: 200 })
}

export async function GET(request: NextRequest) {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getClaims()
  const userId = data?.claims.sub

  const { count = 0 } = await supabase.from('tenants')
    .select('id', { count: 'exact', head: true })
  
  // redirect('/account/setup')
  return NextResponse.json({
    completed: (count ?? 0) > 0,
  }, { status: 200 })
}