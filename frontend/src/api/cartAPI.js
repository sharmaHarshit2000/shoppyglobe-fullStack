import axiosAuth from "../utils/axiosAuth";

export const updateCartItemApi = async (itemId, newQuantity) => {
  try {
    const res = await axiosAuth.put(`/cart/${itemId}`, { quantity: newQuantity });
    return res.data;
  } catch (err) {
    throw new Error("Failed to update cart item");
  }
};


export const removeCartItemApi = async (itemId) => {
  const response = await axiosAuth.delete(`/cart/${itemId}`);
  return response.data;
};