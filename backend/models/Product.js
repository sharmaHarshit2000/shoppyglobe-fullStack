import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true }, 
    category: { type: String, required: true }, 
    price: { type: Number, required: true }, 
    discountPercentage: { type: Number, default: 0 }, 
    rating: { type: Number, min: 0, max: 5, default: 0 }, // Average rating (0-5)
    stock: { type: Number, required: true }, 
    tags: { type: [String], default: [] },
    brand: { type: String, required: true }, 
    sku: { type: String, required: true, unique: true }, 

    weight: { type: Number, required: true },
    dimensions: {
      width: { type: Number, required: true },
      height: { type: Number, required: true },
      depth: { type: Number, required: true },
    }, // Physical dimensions

    warrantyInformation: { type: String, required: true },
    shippingInformation: { type: String, required: true },

    availabilityStatus: {
      type: String,
      enum: ["In Stock", "Low Stock", "Out of Stock"], // Only allow specific statuses
      default: "In Stock",
    }, // Stock status handling

    // Customer reviews 
    reviews: [
      {
        rating: { type: Number, min: 0, max: 5 },
        comment: { type: String, required: true },
        date: { type: Date, default: Date.now },
        reviewerName: { type: String, required: true },
        reviewerEmail: { type: String, required: true },
      },
    ],

    returnPolicy: { type: String, required: true },
    minimumOrderQuantity: { type: Number, default: 1 },

    // metadata for tracking 
    meta: {
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now },
      barcode: { type: String, required: true },
      qrCode: { type: String, required: true },
    },

    images: { type: [String], required: true }, // Array of product image URLs
    thumbnail: { type: String, required: true },
  },
  { timestamps: true } // Automatically create createdAt and updatedAt fields
);

// Create a model from the schema
const Product = mongoose.model("Product", productSchema);

export default Product;
