import { DataTable } from './components/data-table'
import { Suspense } from 'react'
import listTenantStudios, { getActiveTenant } from '@/lib/actions'
import { SiteHeader } from '@/components/site-header'

export default async function Page() {
  let data: any = []
  const tenantId = await getActiveTenant()
  const studios = await listTenantStudios(tenantId)
  return (
    <>
    <SiteHeader title="Studio List" />
    <div className="flex flex-col justify-center w-full">
      <div className="@container/main flex flex-1 flex-col gap-2 m-4">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense fallback={<p>loading</p>}>
            <DataTable data={studios} />
          </Suspense>
        </div>
      </div>
    </div>
    </>
  )
}