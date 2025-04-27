import mongoose from "mongoose";

// Cart Item Schema, Defines individual products inside the cart
const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId, // Reference to a Product
    ref: "Product",
    required: true,
  },
  title: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  thumbnail: { type: String, required: true }, 
  quantity: { type: Number, required: true, default: 1 },
});

// Main Cart Schema
const cartSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Each cart is linked to a User
    items: [cartItemSchema], // An array of cart items
    totalAmount: { type: Number, default: 0 }, // Total cost of all items
    createdAt: { type: Date, default: Date.now }, // When cart was created
    updatedAt: { type: Date, default: Date.now }, // When cart was last updated
  },
  {
    versionKey: false, // Prevent Mongoose from adding __v version field
  }
);

// Method to update total cart amount based on current items
cartSchema.methods.updateTotalAmount = function () {
  // Calculate total by summing (price × quantity) for each item
  this.totalAmount = this.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Save updated cart to database
  return this.save();
};

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
