"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart-content";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cart, updateQuantity, clearCart, totalPrice } =
    useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden text-black">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      {/* Modal */}
      <div className="absolute top-24 right-4 md:right-10 lg:right-[165px] w-full max-w-[377px] bg-white rounded-lg p-8 shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h6 className="text-lg font-bold uppercase tracking-wider">
            Cart ({cart.length})
          </h6>
          <a
            onClick={clearCart}
            className="text-sm opacity-50 underline"
          >
            Remove all
          </a>
        </div>

        {/* Cart Items */}
        {cart.length === 0 ? (
          <p className="opacity-50 text-center py-8">Your cart is empty</p>
        ) : (
          <>
            <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8">
              {cart.map((item: any) => (
                <div key={item.id} className="flex items-center gap-4">
                  <Image
                    src={item.image.trimStart()}
                    alt={item.name}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <p className="font-bold">{item.name}</p>
                    <p className="opacity-50">
                      ${item.price.toLocaleString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 bg-dark-grey px-1 w-24 h-8">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="opacity-25 hover:text-dark-orange w-full!"
                    >
                      -
                    </button>
                    <span className="font-bold">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="opacity-25 hover:text-dark-orange w-full!"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-6">
              <span className="opacity-50 uppercase text-sm">Total</span>
              <span className="text-lg font-bold">
                ${totalPrice.toLocaleString()}
              </span>
            </div>

            {/* Checkout Button */}
            <Link href="/checkout" onClick={onClose}>
              <button className="btn-1 w-full">Checkout</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
