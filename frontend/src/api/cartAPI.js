import axios from "../utils/axiosInstance";

// Function to update a cart item's quantity
export const updateCartItemApi = async (itemId, newQuantity) => {
  // Get the saved token from localStorage 
  const token = localStorage.getItem('token');

  // Make a PUT request to update the quantity of a specific cart item
  const response = await axios.put(
    `http://localhost:5000/api/cart/${itemId}`, // Endpoint URL with itemId
    { quantity: newQuantity }, // Request body is sending the new quantity
    {
      headers: { Authorization: `Bearer ${token}` }, // Sending token in Authorization header (Bearer Token)
    }
  );

  // Return only the data part of the response 
  return response.data;
};

// Function to remove an item from the cart
export const removeCartItemApi = async (itemId) => {
  // Get the saved token from localStorage to authenticate the request
  const token = localStorage.getItem('token');

  // Make a DELETE request to remove the specific cart item
  const response = await axios.delete(
    `http://localhost:5000/api/cart/${itemId}`, // Endpoint URL with itemId
    {
      headers: { Authorization: `Bearer ${token}` }, // Sending token in Authorization header (Bearer Token)
    }
  );

  // Return only the data part of the response
  return response.data;
};
