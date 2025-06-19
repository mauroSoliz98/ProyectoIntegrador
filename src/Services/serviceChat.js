import api from "./api/baseUrl";
const path = "api/chat/messages"; // Ajusta según tu entorno

const getAll = async(profileId) => {
    try {
        // Usa el endpoint que creamos antes para obtener mensajes por perfil
        const response = await api.get(`${path}/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Retornar array vacío en caso de error para evitar crashes
        return [];
    }
}

const create = async(data) => {
    try {
        const response = await api.post(path, data);
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}// Ajusta según tu entorno
/*
const socketConn = () => {
    const socket = `wss://${baseURL}/ws`;
    return new WebSocket(socket);
} // Cambié de "chats" a "chat"
*/
export default {
    getAll: getAll,
    create: create,
}