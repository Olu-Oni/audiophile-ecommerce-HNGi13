'use client';

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react';

export interface CartItem {
  id: number;
  slug: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  category: string;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isLoaded: boolean;              
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Defensive: make sure every item has a quantity
        const sanitized = Array.isArray(parsed)
          ? parsed.map((i: any) => ({
              ...i,
              quantity: Number(i.quantity) || 1,
            }))
          : [];
        setCart(sanitized);
      }
    } catch (e) {
      console.error('Failed to parse cart from localStorage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

   useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('cart', JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart', e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = useCallback(
    (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((i) => i.id === item.id);
        if (existing) {
          return prev.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [...prev, { ...item, quantity }];
      });
    },
    []
  );

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => setCart([]), []);

  const totalItems = cart.reduce((s, i) => s + i.quantity, 0);
  const totalPrice = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isLoaded,                    
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}