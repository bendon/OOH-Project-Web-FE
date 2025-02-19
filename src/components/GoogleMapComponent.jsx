
import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps';

export default function GoogleMapComponent() {
 

  return (
    <>
      <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
            defaultZoom={13}
            defaultCenter={{ lat: -1.2647263, lng: 36.80201 }}
            mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
            style={{ height: '400px' }}
        >
        </Map>
      </APIProvider>
    </>
  )
}
