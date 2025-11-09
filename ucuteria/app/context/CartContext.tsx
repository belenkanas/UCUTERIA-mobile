import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type CartItem = {
  id: string | number;
  price: number;
  qty: number;
  [key: string]: any;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQty: (id: string | number, qty: number) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
  coupon: string;
  setCoupon: React.Dispatch<React.SetStateAction<string>>;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
};

const noop = () => {};

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: noop as unknown as (item: CartItem) => void,
  updateQty: noop as unknown as (id: string | number, qty: number) => void,
  removeFromCart: noop as unknown as (id: string | number) => void,
  clearCart: noop,
  coupon: "",
  setCoupon: noop as React.Dispatch<React.SetStateAction<string>>,
  subtotal: 0,
  discount: 0,
  tax: 0,
  shipping: 0,
  total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState("");

  // Cargar carrito del storage
  useEffect(() => {
    (async () => {
      const saved = await AsyncStorage.getItem("cart");
      const savedCoupon = await AsyncStorage.getItem("coupon");
      if (saved) setCart(JSON.parse(saved) as CartItem[]);
      if (savedCoupon) setCoupon(savedCoupon);
    })();
  }, []);

  // Guardar carrito
  useEffect(() => {
    AsyncStorage.setItem("cart", JSON.stringify(cart));
    AsyncStorage.setItem("coupon", coupon);
  }, [cart, coupon]);

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      } else {
        return [...prev, { ...item, qty: 1 }];
      }
    });
  };

  const updateQty = (id: string | number, qty: number) => {
    if (qty <= 0) removeFromCart(id);
    else setCart((prev) => prev.map((p) => (p.id === id ? { ...p, qty } : p)));
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const discount = coupon === "DESC10" ? subtotal * 0.1 : 0;
  const subtotalAfterDiscount = subtotal - discount;
  const tax = subtotalAfterDiscount * 0.22;
  const shipping = subtotalAfterDiscount >= 600 ? 0 : 120;
  const total = subtotalAfterDiscount + tax + shipping;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQty,
        removeFromCart,
        clearCart,
        coupon,
        setCoupon,
        subtotal,
        discount,
        tax,
        shipping,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
