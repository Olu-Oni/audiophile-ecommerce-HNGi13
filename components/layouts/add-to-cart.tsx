"use client";

import { useEffect, useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-content";
import { Notyf } from "notyf";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [mounted, setMounted] = useState(false);
  const [notyf, setNotyf] = useState<Notyf | null>(null);

  // Initialize Notyf only on client side
  useEffect(() => {
    setMounted(true);
    setNotyf(new Notyf());
  }, []);

  const handleAddToCart = () => {
    addToCart(
      {
        id: product.id,
        slug: product.slug,
        name: product.name,
        price: product.price,
        image: product.image.mobile,
        category: product.category,
      },
      quantity
    );

    // Only call notyf if it's initialized
    if (notyf) {
      notyf.success("Added to cart!");
    }
    
    setQuantity(1);
    
    // Optional: remove when done
    if (typeof window !== 'undefined') {
      console.log(JSON.parse(localStorage.getItem('cart') || '[]'));
    }
  };

  // Optional: Return a skeleton/placeholder instead of "Loading..."
  if (!mounted) {
    return (
      <div className="flex gap-4">
        <div className="flex items-center gap-4 bg-dark-grey px-2 w-30 opacity-50">
          <button className="opacity-25 w-full!" disabled>-</button>
          <span className="font-bold">1</span>
          <button className="opacity-25 w-full!" disabled>+</button>
        </div>
        <button className="btn-1" disabled>Add to Cart</button>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="flex items-center gap-4 bg-dark-grey px-2 w-30">
        <button
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="opacity-25 hover:text-dark-orange w-full!"
        >
          -
        </button>
        <span className="font-bold">{quantity}</span>
        <button
          onClick={() => setQuantity(quantity + 1)}
          className="opacity-25 hover:text-dark-orange w-full!"
        >
          +
        </button>
      </div>
      <button onClick={handleAddToCart} className="btn-1">
        Add to Cart
      </button>
    </div>
  );
}