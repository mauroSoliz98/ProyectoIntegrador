// serviceChat.js
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

// Función específica para el WebSocket de chat
export const createChatSocket = (profileId) => {
  // Crear conexión WebSocket sin path adicional ya que está en baseUrl
  const socket = createWebSocketConnection();
  
  // Cuando se abre la conexión, no necesitamos enviar un "join" según tu backend actual
  socket.onopen = () => {
    console.log('Conexión WebSocket establecida para chat');
    // Tu backend actual no maneja mensajes de tipo "join", así que comentamos esto
    // socket.send(JSON.stringify({
    //   type: "join",
    //   profile_id: profileId
    // }));
  };
  
  return socket;
}

export default {
  getAll,
  create,
  createChatSocket
}