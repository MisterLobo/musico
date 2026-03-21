'use client'

import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { FieldSet } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { AdvancedMarker, APIProvider, Map, Marker, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useGeoLocation } from '@/hooks/use-geolocation'
import { Loader } from 'lucide-react'

import { LightGallery as ILightGallery } from 'lightgallery/lightgallery'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createNewStudio } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type StudioFormSchema = {
  name: string,
  address: string,
  description: string,
  open_sun: boolean,
  open_mon: boolean,
  open_tue: boolean,
  open_wed: boolean,
  open_thu: boolean,
  open_fri: boolean,
  open_sat: boolean,
  open_247: boolean,
  open_from: string,
  open_to: string,
}

export default function Page() {
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    control,
  } = useForm<StudioFormSchema>({
    defaultValues: {
      name: '',
      address: '',
      description: '',
      open_247: false,
      open_sun: false,
      open_mon: false,
      open_tue: false,
      open_wed: false,
      open_thu: false,
      open_fri: false,
      open_sat: false,
      open_from: '',
      open_to: '',
    },
  })
  const onSubmit: SubmitHandler<StudioFormSchema> = async (data) => {
    console.log(data)
    const { profile, studio } = await createNewStudio({
      name: data.name,
    }, {
      name: data.name,
      address: data.address,
      description: data.description,
      weekly_availability: {
        sunday: {
          open: data.open_mon,
          from: data.open_from,
          to: data.open_to,
        },
        monday: {
          open: data.open_mon,
          from: data.open_from,
          to: data.open_to,
        },
        tuesday: {
          open: data.open_tue,
          from: data.open_from,
          to: data.open_to,
        },
        wednesday: {
          open: data.open_wed,
          from: data.open_from,
          to: data.open_to,
        },
        thursday: {
          open: data.open_thu,
          from: data.open_from,
          to: data.open_to,
        },
        friday: {
          open: data.open_fri,
          from: data.open_from,
          to: data.open_to,
        },
        saturday: {
          open: data.open_sat,
          from: data.open_from,
          to: data.open_to,
        },
      },
      lat_lng: { lat: latitude, lng: longitude },
    })
    console.log(profile, studio)
  }

  const { latitude, longitude, getLatLng, loading } = useGeoLocation()
  const [open247, setOpen247] = useState(false)

  const lightGalleryRef = useRef<ILightGallery>(null)
  const containerRef = useRef(null)
  const [galleryContainer, setGalleryContainer] = useState(null)
  const [buinessDays, setBusinessDays] = useState<Map<string, { open: boolean, from?: string, to?: string }>>()
  const onInit = useCallback((detail: any) => {
    if (detail) {
      lightGalleryRef.current = detail.instance
      lightGalleryRef.current!.openGallery()
    }
  }, []);

  useEffect(() => {
    if ((!latitude || !longitude) && !loading) {
      getLatLng()
      console.log(latitude, longitude)
    }
  }, [latitude, longitude, loading])

  useEffect(() => {
    getLatLng()
    if (containerRef.current) {
      setGalleryContainer(containerRef.current)
    }
  }, [])

  const cb = (e: boolean) => {
    setOpen247(e)
  }

  return (
    <>
    <SiteHeader title="New Studio" />
    <div className="flex flex-col max-w-5xl justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="@container/main flex flex-1 flex-col gap-2 m-4">
        <h1 className="text-xl uppercase">Studio 12345</h1>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="text" id="name" placeholder="Studio Name" {...field} />}
        />
        {errors.name?.type === 'required' && (
          <p role="alert" className="text-xs text-red-500">Name is required</p>
        )}
        <Controller
          name="address"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="text" id="address" placeholder="Address" {...field} />}
        />
        {errors.address?.type === 'required' && (
          <p role="alert" className="text-xs text-red-500">Address is required</p>
        )}
        <Separator />
        <h6 className="text-xl">Addons</h6>
        <h6 className="text-xl">Weekly Availablity - Days</h6>
        <Controller
          name="open_247"
          control={control}
          render={({ field }) => (
            <div className="flex flex-row items-center space-x-2">
              <Checkbox {...field} id="open247" value="open247" onCheckedChange={c => setValue('open_247', !!c)} />
              <Label htmlFor="open247">Open 24/7</Label>
            </div>
          )}
        />
        <FieldSet className="inline-flex flex-row items-center space-x-1" disabled={open247}>
          <Controller
            name="open_sun"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Sunday" value="Sunday" onCheckedChange={c => setValue('open_sun', !!c)} />
                <Label htmlFor="Sunday">Sunday</Label>
              </div>
            )}
          />
          <Controller
            name="open_mon"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Monday" value="Monday" onCheckedChange={c => setValue('open_mon', !!c)} />
                <Label htmlFor="Monday">Monday</Label>
              </div>
            )}
          />
          <Controller
            name="open_tue"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Tuesday" value="Tuesday" onCheckedChange={c => setValue('open_tue', !!c)} />
                <Label htmlFor="Tuesday">Tuesday</Label>
              </div>
            )}
          />
          <Controller
            name="open_wed"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Wednesday" value="Wednesday" onCheckedChange={c => setValue('open_wed', !!c)} />
                <Label htmlFor="Wednesday">Wednesday</Label>
              </div>
            )}
          />
          <Controller
            name="open_thu"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Thursday" value="Thursday" onCheckedChange={c => setValue('open_thu', !!c)} />
                <Label htmlFor="Thursday">Thursday</Label>
              </div>
            )}
          />
          <Controller
            name="open_fri"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Friday" value="Friday" onCheckedChange={c => setValue('open_fri', !!c)} />
                <Label htmlFor="Friday">Friday</Label>
              </div>
            )}
          />
          <Controller
            name="open_sat"
            control={control}
            render={({ field }) => (
              <div className="flex flex-row items-center space-x-2">
                <Checkbox {...field} id="Saturday" value="Saturday" onCheckedChange={c => setValue('open_sat', !!c)} />
                <Label htmlFor="Saturday">Saturday</Label>
              </div>
            )}
          />
        </FieldSet>
        <FieldSet disabled={open247}>
          <h6 className="text-xl">Weekly Availablity - Business Hours</h6>
          <div className="inline-flex flex-row items-center space-x-4">
            <div className="flex flex-row items-center space-x-1">
              <span>Open hours:</span>
              <Controller
                name="open_from"
                control={control}
                render={({ field }) => <Input {...field} type="time" className="w-32" />}
              />
              <span> - </span>
              <Controller
                name="open_to"
                control={control}
                render={({ field }) => <Input {...field} type="time" className="w-32" />}
              />
            </div>
          </div>
        </FieldSet>
        <h6 className="text-xl">Description</h6>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea rows={10} className="border rounded-lg" placeholder="Add a description for this studio" {...field} />}
        />
        <div className="h-96 border p-1">
          <span>Gallery</span>
        </div>
        {/* <div className="h-100 border p-1 mb-4">
          <span>Map Preview</span>
          <div className="flex size-full items-center justify-center">
            {loading ? <span>loading</span> : ((latitude && longitude) ? <MapPreview lat={latitude} lng={longitude} /> : <span>map unavailable</span>)}
          </div>
        </div> */}
        <Button className="cursor-pointer">Save changes</Button>
      </form>
    </div>

    {/* <div className="relative">
      <div style={{ height: '500px' }} ref={containerRef}></div>
      <LightGallery
        container={containerRef.current}
        onInit={onInit}
        plugins={[lgZoom, lgThumbnail]}
        closable={false}
        showMaximizeIcon={true}
        slideDelay={400}
        thumbWidth={130}
        thumbHeight={'100px'}
        thumbMargin={6}
        appendSubHtmlTo={'.lg-item'}
        dynamic={true}
        dynamicEl={[
          {
            src: 'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1542103749-8ef59b94f47e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@dann">Dan</a></h4>
                        <p>Published on November 13, 2018</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1473876988266-ca0860a443b8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@kylepyt">Kyle Peyton</a></h4>
                        <p>Published on September 14, 2016</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1588953936179-d2a4734c5490?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@jxnsartstudio">Garrett Jackson</a></h4>
                        <p>Published on May 8, 2020</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1591634616938-1dfa7ee2e617?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                        <p>Description of the slide 4</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1543059509-6d53dbee1728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1543059509-6d53dbee1728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1543059509-6d53dbee1728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1543059509-6d53dbee1728?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@charlespostiaux">Charles Postiaux</a></h4>
                        <p>Published on November 24, 2018</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1609902726285-00668009f004?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@bruno_adam">Bruno Adam</a></h4>
                        <p>Published on January 6, 2021</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1573007974656-b958089e9f7b?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@sigmund">Sigmund</a></h4>
                        <p>Published on November 6, 2019</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1579406842270-ea87c39a8a12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1579406842270-ea87c39a8a12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1579406842270-ea87c39a8a12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1579406842270-ea87c39a8a12?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@chow_parij">Parij Borgohain</a></h4>
                        <p>Published on January 19, 2020</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1598911543663-37d77962beb1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1598911543663-37d77962beb1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1598911543663-37d77962beb1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1598911543663-37d77962beb1?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@inespiazzese">Ines Piazzese</a></h4>
                        <p>Published on September 1, 2020</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1560885673-2cdc12600ec8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1560885673-2cdc12600ec8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1560885673-2cdc12600ec8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1560885673-2cdc12600ec8?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@rdsaunders">Richard Saunders</a></h4>
                        <p>Published on June 19, 2019</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1571292064306-669f0e758231?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@jalanmeier">J. Meier</a></h4>
                        <p>Published on October 17, 2019</p>
                    </div>`,
          },
          {
            src: 'https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1400&q=80',
            responsive:
              'https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=480&q=80 480, https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=800&q=80 800',
            thumb:
              'https://images.unsplash.com/photo-1601935111741-ae98b2b230b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=240&q=80',
            subHtml: `<div class="lightGallery-captions">
                        <h4>Photo by <a href="https://unsplash.com/@brookecagle">Brooke Cagle</a></h4>
                        <p>Published on October 6, 2020</p>
                    </div>`,
          },
        ]}
        hash={false}
        elementClassNames={'inline-gallery-container'}
      />
    </div> */}
    </>
  )
}

function MapPreview({ lat, lng }: { lat?: number, lng?: number }) {
  const maps = useMap()
  const placesLib = useMapsLibrary('places')
  const geo = useMapsLibrary('geocoding')

  const [placesService, setPlacesService] = useState<any>(null)

  useEffect(() => {
    if (!placesLib || !maps) return
    setPlacesService(new placesLib.PlacesService(maps))
  }, [placesLib, maps])
  useEffect(() => {
    if (!placesService) return
  }, [placesService])

  /* return (
    {maps && latitude && longitude ?
      <APIProvider apiKey={'AIzaSyC7-qOu2w1X3hRcrXicX5NFDf1EI6c7L_Q'}>
        <Map
          mapId={'bf51a910020fa25a'}
          defaultZoom={5}
          defaultCenter={{lat: 53, lng: 10}}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          zoom={12}
        >
          <Marker position={{lat: latitude, lng: longitude}} />
        </Map>
      </APIProvider> :
      <div className="flex flex-col items-center">
        <Loader className="animate-spin" />
        <span>loading map</span>
      </div>
    }
  ) */
  return (
    <APIProvider apiKey={'AIzaSyC7-qOu2w1X3hRcrXicX5NFDf1EI6c7L_Q'}>
      <Map
        mapId={'bf51a910020fa25a'}
        defaultZoom={12}
        defaultCenter={{ lat: 12.345, lng: 5.678 }}
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        {/* <AdvancedMarker position={{ lat: 7.0712, lng: 125.6089 }}></AdvancedMarker> */}
      </Map>
    </APIProvider>
  )
}