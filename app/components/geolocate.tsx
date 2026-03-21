'use client'

export default function Geolocate() {
  const successCb: PositionCallback = (positon: GeolocationPosition) => {
    console.log(positon)
  }
  const errorCb: PositionErrorCallback = (error: GeolocationPositionError) => {
    console.log(error)
  }
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(successCb, errorCb);
  }
  return <></>
}