import axios from "axios";
const baseURL = "http://localhost:8000/api/auth";

const create = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/register`, data);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}
const enter = async (data) => {
  try {
    const response = await axios.post(`${baseURL}/login`, data);
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