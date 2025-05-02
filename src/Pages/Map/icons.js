import floodIcon from "../../assets/icons/flood.png"
import landslideIcon from "../../assets/icons/landslide.png"
import fireIcon from "../../assets/icons/fire.png" // Asumiendo que tienes un icono para incendios

// Iconos personalizados
const iconoInundacion = new L.Icon({
  iconUrl: floodIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

const iconoDeslizamiento = new L.Icon({
  iconUrl: landslideIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

const iconoIncendio = new L.Icon({
  iconUrl: fireIcon,
  iconSize: [38, 38],
  iconAnchor: [19, 38],
  popupAnchor: [0, -38],
})

export default {
  iconoInundacion: iconoInundacion,
  iconoDeslizamiento: iconoDeslizamiento,
  iconoIncendio: iconoIncendio,
}