import { API_URL } from "../utils/constants";
import axios from "axios";

export const signup = async (user) =>
  await axios.post(`${API_URL}/signup`, { user });

export const login = async (user) =>
  await axios.post(`${API_URL}/login`, { user });
