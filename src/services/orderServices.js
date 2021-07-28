import axios from "axios";
import { API_URL } from "../utils/constants";

export const getOrderId = async (amount) =>
  await axios.post(`${API_URL}/order`, { amount });

export const isOrderComplete = async (response) =>
  await axios.post(`${API_URL}/order/verification`, { response });
