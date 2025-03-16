import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Coordenadas de Cochabamba
const COCHABAMBA_COORDS = [-17.3895, -66.1568];

// Iconos personalizados
const iconoInundacion = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/3075/3075857.png', // Icono de agua
  iconSize: [38, 38], // Tamaño del icono
  iconAnchor: [19, 38], // Punto de anclaje
  popupAnchor: [0, -38], // Posición del popup
});

const iconoDeslizamiento = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/619/619010.png', // Icono de deslizamiento
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const MapView = () => {
  return (
    <MapContainer
      center={COCHABAMBA_COORDS}
      zoom={13}
      className="w-full min-h-[300px] md:min-h-[500px]" 
    >
      {/* Capa de mapa (OpenStreetMap) */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© OpenStreetMap contributors'
      />

      {/* Marcador de inundación */}
      <Marker position={[-17.3895, -66.1568]} icon={iconoInundacion}>
        <Popup>¡Inundación reportada aquí!</Popup>
      </Marker>

      {/* Marcador de deslizamiento */}
      <Marker position={[-17.4000, -66.1600]} icon={iconoDeslizamiento}>
        <Popup>¡Deslizamiento reportado aquí!</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapView;