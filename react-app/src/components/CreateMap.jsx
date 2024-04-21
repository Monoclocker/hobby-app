import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {useFetching} from "../hooks/useFetching.js";
import RequestService from "../api/RequestService.js";
import {useNavigate} from "react-router-dom";

const MapComponent = () => {
    const navigate = useNavigate();
    const [currentPosition, setCurrentPosition] = useState([47.2364, 39.7139]);
    const [destination, setDestination] = useState([47.2364, 39.7139]); // Отдельная метка-цель
    const [markers, setMarkers] = useState([]);
    const [destinationPlacesList, setDestinationPlacesList] = useState([]);


    const [fetchData, isDataLoading, dataError] = useFetching(async () => {
        try {
            navigator.geolocation.getCurrentPosition(async position => {
                const newPos = [position.coords.latitude, position.coords.longitude];
                const response = await RequestService.saveCurrentCoords(newPos);
                console.log(response)
            })
            const response = await RequestService.getAllMapInfo();
            let resultMarkers = [{lat: response.data['coordinates'][0], lng: response.data['coordinates'][1]}];
            console.log(response)
            response.data['friends'].map((el) => {
                resultMarkers.push({lat: el['coordinates'][0], lng: el['coordinates'][1]});
            })
            let valuableDestinations = [];
            // in progress...
            response.data['places'].map((place) => {
                // valuableDestinations.push({lat: place.coordinates[1], lng: place.coordinates[0]});
                valuableDestinations = place.coordinates
                setDestinationPlacesList( [{name: place['name'], interests: place['interests']}])
            })
            valuableDestinations.reverse();
            console.log(destinationPlacesList, 123)

            setDestination(valuableDestinations)
            setMarkers(resultMarkers);
        } catch (e) {
            if (e.response.status === 401) {
                await RequestService.refreshToken();
                console.log(e)
            } else {
                console.log(e.response.status, 1243213421)
                // alert('Сервис временно недоступен :(')
                // navigate("/login");
            }
        }


    })

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(position => {
                const newPos = [position.coords.latitude, position.coords.longitude];
                setCurrentPosition(newPos);

            }, error => {
                console.error("Error Code = " + error.code + " - " + error.message);
            });
        }
        fetchData();
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
            <h2 className="text-center text-indigo-900 text-xl font-bold leading-10 text-gray-900">Время куда-нибудь сходить 💫</h2>
            <MapContainer center={currentPosition} zoom={13} style={{height: '400px', width: '100%', zIndex: 1, border: "none"}}>
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
            <div className="max-w-prose mx-auto p-6 my-8 backdrop-opacity-50 rounded-lg shadow-md shadow-indigo-500/50 overflow-hidden">
                    {destinationPlacesList.map(place =>
                        <div className="p-6">
                            <p className=" text-indigo-900 font-bold text-center p-4">Рекомендуем посетить "{place.name}"</p>
                            <p className=" text-indigo-900 font-bold text-center p-4">Место выбрано на основе совпавших интересов ({place.interests})</p>
                        </div>
                            )}
            </div>
        </div>
    );
};

export default MapComponent;