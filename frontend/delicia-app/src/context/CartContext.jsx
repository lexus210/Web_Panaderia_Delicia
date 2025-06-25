import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (producto) => {
    const existe = cartItems.find(p => p.id === producto.id);
    if (existe) {
      setCartItems(cartItems.map(p =>
        p.id === producto.id ? { ...p, cantidad: p.cantidad + 1 } : p
      ));
    } else {
      setCartItems([...cartItems, { ...producto, cantidad: 1 }]);
    }
  };

  const updateQuantity = (id, cantidad) => {
    if (cantidad < 1) {
      removeFromCart(id);
    } else {
      setCartItems(cartItems.map(p =>
        p.id === id ? { ...p, cantidad } : p
      ));
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(p => p.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
