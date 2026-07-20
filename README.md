# ShopSense AI 🛍️

A full-stack, AI-powered e-commerce platform built with the MERN stack — featuring smart product recommendations, an AI shopping assistant, and a complete shopping experience from browsing to delivery tracking.

## ✨ Features

- **Authentication** — Secure JWT-based signup/login with role-based access (user/admin)
- **Product Catalog** — Browse 50+ products across 7 categories with real photos, detailed specs, and reviews
- **AI-Powered Discovery** — Smart product recommendations, live search, and a rule-based shopping assistant chatbot
- **Shopping Cart & Wishlist** — Full cart management with persistent backend storage
- **Checkout & Orders** — Address management, Cash on Delivery checkout, and order history
- **Delivery Tracking** — Visual order status timeline (Placed → Confirmed → Packed → Shipped → Out for Delivery → Delivered)
- **Product Reviews & Ratings** — Verified-purchase review system with edit/delete support
- **User Profiles** — Account dashboard, saved addresses, password management
- **Admin Panel** — Dashboard analytics, product/order/user/review management
- **Dark Mode** — Full light/dark theme support across the entire app
- **Fully Responsive** — Optimized for desktop, tablet, and mobile

## 🛠️ Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Framer Motion  
**Backend:** Node.js, Express.js, MongoDB, Mongoose  
**Authentication:** JWT, bcrypt  
**Deployment:** Vercel (Frontend), Render (Backend), MongoDB Atlas (Database)

## 📦 Getting Started

### Prerequisites
- Node.js and npm
- MongoDB Atlas account

### Installation

1. Clone the repository
```bash
   git clone https://github.com/shruti-verma49/ShopSense-AI.git
```

2. Set up the backend
```bash
   cd backend
   npm install
```
   Create a `.env` file (see `.env.example`) with your MongoDB URI, JWT secret, and other required variables.

3. Set up the frontend
```bash
   cd frontend
   npm install
```
   Create a `.env` file with `VITE_API_URL` pointing to your backend.

4. Run both servers
```bash
   # In backend/
   npm run dev

   # In frontend/ (separate terminal)
   npm run dev
```

## 📝 Author

Built by Shruti Verma as a full-stack learning project.
