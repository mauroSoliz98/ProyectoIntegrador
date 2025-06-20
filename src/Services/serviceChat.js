// serviceChat.js (corregido)
import api from "./api/baseUrl";
import { createWebSocketConnection } from "./websocket";

const path = "/chat/messages";

const getAll = async (profileId) => {
  try {
    const response = await api.get(`${path}/${profileId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
}

const create = async (data) => {
  try {
    const response = await api.post(path, data);
    return response.data;
  } catch (error) {
    console.error("Error creating message:", error);
    throw error;
  }
}

// Función específica para el WebSocket de chat (corregida)
export const createChatSocket = (profileId) => {
  // Crear conexión WebSocket (ya incluye el path /api/chat/ws)
  const socket = createWebSocketConnection();
  
  // Configurar manejadores de eventos
  socket.onopen = () => {
    console.log(`Conexión WebSocket establecida para usuario: ${profileId}`);
  };
  
  socket.onerror = (error) => {
    console.error('Error en WebSocket de chat:', error);
  };
  
  socket.onclose = (event) => {
    console.log('WebSocket de chat cerrado:', event.code, event.reason);
  };
  
  return socket;
}

export default {
  getAll,
  create,
  createChatSocket
}