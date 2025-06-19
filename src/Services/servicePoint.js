import api from "./api/baseUrl";
const path = "/points";

const getAll = async() => {
    try {
        const response = await api.get(path);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
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
}

const eliminate = async(id) => {
    try {
        const response = await api.delete(`${path}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}

const update = async(id, data) => {
    try {
        const response = await api.put(`${path}/${id}`, data);
        return response.data;
    } catch (error) {
        console.error("Error updating data:", error);
        throw error;
    }
}

export default {
    getAll: getAll,
    create: create,
    eliminate: eliminate,
    update: update
}