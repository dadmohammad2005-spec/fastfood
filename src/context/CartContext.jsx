import React, { createContext, useContext, useState, useMemo } from 'react';
import { useToast } from './ToastContext';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { addToast } = useToast();
  // Initial cart sample items so cart isn't empty right away (user can test cart easily)
  const [cartItems, setCartItems] = useState([
    {
      id: 'zinger-burger',
      name: 'Zinger Burger',
      price: 8.99,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80',
      quantity: 2,
      category: 'Burgers'
    },
    {
      id: 'french-fries',
      name: 'Golden French Fries',
      price: 3.99,
      image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=400&q=80',
      quantity: 1,
      category: 'Sides'
    }
  ]);

  const [appliedPromo, setAppliedPromo] = useState(null); // { code: 'FAST20', discountPercent: 20 }

  const addToCart = (foodItem, quantityToAdd = 1) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === foodItem.id);
      if (existing) {
        return prevItems.map((item) =>
          item.id === foodItem.id
            ? { ...item, quantity: item.quantity + quantityToAdd }
            : item
        );
      } else {
        return [
          ...prevItems,
          {
            id: foodItem.id,
            name: foodItem.name,
            price: foodItem.price,
            image: foodItem.image,
            quantity: quantityToAdd,
            category: foodItem.category
          }
        ];
      }
    });

    addToast(`Added ${foodItem.name} to cart!`, 'success');
  };

  const removeFromCart = (foodId) => {
    const itemToRemove = cartItems.find((item) => item.id === foodId);
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== foodId));
    if (itemToRemove) {
      addToast(`Removed ${itemToRemove.name} from cart.`, 'info');
    }
  };

  const updateQuantity = (foodId, delta) => {
    setCartItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.id === foodId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setAppliedPromo(null);
  };

  const applyPromoCode = (code) => {
    const cleanCode = code.trim().toUpperCase();
    if (cleanCode === 'FAST20' || cleanCode === 'DISCOUNT20') {
      setAppliedPromo({ code: cleanCode, discountPercent: 20 });
      addToast('Promo code FAST20 applied! 20% discount added.', 'success');
      return { success: true, message: '20% Off Applied!' };
    } else if (cleanCode === 'FREEFOOD') {
      setAppliedPromo({ code: cleanCode, discountPercent: 10 });
      addToast('Promo code FREEFOOD applied! 10% discount added.', 'success');
      return { success: true, message: '10% Off Applied!' };
    } else {
      addToast('Invalid promo code. Try "FAST20"', 'error');
      return { success: false, message: 'Invalid promo code' };
    }
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    addToast('Promo code removed.', 'info');
  };

  // Computations
  const totalItemCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [cartItems]);

  const discountAmount = useMemo(() => {
    if (!appliedPromo) return 0;
    return (subtotal * appliedPromo.discountPercent) / 100;
  }, [subtotal, appliedPromo]);

  const deliveryFee = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return subtotal > 35 ? 0 : 3.49;
  }, [subtotal, cartItems.length]);

  const tax = useMemo(() => {
    return (subtotal - discountAmount) * 0.08; // 8% sales tax
  }, [subtotal, discountAmount]);

  const totalPrice = useMemo(() => {
    if (cartItems.length === 0) return 0;
    return Math.max(0, subtotal - discountAmount + deliveryFee + tax);
  }, [subtotal, discountAmount, deliveryFee, tax, cartItems.length]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItemCount,
        subtotal,
        discountAmount,
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        deliveryFee,
        tax,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
