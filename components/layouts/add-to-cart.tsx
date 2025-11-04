"use client";

import { useState } from "react";
import type { Product } from "@/lib/types";
import { useCart } from "@/lib/cart-content";
import { Notyf } from "notyf";

interface AddToCartProps {
    product: Product;
}

export function AddToCart({ product }: AddToCartProps) {
  const notyf = new Notyf();

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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

    notyf.success("Added to cart!");
    setQuantity(1)
    // Optional: remove when done
    console.log(JSON.parse(localStorage.getItem('cart')||''))
  
  };

  return (
    <div className="flex gap-4 ">
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
