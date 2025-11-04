// app/components/Header.tsx   (or .jsx if you prefer)
"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CardsCategoryGroup } from "../ui/cards";
import { useCart } from "@/lib/cart-content";
import { CartModal } from "./cartModal";

export function CartIcon() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { totalItems } = useCart();

  return (
    <>
    <button onClick={() => setIsCartOpen(true)} className="ml-auto lg:ml-0 relative w-fit! h-fit!">
      <Image src="/carts.svg" width={23} height={20} alt="Cart" />

      {/* {totalItems > 0 && (
        <span className="absolute -top-3 -right-3 bg-dark-orange text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {totalItems}
        </span>
      )} */}
    </button>
    <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}

//  Helper – split pathname into [category, slug] when possible
function useCategorySlug() {
  const pathname = usePathname();
  const parts = pathname.split("/").filter(Boolean); // ['headphones','xx99-mark-one-headphones']
  if (parts.length === 2) {
    return { category: parts[0], slug: parts[1] };
  }
  return null;
}

//  Main Header
export default function Header() {
  const pathname = usePathname();
  const categorySlug = useCategorySlug();
  const [mobileOpen, setMobileOpen] = useState(false);

  // background colour – home page is a little darker
  const bg = pathname === "/" ? "bg-[#121212]" : "bg-black";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-white ${bg} custom-container max-md:px-0! h-[90px] lg:h-24`}
    >
      {/*  TOP BAR – logo, desktop nav, hamburger, cart */}
      <nav className="flex h-full items-center justify-between max-w-[1440px] mx-auto px-6 lg:px-0">
        {/* ---- Hamburger (mobile only) ---- */}
        <button
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden w-fit! h-fit! flex items-center justify-center w-10 h-10 z-50"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          <Image
            src={mobileOpen ? "/close.svg" : "/hamburger.svg"}
            width={24}
            height={24}
            alt=""
          />
        </button>

        {/* ---- Logo ---- */}
        <Link
          href="/"
          className="absolute justify-self-start  max-lg:ml-[58px] lg:static"
        >
          <Image width={143} height={25} src="/logo.svg" alt="audiophile" />
        </Link>

        {/* ---- Desktop navigation ---- */}
        <div className="hidden lg:flex space-x-8">
          {["home", "headphones", "speakers", "earphones"].map((item) => (
            <Link
              key={item}
              href={item === "home" ? "/" : `/${item}`}
              className="uppercase tracking-wider hover:text-dark-orange transition-colors"
            >
              {item === "home" ? "Home" : item}
            </Link>
          ))}
        </div>

        {/* ---- Cart icon (always visible) ---- */}
        <CartIcon/>
      </nav>

      {/*  Divider */}
      <hr className="border-white/[0.104] border-t w-full max-w-[1440px] mx-auto" />

      {/*  Breadcrumb – only on product pages */}
      {categorySlug && (
        <div className="max-w-[1440px] mx-auto px-6 py-2 text-sm opacity-50">
          <Link href={`/${categorySlug.category}`} className="capitalize">
            {categorySlug.category}
          </Link>{" "}
          • {categorySlug.slug.replace(/-/g, " ")}
        </div>
      )}

      {/*  MOBILE MENU – slides in from the left */}
      <div
        className={`fixed inset-x-0 max-md:h-[500px] overflow-hidden z-40 bg-white backdrop-blur-md transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="w-full mx-auto h-full overflow-y-auto px-6 pt-8 md:pt-[56px] md:pb-[67px] pb-10">
          <CardsCategoryGroup />
        </div>
      </div>

      {/*  Overlay – closes menu when clicking outside */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </header>
  );
}
