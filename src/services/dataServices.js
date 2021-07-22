import axios from "axios";
import { API_URL } from "../utils/constants";

// product services
export const getAllProducts = async () => await axios(`${API_URL}/product`);

// cart services
export const getCart = async (userId) =>
  await axios(`${API_URL}/cart/${userId}`);

export const addToCart = async (userId, productId) =>
  await axios.post(`${API_URL}/cart/${userId}`, { productId });

export const updateCartQuantity = async (userId, productId, quantity) =>
  await axios.post(`${API_URL}/cart/${userId}/${productId}`, { quantity });

export const removeFromCart = async (userId, productId) =>
  await axios.delete(`${API_URL}/cart/${userId}/${productId}`);

export const moveToCart = async (userId, productId) => {
  const response = await removeFromWishlist(userId, productId);
  return response.status.success
    ? await addToCart(userId, productId)
    : response;
};

// wishlist services
export const getWishlist = async (userId) =>
  await axios(`${API_URL}/wishlist/${userId}`);

export const addToWishlist = async (userId, productId) =>
  await axios.post(`${API_URL}/wishlist/${userId}`, { productId });

export const removeFromWishlist = async (userId, productId) =>
  await axios.delete(`${API_URL}/wishlist/${userId}/${productId}`);

export const moveToWishlist = async (userId, productId) => {
  const response = await removeFromCart(userId, productId);
  return response.data.success
    ? await addToWishlist(userId, productId)
    : response;
};
