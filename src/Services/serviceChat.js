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
  const socket = createWebSocketConnection();
  
  // Cuando se abre la conexión, enviamos el profileId para unirse al chat
  socket.onopen = () => {
    console.log('Conexión WebSocket establecida para chat');
    socket.send(JSON.stringify({
      type: "join",
      profileId: profileId
    }));
  };
  
  return socket;
}

export default {
  getAll,
  create,
  createChatSocket
}