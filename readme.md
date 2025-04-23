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
- Protected Checkout Route

## 🔧 Folder Structure

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

🙌 Author
Harshit – 
•LinkedIn 
https://www.linkedin.com/in/harshit-sharma-b93192199/  
•GitHub  
https://github.com/sharmaHarshit2000
