# 🛍️ ShoppyGlobe E-commerce App

A full-stack e-commerce app with product listings, cart functionality, and user authentication.

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

## 🧪 ThunderClient API Testing

All API endpoints have been tested using ThunderClient.  
Below are the screenshots:

| API Route                    | Test Description             | Screenshot |
|:-----------------------------|:-----------------------------|:----------:|
| `POST /api/auth/register`    | Register a new user          | ![Register](./screenshots/auth_register.png) |
| `POST /api/auth/login`       | User login and get token     | ![Login](./screenshots/auth_login.png) |

| `GET /api/products/`         | Fetch all products           | ![All Products](./screenshots/get_all_products.png) |
| `GET /api/products/:id`      | Fetch a single product       | ![Single Product](./screenshots/get_single_product.png) |
| `POST /api/products/`         | Create a new product        | ![Create Product](./screenshots/create_product.png) |

| `GET /api/cart/`             | Get user's cart (Protected)  | ![Get Cart](./screenshots/get_cart.png) |
| `POST /api/cart/`            | Add product to cart          | ![Add to Cart](./screenshots/add_to_cart.png) |
| `PUT /api/cart/:productId`   | Update quantity in cart      | ![Update Cart](./screenshots/update_cart_item.png) |
| `DELETE /api/cart/clear`     | Clear the cart               | ![Clear Cart](./screenshots/clear_cart.png) |
| `DELETE /api/cart/:productId`| Remove an item from cart     | ![Remove Cart Item](./screenshots/remove_cart_item.png) |

| `GET /api/user/profile`      | Get logged-in user's profile | ![User Profile](./screenshots/get_user_profile.png) |
| `PUT /api/user/profile`      | Update user profile          | ![Update Profile](./screenshots/update_user_profile.png) |

---



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
│   │   └── errorMiddleware.js
│   ├── models/
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



## 📦 Installation

git clone https://github.com/sharmaHarshit2000/shoppyglobe-fullStack.git
cd shoppyglobe-fullStack

```bash
# Frontend
cd frontend
npm install
npm run dev

# Backend
cd backend
npm install
npm start

```

## 👤 Author

Harshit – 
•LinkedIn https://www.linkedin.com/in/harshit-sharma-b93192199/  
•GitHub  https://github.com/sharmaHarshit2000
