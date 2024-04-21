import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const MapComponent = () => {
    const [currentPosition, setCurrentPosition] = useState([51.505, -0.09]);
    const [destination, setDestination] = useState([51.515, -0.1]); // Отдельная метка-цель
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const newPos = [position.coords.latitude, position.coords.longitude];
                setCurrentPosition(newPos);
            }, error => {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
        }
    }, []);

    const AddMarker = () => {
        useMapEvents({
            click: (e) => {
                const newMarker = e.latlng;
                setMarkers(markers => [...markers, newMarker]);
            }
        });
        return null;
    };

    const handleMarkerClick = (index) => {
        setMarkers(markers => markers.filter((_, i) => i !== index));
    };

    const RoutingMachine = () => {
        const map = useMap();
        useEffect(() => {
            markers.forEach((marker, index) => {
                const routeControl = L.Routing.control({
                    waypoints: [
                        L.latLng(marker.lat, marker.lng),
                        L.latLng(destination[0], destination[1])
                    ],
                    lineOptions: {
                        styles: [{ color: `#${Math.floor(Math.random()*16777215).toString(16)}`, opacity: 0.75, weight: 5 }]
                    },
                    addWaypoints: false,
                    draggableWaypoints: false,
                    fitSelectedRoutes: false,
                    show: false
                }).addTo(map);

                return () => {
                    map.removeControl(routeControl);
                };
            });
        }, [map, markers, destination]);

        return null;
    };

    return (
        <div>
            <h1>Click map to add markers, click marker to remove, routes to one destination!</h1>
            <MapContainer center={currentPosition} zoom={13} style={{ height: '400px', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {markers.map((marker, idx) =>
                    <Marker key={idx} position={marker} eventHandlers={{
                        click: () => handleMarkerClick(idx),
                    }}>
                        <Popup>A click on this popup will remove the marker!</Popup>
                    </Marker>
                )}
                <Marker position={destination}>
                    <Popup>This is the destination!</Popup>
                </Marker>
                <AddMarker />
                <RoutingMachine />
            </MapContainer>
        </div>
    );
};

export default MapComponent;