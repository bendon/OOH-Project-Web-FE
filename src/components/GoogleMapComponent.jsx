import {  useJsApiLoader } from '@react-google-maps/api';
import React, { useEffect, useRef } from 'react'

export default function GoogleMapComponent() {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const containerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 40.7128, // Example: New York
    lng: -74.0060,
  };

  const { isLoaded } = useJsApiLoader({
    mapIds: ["c06f15fd2a7aec4e"],
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAP_KEY, // Replace with your API key
    libraries: ["marker"],
  });

  useEffect(() => {
    if (isLoaded && !mapRef.current) {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center,
        zoom: 10,
      });

      mapRef.current = map;

      // Use AdvancedMarkerElement instead of Marker
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: center,
        map: map,
        title: "New York",
      });

      markerRef.current = marker;
    }
  }, [isLoaded]);

  return (
    <>
    <div id="map" style={containerStyle}></div>
    </>
  )
}
