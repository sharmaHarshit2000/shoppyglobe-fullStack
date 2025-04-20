import axios from "../utils/axiosInstance";

export const updateCartItemApi = async (itemId, newQuantity) => {
  const token = localStorage.getItem('token');
  const response = await axios.put(
    `http://localhost:5000/api/cart/${itemId}`,
    { quantity: newQuantity },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};

export const removeCartItemApi = async (itemId) => {
  const token = localStorage.getItem('token');
  const response = await axios.delete(
    `http://localhost:5000/api/cart/${itemId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  return response.data;
};
