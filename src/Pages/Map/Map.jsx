import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Drawer, Card, Avatar, List, Typography } from 'antd';
import { MdLocationOn } from "react-icons/md";
import floodIcon from '../../assets/flood.png';
import landslideIcon from '../../assets/landslide.png';
const { Meta } = Card;
const { Text } = Typography;

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
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const data = [
    {
      title: 'Ant Design Title 1',
    },
    {
      title: 'Ant Design Title 2',
    },
    {
      title: 'Ant Design Title 3',
    },
    {
      title: 'Ant Design Title 4',
    },
  ];

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
        placement={`${!isMobile ? "right" : "bottom"}`}
        closable={false}
        onClose={handleCancel}
        open={isModalOpen}
        width="50%"
      >
        <Card cover={<div className="bg-[url(https://cdn.leonardo.ai/users/11fb33c1-1772-448f-bd6b-16e3e19e3b08/generations/ca678d30-7176-40d5-9c2c-a1e6eeebf94c/Leonardo_Phoenix_10_A_colorful_flat_design_illustration_of_the_2.jpg)] w-full h-40 bg-center" />}>
          <Meta
            title={<span className="flex items-center gap-1"><MdLocationOn /> Localización</span>}
            description="C/ España y Mexico"
          />
        </Card>
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />

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
          <Marker position={[-17.3895, -66.1568]} icon={iconoInundacion} eventHandlers={{ click: showModal }}>
            <Popup>¡Inundación reportada aquí!</Popup>
          </Marker>
        </Circle>

        {/* Marcador de deslizamiento */}
        <Circle center={[-17.4000, -66.1600]} radius={500} color="red">
          <Marker position={[-17.4000, -66.1600]} icon={iconoDeslizamiento} eventHandlers={{ click: showModal }}>
            <Popup>¡Deslizamiento reportado aquí!</Popup>
          </Marker>
        </Circle>
      </MapContainer>
    </>
  );
};

export default Map;