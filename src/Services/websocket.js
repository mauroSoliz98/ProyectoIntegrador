// services/websocket.js
export const createWebSocketConnection = (path = '') => {
  // Determinar la URL base según el entorno
  let socketUrl;
  
  if (import.meta.env.PROD) {
    // En producción, usar wss:// para conexión segura
    socketUrl = import.meta.env.VITE_WEBSOCKET_PROD;
  } else {
    // En desarrollo, usar ws:// para conexión local
    socketUrl = import.meta.env.VITE_WEBSOCKET_DEV;
  }

  // Si se proporciona un path adicional, agregarlo (aunque no lo usaremos por ahora)
  if (path) {
    socketUrl = socketUrl + path;
  }
  
  console.log('Conectando WebSocket a:', socketUrl); // Para debug
  
  // Crear la conexión WebSocket
  const socket = new WebSocket(socketUrl);
  
  // Manejar errores
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onclose = (event) => {
    console.log('WebSocket cerrado:', event.code, event.reason);
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