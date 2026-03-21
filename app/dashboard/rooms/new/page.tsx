'use client'

import { SiteHeader } from '@/components/site-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { createNewRoom } from '@/lib/actions'
import { useRouter } from 'next/navigation'

type RoomFormSchema = {
  name: string,
  description: string,
  base_price: number,
}

export default function Page() {
  const router = useRouter()
  const {
    handleSubmit,
    setValue,
    getValues,
    setError,
    formState: { errors },
    control,
  } = useForm<RoomFormSchema>({
    defaultValues: {
      name: '',
      description: '',
      base_price: 0.0,
    },
  })
  const onSubmit: SubmitHandler<RoomFormSchema> = async (data) => {
    console.log(data)
    const { room } = await createNewRoom({
      name: data.name,
      description: data.description,
      base_price: data.base_price,
    })
    console.log(room)
    router.push('/dashboard/rooms')
  }

  return (
    <>
    <SiteHeader title="New Room" />
    <div className="flex flex-col max-w-5xl justify-center w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="@container/main flex flex-1 flex-col gap-2 m-4">
        <h1 className="text-xl uppercase">{getValues('name') ?? 'New Room'}</h1>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input type="text" id="name" placeholder="Studio Name" {...field} />}
        />
        {errors.name?.type === 'required' && (
          <p role="alert" className="text-xs text-red-500">Name is required</p>
        )}
        <h6 className="text-xl">Description</h6>
        <Controller
          name="description"
          control={control}
          render={({ field }) => <textarea rows={10} className="border rounded-lg" placeholder="Add a description for this studio" {...field} />}
        />
        <Separator />
        <h6>Price per hour</h6>
        <Controller
          name="base_price"
          control={control}
          rules={{ required: true }}
          render={({ field }) => <Input {...field} type="number" min={0.0} />}
        />
        <Button className="cursor-pointer">Save changes</Button>
      </form>
    </div>
    </>
  )
}