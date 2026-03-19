import { Button } from '@/components/ui/button'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from "@/components/ui/separator"
import { SectionCards } from '@/components/section-cards'
import { ChartAreaInteractive } from '@/components/chart-area-interactive'
import { Suspense } from 'react'
import { DataTable } from '@/components/data-table'

export default async function Page() {
  return (
    <>
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Studio Rooms</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <a
              href="https://github.com/MisterLobo/musico"
              rel="noopener noreferrer"
              target="_blank"
              className="dark:text-foreground"
            >
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </header>
    <div className="flex flex-col justify-center w-full">
      <div className="@container/main flex flex-1 flex-col gap-2 m-4">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <Suspense fallback={<p>loading</p>}>
            <DataTable data={[]} />
          </Suspense>
        </div>
      </div>
    </div>
    </>
  )
}