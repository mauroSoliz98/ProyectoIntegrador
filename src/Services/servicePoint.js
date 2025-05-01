import axios from "axios";
const baseURL = "http://localhost:8000/api/points";

const getAll = async() => {
    try {
        const response = await axios.get(baseURL);
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

const create = async(data) => {
    try {
        const response = await axios.post(baseURL, data);
        return response.data;
    } catch (error) {
        console.error("Error creating data:", error);
        throw error;
    }
}

const eliminate = async(id) => {
    try {
        const response = await axios.delete(`${baseURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
    }
}

const update = async(id, data) => {
    try {
        const response = await axios.put(`${baseURL}/${id}`, data);
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