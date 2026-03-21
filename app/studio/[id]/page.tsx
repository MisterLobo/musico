import { AuthButton } from '@/components/auth-button'
import { EnvVarWarning } from '@/components/env-var-warning'
import { Button } from '@/components/ui/button'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import { Field, FieldContent, FieldDescription, FieldLabel, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { hasEnvVars } from '@/lib/utils'
import { IconBrandFacebook, IconBrandGoogle, IconBrandX, IconBrandYoutube } from '@tabler/icons-react'
import { Check, CheckCircle, CheckCircle2, Star, X, XIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
          <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
            <div className="flex gap-5 items-center font-semibold">
              <Link href={"/"}>musico</Link>
              <Link href="/dashboard">Dashboard</Link>
            </div>
          </div>
          {!hasEnvVars ? (
            <EnvVarWarning />
          ) : (
            <Suspense>
              <AuthButton />
            </Suspense>
          )}
        </nav>
        <div className="flex-1 flex flex-col gap-20 w-5xl p-5">
          <main className="flex flex-col gap-6 px-4 w-full">
            <h1 className="text-2xl">
              <div className="flex flex-row items-center space-x-2">
                <span>Studio Uno</span>
                <CheckCircle2 />
              </div>
              <Star />
            </h1>
            <h2 className="text-lg">Somewhere, Out There, Earth</h2>
            <p>8AM - 10PM</p>
            <div className="flex flex-row items-center space-x-2">
              <span>Socials</span>
              <Link href="#"><IconBrandX /></Link>
              <Link href="#"><IconBrandFacebook /></Link>
              <Link href="#"><IconBrandGoogle /></Link>
              <Link href="#"><IconBrandYoutube /></Link>
            </div>
            <div className="flex flex-row space-x-2">
              <RadioGroup defaultValue="entry" className="w-full">
                <FieldLabel htmlFor="entry">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Student</FieldTitle>
                      <FieldDescription>$2 hourly</FieldDescription>
                      <h5 className="text-md font-bold">Amenities</h5>
                      <div className="flex flex-row items-center space-x-2">
                        <span className="flex items-center"><Check size={16} /> Drum set, keyboard, guitar</span>
                        <span className="flex items-center"><Check size={16} /> Free drinks (for 3 hours up)</span>
                        <span className="flex items-center"><Check size={16} /> Free parking</span>
                      </div>
                    </FieldContent>
                    <RadioGroupItem value="entry" id="entry" />
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="gig">
                  <Field orientation="horizontal">
                    <FieldContent>
                      <FieldTitle>Gig</FieldTitle>
                      <FieldDescription>$10 hourly</FieldDescription>
                      <h5 className="text-md font-bold">Amenities</h5>
                      <div className="flex flex-row items-center space-x-2">
                        <span className="flex items-center"><Check size={16} /> All instruments</span>
                        <span className="flex items-center"><Check size={16} /> Free drinks (for 3 hours up)</span>
                      </div>
                    </FieldContent>
                    <RadioGroupItem value="gig" id="gig" />
                  </Field>
                </FieldLabel>
              </RadioGroup>
            </div>
            <div className="flex flex-row items-center">
              <span className="min-w-48">Date and Time</span>
              <Input type="datetime-local" name="datetime" className="w-fit" />
            </div>
            <div className="flex flex-row items-center">
              <span className="min-w-48">Session hours</span>
              <Input type="number" name="hours" className="w-fit" min={1} max={10} defaultValue={1} />
            </div>
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
            <div className="h-96 border p-1">
              <span>Map Preview</span>
              <div className="flex size-full items-center justify-center">
              </div>
            </div>
            <Button className="cursor-pointer">Book Appointment</Button>
            <span>Reviews</span>
          </main>
        </div>
      </div>
    </main>
  )
}