import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
  baseURL: "http://192.168.137.67:5000",
});

export const login = async (data) => {
  try {
    const resp = await api.post("/api/users/login", data);
    return resp;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};

export const fetchUserEV = async () => {
  try {
    const email = await AsyncStorage.getItem("email");
    if (!email) {
      throw new Error("Email not found in AsyncStorage");
    }
    const resp = await api.get(`/api/users/${email}/vehicles`);
    return resp;
  } catch (error) {
    console.error("Failed to fetch user EV:", error);
    throw error;
  }
};

export const changeUserEV = async (data) => {
  try {
    const email = await AsyncStorage.getItem("email");
    if (!email) {
      throw new Error("Email not found in AsyncStorage");
    }
    const resp = await api.post(`/api/users/${email}/vehicles`, data);
    return resp;
  } catch (error) {
    console.error("Failed to change user EV:", error);
    throw error;
  }
};

export const getAllEvs = async () => {
  try {
    const resp = await api.get("/api/ev-stations");
    return resp;
  } catch (error) {
    console.error("Failed to fetch all EVs:", error);
    throw error;
  }
};

export const getStationById = async (id) => {
  try {
    const resp = await api.get(`/api/ev-stations/${id}`);
    return resp;
  } catch (error) {
    console.error("Failed to fetch station by ID:", error);
    throw error;
  }
};

export const getAllLeisureSpots = async () => {
  try {
    const resp = await api.get("/api/leisure-spots");
    return resp;
  } catch (error) {
    console.error("Failed to fetch all Leisure Spots:", error);
    throw error;
  }
};



