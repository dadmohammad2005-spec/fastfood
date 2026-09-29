# 🔥 FlameGrille — Premium Fast Food & Delivery App

A modern, responsive fast food ordering web application built with **React + Vite + Tailwind CSS**.

🌐 **Live Demo**: [https://fastfood.onrender.com](https://fastfood.onrender.com)

---

## ✨ Features

- 🍔 **Full Menu** — Browse food items by category with quick-view modals
- 🛒 **Shopping Cart** — Add, remove, and adjust quantities
- 💳 **Checkout Flow** — Multiple payment methods (Card, Cash on Delivery, Digital Wallet)
- 🎉 **Order Confirmation** — Confetti celebration with order tracking
- 👤 **User Dashboard** — View order history and favorite items
- ❤️ **Favorites** — Save your go-to food items
- 🌙 **Dark Mode** — Premium dark UI design
- 📱 **Fully Responsive** — Works perfectly on mobile, tablet, and desktop

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/fastfood-app.git
cd fastfood-app

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Build for Production

```bash
npm run build
```

The production build will be output to the `dist/` folder.

---

## 🏗️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 6** | Build tool & dev server |
| **Tailwind CSS 3** | Styling |
| **Lucide React** | Icons |
| **Canvas Confetti** | Celebration effects |

---

## 📁 Project Structure

```
fastfood-testing/
├── public/
│   └── _redirects          # SPA routing for Render.com
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── FoodCard.jsx
│   │   ├── FoodDetailModal.jsx
│   │   └── CategoryFilter.jsx
│   ├── context/            # React Context providers
│   │   ├── AuthContext.jsx
│   │   ├── CartContext.jsx
│   │   └── ToastContext.jsx
│   ├── data/               # Mock data
│   │   ├── foodData.js
│   │   └── mockOrders.js
│   ├── pages/              # Page components
│   │   ├── HomePage.jsx
│   │   ├── MenuPage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── ContactPage.jsx
│   │   ├── LoginPage.jsx
│   │   ├── RegisterPage.jsx
│   │   ├── ForgotPasswordPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── CartPage.jsx
│   │   ├── CheckoutPage.jsx
│   │   └── OrderConfirmationPage.jsx
│   ├── App.jsx             # Root component & routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── index.html              # HTML entry point
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind configuration
├── render.yaml             # Render.com deployment blueprint
└── package.json
```

---

## ☁️ Deployment on Render.com

This project is configured for deployment on **Render.com** as a **Static Site** (free tier).

### Automatic Deployment via Blueprint

1. Push this repository to GitHub
2. Go to [render.com](https://render.com) → **New** → **Blueprint**
3. Connect your GitHub repository
4. Render will automatically detect `render.yaml` and configure the service
5. The site name will be `fastfood` → URL: `https://fastfood.onrender.com`

### Manual Deployment

1. Go to [render.com](https://render.com) → **New** → **Static Site**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `fastfood`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Create Static Site**

---

## 📝 Notes

> This is a **demo/portfolio application**. Authentication and orders use in-memory mock data — data resets on page refresh. No real backend or database is connected.

---

## 📄 License

MIT License — feel free to use this for your own projects.
