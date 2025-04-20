import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

// Configure the Redux store
const store = configureStore({
  reducer: {
    //Add the cart slice reducer 
    cart: cartReducer,
  },
});

export default store;
