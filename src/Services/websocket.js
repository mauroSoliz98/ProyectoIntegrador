// services/websocket.js (corregido)
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

  // Las URLs ya incluyen el path completo (/api/chat/ws)
  // Solo agregamos path adicional si se proporciona
  if (path && !socketUrl.includes(path)) {
    socketUrl = socketUrl + path;
  }
  
  console.log('Conectando WebSocket a:', socketUrl);
  
  // Crear la conexión WebSocket
  const socket = new WebSocket(socketUrl);
  
  // Manejar errores con más detalle
  socket.onerror = (error) => {
    console.error('WebSocket error:', error);
  };
  
  socket.onopen = (event) => {
    console.log('WebSocket conectado exitosamente');
  };
  
  socket.onclose = (event) => {
    console.log('WebSocket cerrado:', {
      code: event.code,
      reason: event.reason,
      wasClean: event.wasClean
    });
  };
  
  return socket;
};

export const sendWebSocketMessage = (socket, message) => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
    return true;
  } else {
    console.error('WebSocket not connected. Ready state:', socket.readyState);
    return false;
  }
};