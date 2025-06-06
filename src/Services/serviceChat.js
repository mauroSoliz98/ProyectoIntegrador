import axios from "axios";
const baseURL = "/api/chat"; // Cambié de "chats" a "chat"

const getAll = async(profileId) => {
    try {
        // Usa el endpoint que creamos antes para obtener mensajes por perfil
        const response = await axios.get(`${baseURL}/messages/${profileId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        // Retornar array vacío en caso de error para evitar crashes
        return [];
    }
}

const create = async(data) => {
    try {
        const response = await axios.post(`${baseURL}/messages`, data);
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}// Ajusta según tu entorno

const socketConn = () => {
    const response = new WebSocket(`ws:${baseURL}/ws`);
    return response
} // Cambié de "chats" a "chat"

export default {
    getAll: getAll,
    create: create,
    socketConn: socketConn
}