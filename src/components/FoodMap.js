"use client";

import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '350px',
  borderRadius: '0.75rem'
};

const defaultCenter = { lat: 23.794, lng: 90.412 };

export default function FoodMap({ foods }) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  });

  const getMagicCoordinates = (index, totalItems, baseLat, baseLng) => {
    const radius = 0.02;
    const angle = (index / totalItems) * Math.PI * 2; 
    return { 
      lat: baseLat + (radius * Math.cos(angle)), 
      lng: baseLng + (radius * Math.sin(angle)) 
    };
  };

  if (!isLoaded) return <p>Loading map...</p>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={defaultCenter} zoom={13}>
      {foods.map((item, index) => {
        if (item.quantity <= 0) return null;

        const position = getMagicCoordinates(index, foods.length, defaultCenter.lat, defaultCenter.lng);

        return (
          <Marker 
            key={item._id} 
            position={position} 
            title={item.name}
          />
        );
      })}
    </GoogleMap>
  );
}
