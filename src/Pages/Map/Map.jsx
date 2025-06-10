import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle, useMapEvent } from "react-leaflet"
import { Drawer, Card, Button, Popconfirm} from "antd"
import {toast} from "react-toastify"
import { MdLocationOn, MdDelete } from "react-icons/md"
import { MapForm } from "./MapForm"
import servicePoint from "../../Services/servicePoint"
import icons from "./icons"
const { Meta } = Card

// Coordenadas de Cochabamba
const COCHABAMBA_COORDS = [-17.3895, -66.1568]

// Función para obtener el icono según el tipo de desastre
const getIconByType = (type) => {
  switch (type.toLowerCase()) {
    case "inundacion":
    case "inundación":
      return icons.iconoInundacion
    case "deslizamiento":
      return icons.iconoDeslizamiento
    case "incendio":
      return icons.iconoIncendio
    default:
      return icons.iconoInundacion
  }
}

// Función para obtener el color según la severidad
const getColorBySeverity = (severity) => {
  switch (severity.toLowerCase()) {
    case "alto":
      return "red"
    case "medio":
      return "orange"
    case "bajo":
      return "blue"
    default:
      return "blue"
  }
}

const EventClick = ({ onClick }) => {
  useMapEvent({
    click: (e) => {
      onClick(e.latlng)
    },
  })
  return null
}

const Map = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(false) 
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [events, setEvents] = useState([])
  const [selectedPosition, setSelectedPosition] = useState(null)
  const [newEvent, setNewEvent] = useState({
    description: "",
    latitude: 0,
    longitude: 0,
    disaster_type: "Incendio", // Valor exacto como en el JSON
    severity: "alto",
    address: "",
    created_by_profile_id: "c7e47687-9c23-4af2-b8a2-ed32e836f4ac", // UUID por defecto como en el JSON
  })

  useEffect(() => {
    getAllEvents()

    // Manejar cambios de tamaño de ventana
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const getAllEvents = async () => {
    try {
      const response = await servicePoint.getAll()
      setEvents(response)
    } catch (error) {
      console.error("Error fetching events:", error)
      toast.error("⚠ Error al cargar eventos", {
              theme: "light",
          });
    }
  }

  const handleCreate = async () => {
    if (!selectedPosition) {
       toast.error("⚠ Por favor, seleccione una ubicacion en el mapa", {
              theme: "light",
          });
      return
    }

    if (!newEvent.description || !newEvent.address) {
       toast.error("⚠ Por favor, complete todos los datos requeridos del formulario", {
              theme: "light",
          });
      return
    }

    try {
      // Crear el objeto exactamente como lo espera el backend
      const eventData = {
        description: newEvent.description,
        latitude: selectedPosition.lat,
        longitude: selectedPosition.lng,
        disaster_type: newEvent.disaster_type,
        severity: newEvent.severity,
        address: newEvent.address,
        created_by_profile_id: newEvent.created_by_profile_id,
      }

      console.log("Enviando datos al backend:", eventData)

      // Llamar al servicio para crear el punto
      const response = await servicePoint.create(eventData)
      console.log("Respuesta del backend:", response)

      // Añadir el nuevo evento a la lista con los datos de la respuesta
      // Verificar que events sea un array antes de usar el operador spread
      setEvents((prevEvents) => {
        // Si prevEvents es null o undefined, inicializar como array vacío
        const currentEvents = Array.isArray(prevEvents) ? prevEvents : []
        return [...currentEvents, response]
      })

      // Limpiar el formulario y cerrar el modal
      setNewEvent({
        description: "",
        latitude: 0,
        longitude: 0,
        disaster_type: "Incendio",
        severity: "alto",
        address: "",
        created_by_profile_id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      })
      setSelectedPosition(null)
      setIsModalOpen(false)

      toast.success("Punto de interés añadido exitosamente", {
              theme: "light",
              position: "bottom-right",
          });
    } catch (error) {
      console.error("Error creating event:", error)
      toast.error("Error al crear el punto de interés", {theme: "light", position: "bottom-right"})
    }
  }
  
  const handleDelete = async (id) => {
    if (!id) {
      toast.error("ID de evento no válido", { theme: "light", position: "bottom-right" })
      return
    }

    try {
      setLoading(true)
      console.log("Eliminando evento con ID:", id)

      // Usar eliminate en lugar de delete (que no existe en el servicio)
      await servicePoint.eliminate(id)

      // Actualizar la lista de eventos eliminando el evento con el ID correspondiente
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id))

      toast.success("Punto de interés eliminado exitosamente", {
        theme: "light",
        position: "bottom-right",
      })
    } catch (error) {
      console.error("Error deleting event:", error)
      toast.error("Error al eliminar el evento", { theme: "light", position: "bottom-right" })
    } finally {
      setLoading(false)
    }
  }

  const handleMapClick = (position) => {
    setSelectedPosition(position)
    // Actualizar las coordenadas en el estado del nuevo evento
    setNewEvent((prev) => ({
      ...prev,
      latitude: position.lat,
      longitude: position.lng,
    }))
    setIsModalOpen(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
    setSelectedPosition(null)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNewEvent({ ...newEvent, [name]: value })
  }

  // Función para manejar cambios en los Select de Ant Design
  const handleSelectChange = (value, name) => {
    setNewEvent({ ...newEvent, [name]: value })
  }

  return (
    <>
      <Drawer
        title="Añadir punto de interés"
        placement={isMobile ? "bottom" : "right"}
        closable={true}
        onClose={handleCancel}
        open={isModalOpen}
        width={isMobile ? "100%" : "400px"}
        height={isMobile ? "80%" : "100%"}
        extra={
          <div className="flex gap-2">
            <Button onClick={handleCancel}>Cancelar</Button>
            <Button type="primary" onClick={handleCreate}>
              Guardar
            </Button>
          </div>
        }
      >
        {selectedPosition && (
          <Card
            data-testid="location-card"
            className="mb-4"
            cover={
              <div className="bg-[url(https://cdn.leonardo.ai/users/11fb33c1-1772-448f-bd6b-16e3e19e3b08/generations/ca678d30-7176-40d5-9c2c-a1e6eeebf94c/Leonardo_Phoenix_10_A_colorful_flat_design_illustration_of_the_2.jpg)] w-full h-40 bg-center bg-cover" />
            }
          >
            <Meta
              title={
                <span className="flex items-center gap-1">
                  <MdLocationOn /> Localización
                </span>
              }
              description={`Lat: ${selectedPosition.lat.toFixed(6)}, Lng: ${selectedPosition.lng.toFixed(6)}`}
            />
          </Card>
        )}
        <MapForm newEvent={newEvent} handleChange={handleChange} handleSelectChange={handleSelectChange} />
      </Drawer>

      <MapContainer center={COCHABAMBA_COORDS} zoom={13} className="w-full min-h-screen md:min-h-screen">
        {/* Capa de mapa (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="© OpenStreetMap contributors"
        />

        {/* Renderizar eventos existentes */}
        {events &&
          events.map((event, index) => (
            <Circle
              key={event.id || index}
              center={[event.latitude, event.longitude]}
              radius={500}
              color={getColorBySeverity(event.severity)}
            >
              <Marker position={[event.latitude, event.longitude]} icon={getIconByType(event.disaster_type)}>
              <Popup>
                  <div className="flex flex-col gap-2">
                    <h3 className="text-lg font-bold">{event.disaster_type || "Tipo desconocido"}</h3>
                    <p>
                      <strong>Severidad:</strong> {event.severity || "No especificada"}
                    </p>
                    <p>
                      <strong>Dirección:</strong> {event.address || "No especificada"}
                    </p>
                    <p>{event.description || "Sin descripción"}</p>

                    {/* Botón para eliminar el punto */}
                    <div className="flex justify-end mt-2">
                      <Popconfirm
                        title="Eliminar punto"
                        description="¿Estás seguro de que deseas eliminar este punto?"
                        onConfirm={() => handleDelete(event.id)}
                        okText="Sí"
                        cancelText="No"
                      >
                        <Button danger type="primary" icon={<MdDelete />} loading={loading}>
                          Eliminar
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </Popup>
              </Marker>
            </Circle>
          ))}

        {/* Capturar clics en el mapa */}
        <EventClick onClick={handleMapClick} />
      </MapContainer>
    </>
  )
}

export default Map
