// services/websocket.js
export const createWebSocketConnection = (path = '') => {
  // Determinar la URL base según el entorno
  const baseUrl = import.meta.env.PROD
    ? import.meta.env.VITE_WEBSOCKET_PROD
    : import.meta.env.VITE_WEBSOCKET_DEV;

  // Construir la URL completa
  const socketUrl = `${baseUrl}${path}`;
  
  // Crear la conexión WebSocket
  const socket = new WebSocket(socketUrl);
  
  // Manejar errores
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  return socket;
};

export const sendWebSocketMessage = (socket, message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket not connected. Ready state:', socket.readyState);
  }
};