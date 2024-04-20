import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        setCurrentPosition([position.coords.latitude, position.coords.longitude]);
      }, error => {
        console.error("Error Code = " + error.code + " - " + error.message);
        // Fallback to a default position if error
        setCurrentPosition([51.505, -0.09]);
      });
    }
  }, []);

  return (
    <div>
      <h1>Find Me on the Map!</h1>
      {currentPosition ? (
        <MapContainer center={currentPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={currentPosition}>
            <Popup>You are here!</Popup>
          </Marker>
        </MapContainer>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default MapComponent;