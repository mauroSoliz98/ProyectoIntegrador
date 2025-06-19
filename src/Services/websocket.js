// services/websocket.js
export const createWebSocketConnection = (path = '') => {
  // Determinar la URL base según el entorno
  let baseUrl;
  
  if (import.meta.env.PROD) {
    // En producción, usar wss:// para conexión segura
    baseUrl = import.meta.env.VITE_WEBSOCKET_PROD || 'wss://meaningful-laurella-maurosoliz98-6ca31c8e.koyeb.app/api/chat/ws';
  } else {
    // En desarrollo, usar ws:// para conexión local
    baseUrl = import.meta.env.VITE_WEBSOCKET_DEV || 'ws://localhost:8000/api/chat/ws';
  }

  // Si se proporciona un path adicional, agregarlo
  const socketUrl = path ? `${baseUrl}${path}` : baseUrl;
  
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