import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Drawer } from 'antd';
import { UserOutlined,TeamOutlined } from '@ant-design/icons';
import floodIcon from '../../assets/flood.png';
import landslideIcon from '../../assets/landslide.png';

// Coordenadas de Cochabamba
const COCHABAMBA_COORDS = [-17.3895, -66.1568];

// Iconos personalizados
const iconoInundacion = new L.Icon({
  iconUrl: floodIcon, // Icono de agua
  iconSize: [38, 38], // Tamaño del icono
  iconAnchor: [19, 38], // Punto de anclaje
  popupAnchor: [0, -38], // Posición del popup
});

const iconoDeslizamiento = new L.Icon({
  iconUrl: landslideIcon, // Icono de deslizamiento
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
});

const Map = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
     <Drawer
        title="Basic Drawer"
        placement={'right'}
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        width="50%"
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>

      <MapContainer
        center={COCHABAMBA_COORDS}
        zoom={13}
        className="w-full min-h-screen md:min-h-screen"
      >
        {/* Capa de mapa (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='© OpenStreetMap contributors'
        />
        {/* Marcador de inundación */}
        <Circle center={[-17.3895, -66.1568]} radius={500} color="blue">
          <Marker position={[-17.3895, -66.1568]} icon={iconoInundacion} eventHandlers={{ click: showModal}}>
            <Popup>¡Inundación reportada aquí!</Popup>
          </Marker>
        </Circle>

        {/* Marcador de deslizamiento */}
        <Circle center={[-17.4000, -66.1600]} radius={500} color="red">
          <Marker position={[-17.4000, -66.1600]} icon={iconoDeslizamiento}>
            <Popup>¡Deslizamiento reportado aquí!</Popup>
          </Marker>
        </Circle>
      </MapContainer>
    </>
  );
};

export default Map;