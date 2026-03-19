'use client'

import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCallback, useState } from 'react'

export default function Page() {
  const [open247, setOpen247] = useState(false)
  const cb = (e: boolean) => {
    setOpen247(e)
  }
  return (
    <>
    <SiteHeader />
    <div className="flex flex-col max-w-5xl justify-center w-full">
      <div className="@container/main flex flex-1 flex-col gap-2 m-4">
        <h1 className="text-xl uppercase">Studio 12345</h1>
        <Input type="text" id="name" name="name" placeholder="Studio Name" />
        <Input type="text" id="address" name="address" placeholder="Address line 1" />
        <Input type="text" id="address" name="address" placeholder="Address line 2" />
        <Input type="text" id="address" name="address" placeholder="City" />
        <Separator />
        <h6 className="text-xl">Addons</h6>
        <h6 className="text-xl">Weekly Availablity - Days</h6>
        <div className="flex flex-row items-center space-x-2">
          <Checkbox id="open247" onCheckedChange={v => cb(!!v)} />
          <Label htmlFor="open247">Open 24/7</Label>
        </div>
        <FieldSet className="inline-flex flex-row items-center space-x-1" disabled={open247}>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="sunday" />
            <Label htmlFor="sunday">Sunday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Monday" />
            <Label htmlFor="Monday">Monday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Tuesday" />
            <Label htmlFor="Tuesday">Tuesday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Wednesday" />
            <Label htmlFor="Wednesday">Wednesday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Thursday" />
            <Label htmlFor="Thursday">Thursday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Friday" />
            <Label htmlFor="Friday">Friday</Label>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <Checkbox id="Saturday" />
            <Label htmlFor="Saturday">Saturday</Label>
          </div>
        </FieldSet>
        <FieldSet disabled={open247}>
          <h6 className="text-xl">Weekly Availablity - Business Hours</h6>
          <div className="inline-flex flex-row items-center space-x-4">
            <div className="flex flex-row items-center space-x-1">
              <span>Open hours:</span>
              <Input type="time" className="w-32" />
              <span> - </span>
              <Input type="time" className="w-32" />
            </div>
          </div>
        </FieldSet>
        <h6 className="text-xl">Description</h6>
        <textarea rows={10} className="border rounded-lg" placeholder="Add a description for this studio" />
        <div className="h-96 border p-1">
          <span>Gallery</span>
          <Carousel className="size-full">
            <CarouselContent className="size-full h-96">
              <CarouselItem className="flex items-center justify-center text-5xl">
                <span>A</span>
              </CarouselItem>
              <CarouselItem className="flex items-center justify-center text-5xl">
                <span>B</span>
              </CarouselItem>
              <CarouselItem className="flex items-center justify-center text-5xl">
                <span>C</span>
              </CarouselItem>
            </CarouselContent>
            {/* <CarouselPrevious />
            <CarouselNext /> */}
          </Carousel>
        </div>
        <Button className="cursor-pointer">Save changes</Button>
      </div>
    </div>
    </>
  )
}