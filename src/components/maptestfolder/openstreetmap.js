import { useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, useLeafletContext } from 'react-leaflet';
import * as L from "leaflet"
import 'leaflet-routing-machine';
//import 'leaflet/dist/leaflet.css';
//import './openstreetmap.css'


const MapWithRoute = ({ startAddress, endAddress, language }) => {
    const map = useMap();
  
    useEffect(() => {
      const getRoute = async () => {
        const startResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${startAddress}&limit=1`);
        const startData = await startResponse.json();
        const startCoords = [startData[0].lat, startData[0].lon];
  
        const endResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${endAddress}&limit=1`);
        const endData = await endResponse.json();
        const endCoords = [endData[0].lat, endData[0].lon];
  
        map.flyTo(startCoords, 12);
  
        L.Routing.control({
          waypoints: [
            L.latLng(startCoords),
            L.latLng(endCoords),
          ],
          language: language,
        }).addTo(map);
      };
  
      getRoute();
    }, [startAddress, endAddress, language, map]);
  
    return null;
  };
  
  const OpenStreetMap = () => {
    return (
      <MapContainer center={[37.7749, -122.4194]} zoom={12} style={{ width: '100%', height: '400px' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MapWithRoute startAddress="서울역" endAddress="강남역" language="fr" />
      </MapContainer>
    );
  };
  
  export default OpenStreetMap;