import api from "./api/baseUrl";
const path = "/auth";

const create = async (data) => {
  try {
    const response = await api.post(`${path}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
const enter = async (data) => {
  try {
    const response = await api.post(`${path}/login`, data);
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}
export default {
  create: create,
  enter: enter
};