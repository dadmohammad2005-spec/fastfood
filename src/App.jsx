import React, { useState } from 'react';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FoodDetailModal } from './components/FoodDetailModal';

// Pages
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [quickViewFood, setQuickViewFood] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentOrder, setCurrentOrder] = useState(null);

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <HomePage
            setActivePage={setActivePage}
            onQuickView={(food) => setQuickViewFood(food)}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        );
      case 'menu':
        return (
          <MenuPage
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            onQuickView={(food) => setQuickViewFood(food)}
          />
        );
      case 'about':
        return <AboutPage setActivePage={setActivePage} />;
      case 'contact':
        return <ContactPage />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'forgot-password':
        return <ForgotPasswordPage setActivePage={setActivePage} />;
      case 'dashboard':
        return (
          <DashboardPage
            setActivePage={setActivePage}
            onQuickView={(food) => setQuickViewFood(food)}
          />
        );
      case 'cart':
        return <CartPage setActivePage={setActivePage} />;
      case 'checkout':
        return (
          <CheckoutPage
            setActivePage={setActivePage}
            setCurrentOrder={setCurrentOrder}
          />
        );
      case 'order-confirmation':
        return (
          <OrderConfirmationPage
            order={currentOrder}
            setActivePage={setActivePage}
          />
        );
      default:
        return <HomePage setActivePage={setActivePage} onQuickView={setQuickViewFood} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans selection:bg-red-500 selection:text-white">
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="flex-1">
        {renderPage()}
      </main>

      <Footer setActivePage={setActivePage} />

      {/* Quick View Modal */}
      {quickViewFood && (
        <FoodDetailModal
          food={quickViewFood}
          onClose={() => setQuickViewFood(null)}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
