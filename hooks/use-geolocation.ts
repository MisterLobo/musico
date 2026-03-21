import { useCallback, useState } from 'react'

export function useGeoLocation() {
  const [latitude, setLatitude] = useState<number | undefined>()
  const [longitude, setLongitude] = useState<number | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const successCb: PositionCallback = useCallback((position: GeolocationPosition) => {
    setLatitude(position.coords.latitude)
    setLongitude(position.coords.longitude)
    setLoading(false)
  }, [])
  const errorCb: PositionErrorCallback = useCallback((error: GeolocationPositionError) => {
    console.error(error)
    setError(true)
  }, [])

  const getLatLng = () => {
    if ('geolocation' in navigator) {
      setLoading(true)
      navigator.geolocation.getCurrentPosition(successCb, errorCb)
    }
  }

  return {
    latitude,
    longitude,
    error,
    getLatLng,
    loading,
  }
}