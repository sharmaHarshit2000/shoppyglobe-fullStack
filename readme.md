# 🛍️ ShoppyGlobe E-commerce App

A full-stack e-commerce app with product listings, cart functionality, and user authentication.

## Table of Contents
- [Tech Stack](#-tech-stack)
- [Features](#-features)
- [MongoDB Integration](#️-mongodb-integration)
- [ThunderClient + MongoDB Atlas Testing](#-thunderclient--mongodb-atlas-testing)
- [Folder Structure](#-folder-structure)
- [Environment Variables](#-environment-variables)
- [Installation](#-installation)
- [Deployment](#-deployment)
- [Author](#-author)

## 🚀 Tech Stack
- **Frontend:** React, Tailwind CSS, Axios, React Router
- **Backend:** Node.js, Express, MongoDB (Atlas)
- **Authentication:** JWT

## 🧾 Features
- User login & signup
- Browse products
- Add to cart (protected route)
- Dynamic cart count & user info
- Protected checkout route

## 🗄️ MongoDB Integration
**Database:** `test`

**Collections:**
- `products`: Stores product data (name, price, description, stock)
- `carts`: Stores cart items (product IDs and quantities)
- `users`: Stores user authentication data

**CRUD operations implemented for:**
- **Products:** Create, Read, Update, Delete
- **Cart Items:** Add to Cart, Update Quantity, Remove Items, Clear Cart

## 🧪 ThunderClient + MongoDB Atlas Testing

All API endpoints were tested using ThunderClient, and results were verified in MongoDB Atlas. Below are the screenshots:

### Authentication Routes
| **API Route**               | **Description**              | **ThunderClient Screenshot**             | **MongoDB Atlas Screenshot**             |
|------------------------------|-------------------------------|-------------------------------------------|-------------------------------------------|
| `POST /api/auth/register`    | Register a new user           | ![Register](./screenshots/ThunderClient_ss/auth_register.png) | ![User Created](./screenshots/MongoDB_atlas_ss/user_created.png) |
| `POST /api/auth/login`       | User login and get token      | ![Login](./screenshots/ThunderClient_ss/auth_login.png)        | ![User Login Check](./screenshots/MongoDB_atlas_ss/user_login_check.png) |

### Product Routes
| **API Route**               | **Description**              | **ThunderClient Screenshot**             | **MongoDB Atlas Screenshot**             |
|------------------------------|-------------------------------|-------------------------------------------|-------------------------------------------|
| `POST /api/products/`        | Create a new product          | ![Create Product](./screenshots/ThunderClient_ss/create_product.png) | ![Product Created](./screenshots/MongoDB_atlas_ss/product_created.png) |
| `GET /api/products/`         | Fetch all products            | ![Get Products](./screenshots/ThunderClient_ss/get_all_products.png) | ![Products DB](./screenshots/MongoDB_atlas_ss/all_products_db.png) |
| `GET /api/products/:id`      | Fetch a single product        | ![Single Product](./screenshots/ThunderClient_ss/get_single_product.png) | ![Single Product DB](./screenshots/MongoDB_atlas_ss/single_product_db.png) |

### Cart Routes
| **API Route**               | **Description**              | **ThunderClient Screenshot**             | **MongoDB Atlas Screenshot**             |
|------------------------------|-------------------------------|-------------------------------------------|-------------------------------------------|
| `POST /api/cart/`            | Add product to cart (Protected) | ![Add to Cart](./screenshots/ThunderClient_ss/add_to_cart.png) | ![Cart Updated](./screenshots/MongoDB_atlas_ss/cart_updated.png) |
| `GET /api/cart/`             | Get user's cart (Protected)   | ![Get Cart](./screenshots/ThunderClient_ss/get_cart.png)        | ![Cart DB Check](./screenshots/MongoDB_atlas_ss/cart_db_check.png) |
| `PUT /api/cart/:productId`   | Update quantity in cart (Protected) | ![Update Cart Item](./screenshots/ThunderClient_ss/update_cart_item.png) | ![Update Cart DB](./screenshots/MongoDB_atlas_ss/update_cart_db.png) |
| `DELETE /api/cart/:productId`| Remove an item from cart (Protected) | ![Remove Cart Item](./screenshots/ThunderClient_ss/remove_cart_item.png) | ![Remove Cart DB](./screenshots/MongoDB_atlas_ss/remove_cart_db.png) |
| `DELETE /api/cart/clear`     | Clear the cart (Protected)    | ![Clear Cart](./screenshots/ThunderClient_ss/clear_cart.png)     | ![Clear Cart DB](./screenshots/MongoDB_atlas_ss/clear_cart_db.png) |

### User Routes
| **API Route**               | **Description**              | **ThunderClient Screenshot**             | **MongoDB Atlas Screenshot**             |
|------------------------------|-------------------------------|-------------------------------------------|-------------------------------------------|
| `GET /api/user/profile`      | Get logged-in user's profile  | ![User Profile](./screenshots/ThunderClient_ss/get_user_profile.png) | ![User Profile DB](./screenshots/MongoDB_atlas_ss/user_profile_db.png) |
| `PUT /api/user/profile`      | Update user profile           | ![Update Profile](./screenshots/ThunderClient_ss/update_user_profile.png) | ![Updated User DB](./screenshots/MongoDB_atlas_ss/updated_user_profile_db.png) |

### Miscellaneous
| **Test**                    | **Description**              | **ThunderClient Screenshot**             |
|------------------------------|-------------------------------|-------------------------------------------|
| **Invalid Route**            | Testing Not Found route (`404`) | ![Not Found](./screenshots/ThunderClient_ss/not_found_route.png) |
| **Global Error Handling**    | Testing server-side error handling | ![Global Error](./screenshots/ThunderClient_ss/global_error.png) |


## 🔧 Folder Structure

```plaintext
shoppyglobe/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── cartController.js
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── notFound.js
│   ├── models/
│   │   ├── Cart.js
│   │   ├── Product.js
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── productRoutes.js
│   │   └── userRoutes.js
│   ├── .env
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── favicon.jpeg
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/
│   │   │   └── cartAPI.js
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Signup.jsx
│   │   │   ├── Cart/
│   │   │   │   ├── Cart.jsx
│   │   │   │   ├── CartItem.jsx
│   │   │   │   └── Checkout.jsx
│   │   │   ├── Product/
│   │   │   │   ├── ProductDetail.jsx
│   │   │   │   ├── ProductItem.jsx
│   │   │   │   └── ProductList.jsx
│   │   │   └── Shared/
│   │   │       ├── Footer.jsx
│   │   │       ├── Header.jsx
│   │   │       └── LoadingSpinner.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── CartContext.jsx
│   │   ├── hooks/
│   │   │   └── useFetch.js
│   │   ├── utils/
│   │   │   ├── axiosAuth.js
│   │   │   └── axiosInstance.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── index.html
│   ├── vite.config.js
│   ├── package.json
│   └── package-lock.json
│
└── README.md

```

## 🔧 Environment Variables

### 🔒 Backend `.env`
Create a `.env` file inside the `backend/` folder:

```env
NODE_ENV=development
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
📌 **Note:** Replace `<your-mongodb-connection-string>` and `<your-secret-key>` with your actual values.

### 🌐 Frontend `.env`
Create a `.env` file inside the `frontend/` folder:

```env
VITE_API_BASE_URL=https://shoppyglobe-fullstack-yy0k.onrender.com/api
```
Make sure this value matches your deployed backend API URL or use `http://localhost:5000/api` for local development.

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sharmaHarshit2000/shoppyglobe-fullStack.git
   cd shoppyglobe-fullStack
   ```

2. Install dependencies for the backend:
   ```bash
   cd backend
   npm install
   npm start
   ```

3. Install dependencies for the frontend:
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. Open the app in your browser at `http://localhost:5173`.

## 🚀 Deployment

- **Frontend:** [https://shoppyglobe-full-stack.vercel.app/](https://shoppyglobe-full-stack.vercel.app/)
- **Backend:** [https://shoppyglobe-fullstack-yy0k.onrender.com/](https://shoppyglobe-fullstack-yy0k.onrender.com/)

## 👤 Author
**Harshit Sharma**

- [LinkedIn](https://www.linkedin.com/in/harshit-sharma-b93192199/)
- [GitHub](https://github.com/sharmaHarshit2000)