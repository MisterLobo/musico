'use server'

import { createClient } from './supabase/server'

export async function getMapsPlaceInfo() {
  const res = await fetch('https://places.googleapis.com/v1/places/ChIJj61dQgK6j4AR4GeTYWZsKWw', {
    headers: {
      'X-Goog-Api-Key': process.env.GMAPS_PLAT_API_KEY ?? '',
      'X-Goog-FieldMask': 'name,displayName,formattedAddress',
    },
  })
  const jj = await res.json();
  console.log(jj)
  return jj
}

export async function setupUser(accessToken: string, refreshToken: string) {
  const supabase = createClient()
}

export async function checkHasTenants() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const { count = 0 } = await supabase.from('tenants')
    .select('id', { count: 'exact', head: true })
    .eq('owner_id', user?.sub)

  return (count ?? 0) > 0
}

export async function getTenant(id: string) {
  const supabase = await createClient()

  const { data: tenantData, error: tenantError } = await supabase.from('tenants')
    .select('id,type,status,country,currency,online_status,active_studio')
    .eq('id', id)
    .maybeSingle()

  if (tenantError) throw tenantError

  return tenantData
}

export async function getActiveStudio() {
  const active = await getActiveTenant()
  const tenant = await getTenant(active)

  return tenant?.active_studio
}

export async function getActiveTenant() {
  const supabase = await createClient()
  const { data } = await supabase.auth.getClaims()
  const user = data?.claims

  return getTenantForUser(user?.sub as string)
}

export async function getTenantForUser(id: string) {
  const supabase = await createClient()

  const { data: tenantData, error: tenantError } = await supabase.from('tenants')
    .select('id')
    .eq('owner_id', id)
    .maybeSingle()

  if (tenantError) throw tenantError

  return tenantData?.id
}

export async function createNewStudio(profileCreateParams: Record<string, any>, studioCreateParams: Record<string, any>) {
  const supabase = await createClient()
  const tenantId = await getActiveTenant()

  const { data: profileData, error: profileError } = await supabase.from('profiles')
    .insert({
      tenant_id: tenantId,
      ...profileCreateParams,
    })
    .select('id')
    .maybeSingle()

  const profile = profileData

  console.error(profileError)

  if (profileError) throw profileError

  const { data: studioData, error: studioError } = await supabase.from('studio_brands')
    .insert({
      tenant_id: tenantId,
      profile_id: profile?.id,
      ...studioCreateParams,
    })
    .select('id')
    .maybeSingle()

    console.error(studioError)
  if (studioError) throw studioError

  const studio = studioData

  return {
    profile,
    studio,
  }
}

export async function createNewRoom(createParams: Record<string, any>) {
  const supabase = await createClient()
  const tenantId = await getActiveTenant()

  const activeStudio = await getActiveStudio()

  const { data, error } = await supabase.from('studio_rooms')
    .insert({
      tenant_id: tenantId,
      studio_id: activeStudio,
      ...createParams,
    })
    .select('id')
    .maybeSingle()

  if (error) throw error

  return { room: data?.id }
}

export async function listStudioRooms(studioId: string) {
  const supabase = await createClient()
  const tenantId = await getActiveTenant()

  const { data, error } = await supabase.from('studio_rooms')
    .select('*')
    .eq('tenant_id', tenantId)
    .eq('studio_id', studioId)
    .range(0, 10)

  if (error) throw error

  return data
}

export default async function listTenantStudios(tenantId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase.from('studio_brands')
    .select('*')
    .eq('tenant_id', tenantId)
    .range(0, 10)

  console.log(data?.length)

  if (error) throw error

  return data
}