import React, { createContext, useContext, useState } from 'react';
import { INITIAL_ORDERS } from '../data/mockOrders';
import { useToast } from './ToastContext';

const AuthContext = createContext();

const DEMO_USER = {
  id: 'usr-101',
  name: 'Alex Johnson',
  email: 'alex.foodie@testing.com',
  phone: '+1 (555) 019-2834',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  memberSince: 'March 2025',
  address: '742 Evergreen Terrace, Apt 4B, New York, NY 10001'
};

export const AuthProvider = ({ children }) => {
  const { addToast } = useToast();
  const [user, setUser] = useState(DEMO_USER);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [favorites, setFavorites] = useState(['zinger-burger', 'supreme-pizza', 'chicken-wings', 'loaded-fries']);
  const [orders, setOrders] = useState(INITIAL_ORDERS);

  const login = (email, password) => {
    // Basic clean validation check demo
    const nameFromEmail = email.split('@')[0].replace('.', ' ');
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);

    const loggedInUser = {
      id: 'usr-' + Math.floor(Math.random() * 9000 + 1000),
      name: formattedName || 'Test User',
      email: email,
      phone: '+1 (555) 432-8765',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      memberSince: 'September 2026',
      address: '123 Tech Avenue, Suite 400, Innovation City'
    };

    setUser(loggedInUser);
    setIsLoggedIn(true);
    addToast(`Welcome back, ${loggedInUser.name}! Login successful.`, 'success');
    return true;
  };

  const register = (userData) => {
    const newUser = {
      id: 'usr-' + Math.floor(Math.random() * 9000 + 1000),
      name: userData.fullName,
      email: userData.email,
      phone: userData.phone || '+1 (555) 999-8888',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      memberSince: 'Just joined!',
      address: '456 Fast Food Lane, Foodie Town'
    };

    setUser(newUser);
    setIsLoggedIn(true);
    addToast(`Account created successfully! Welcome, ${newUser.name}.`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    addToast('You have been logged out safely.', 'info');
  };

  const toggleFavorite = (foodId) => {
    if (favorites.includes(foodId)) {
      setFavorites(favorites.filter((id) => id !== foodId));
      addToast('Removed from favorites', 'info');
    } else {
      setFavorites([...favorites, foodId]);
      addToast('Added to your favorite foods ❤️', 'success');
    }
  };

  const isFavorite = (foodId) => favorites.includes(foodId);

  const addOrder = (newOrder) => {
    setOrders((prevOrders) => [newOrder, ...prevOrders]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        login,
        register,
        logout,
        favorites,
        toggleFavorite,
        isFavorite,
        orders,
        addOrder,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
