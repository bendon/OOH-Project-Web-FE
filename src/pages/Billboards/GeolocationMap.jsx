import React from 'react'
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router';

export default function GeolocationMap() {
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Billboard Location</h4>
                <div>
                    <Link to="/manage-boards" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY} onLoad={() => console.log('Maps API has loaded.')}>
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: -1.2647263, lng: 36.80201 }}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                    className="map-container"
                >
                </Map>
            </APIProvider>
        </>
    )
}
