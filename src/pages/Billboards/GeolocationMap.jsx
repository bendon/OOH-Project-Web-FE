import React, { useEffect, useState } from 'react'
import { APIProvider, Map, AdvancedMarker, InfoWindow, useAdvancedMarkerRef } from '@vis.gl/react-google-maps';
import { ClipboardCheck } from 'lucide-react';
import { Link } from 'react-router';
import { convertToHumanReadable, getBillBoards, getFileStream } from '../../data/lib';
import BillboardLogo from '../../assets/billboard.png'
import { ShimmerThumbnail } from "react-shimmer-effects";

export default function GeolocationMap() {
    const [billboards, setBillboards] = useState(null)
    const [locations, setLocations] = useState([{ key: 'operaHouse', location: { lat: -33.8567844, lng: 151.213108 } }])
    const [center, setCenter] = useState({ lat: -1.2647263, lng: 36.80201 });
    const [selectedBillboard, setSelectedBillboard] = useState(null);;

    useEffect(() => {
        const fetchBillboards = async () => {
            const res = await getBillBoards()
            if (res.status === 200) {
                setBillboards(res.data)

            }
        }
        fetchBillboards()
    }, [])

    useEffect(() => {
        mapUpdateLocation()
    }, [billboards])

    const mapUpdateLocation = () => {
        setTimeout(() => {
            if (billboards !== null && billboards.data.length > 0) {
                setCenter({ lat: billboards.data[0].latitude, lng: billboards.data[0].longitude })

                const locations = billboards.data.map(billboard => {
                    return {
                        location: {
                            lat: billboard.latitude,
                            lng: billboard.longitude
                        },
                        key: billboard.id,
                        title: billboard.boardCode,
                        more: billboard
                    }
                })
                setLocations(locations)
            }
        }, 3000)

    }

    const handleSelectedBillboard = async (billboard) => {
        setSelectedBillboard(null)
        setSelectedBillboard(billboard)
    }

    useEffect(() => {
        const fetchBillboardImage = async () => {
            if (selectedBillboard !== null && !selectedBillboard.image) {
                const res = await getFileStream(selectedBillboard.more.image.fileName)
                if (res.status === 200) {
                    setSelectedBillboard({ ...selectedBillboard, image: res.data })
                }
            }
        }
        fetchBillboardImage()
    }, [selectedBillboard])

    const handleMapLoaded = () => {
        console.log("map loaded")
    }

    //{ lat: -1.2647263, lng: 36.80201 }
    return (
        <>
            <div className='d-flex justify-content-between'>
                <h4>Billboard Location</h4>
                <div>
                    <Link to="/manage-boards" className='btn btn-outline-primary' style={{ fontSize: '12px' }}><ClipboardCheck size={15} /> Billboard Management</Link>
                </div>
            </div>
            <hr />
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAP_KEY} onLoad={() => handleMapLoaded()}>
                <Map
                    defaultZoom={13}
                    defaultCenter={center}
                    mapId={import.meta.env.VITE_GOOGLE_MAP_ID}
                    className="map-container"
                >,
             
                    {locations.map((loc) => (
                        <AdvancedMarker
                            key={loc.key}
                            position={loc.location}
                            title={loc.title} // Shows the key as a tooltip on hover
                            onClick={() => handleSelectedBillboard(loc)}
                        >
                            <img src={BillboardLogo} width={40} height={40} alt="Custom Marker" />
                        </AdvancedMarker>
                    ))}

                    {selectedBillboard && (
                        <InfoWindow
                            position={selectedBillboard.location}
                            onCloseClick={() => setSelectedBillboard(null)}
                            options={{
                                pixelOffset: new window.google.maps.Size(0, -20), // 🔼 Pushes the InfoWindow up by 10px
                              }}
                        >
                            <div className="p-2">
                                <h6 className="text-lg font-semibold">BillBoard Code : {selectedBillboard.title}</h6>
                                { selectedBillboard.image ?<img className='mb-2' src={selectedBillboard.image} width={'100%'} height={200} alt="Custom Marker" /> : <> <ShimmerThumbnail  height={200} width={'100%'} /></>}
                                
                                <p style={{lineHeight: '5px'}}>This is bill boards in westlands</p>
                                <p className="text-sm text-gray-600" style={{lineHeight: '5px'}}>
                                    <strong>Price:</strong> {selectedBillboard.more.price}
                                </p>
                                <p className="text-sm text-gray-600" style={{lineHeight: '5px'}}>
                                    <strong>Occupied:</strong> <span className="badge text-bg-danger">Not Occupied</span>
                                </p>
                                <div className='d-flex justify-content-between'>
                                {selectedBillboard.more.active ? <span className="badge text-bg-success">Active</span> : <span className="badge text-bg-danger">Inactive</span>}
                                {convertToHumanReadable(selectedBillboard.more.createdAt)}
                                </div>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
        </>
    )
}
