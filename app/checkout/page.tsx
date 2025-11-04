"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import { CartItem, useCart } from "@/lib/cart-content";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//  Zod Schema
const checkoutSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Wrong format"),
    phone: z
      .string()
      .regex(/^[\d\s+()-]+$/, "Invalid phone number")
      .min(10, "Phone number too short"),
    address: z.string().min(5, "Address is required"),
    zipCode: z.string().min(4, "ZIP code is required"),
    city: z.string().min(2, "City is required"),
    country: z.string().min(2, "Country is required"),
    paymentMethod: z.enum(["emoney", "cash"]),
    eMoneyNumber: z.string().optional(),
    eMoneyPin: z.string().optional(),
  })
  .refine(
    (data) =>
      data.paymentMethod === "emoney"
        ? !!data.eMoneyNumber && data.eMoneyNumber.length >= 6
        : true,
    {
      message: "e-Money number must be at least 6 digits",
      path: ["eMoneyNumber"],
    }
  )
  .refine(
    (data) =>
      data.paymentMethod === "emoney"
        ? !!data.eMoneyPin && data.eMoneyPin.length === 4
        : true,
    { message: "e-Money PIN must be 4 digits", path: ["eMoneyPin"] }
  );

type FormData = z.infer<typeof checkoutSchema>;

//  Input Wrapper
function InputWrapper({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <label className="block text-xs font-bold mb-2">{label}</label>
      {children}
      {error && (
        <span className="absolute top-0 right-0 text-[#CD2C2C] text-xs font-medium">
          {error}
        </span>
      )}
    </div>
  );
}

//  Main Component
export default function CheckoutPage() {
  const router = useRouter();
  const { cart, totalPrice, clearCart } = useCart();
  const createOrder = useMutation(api.orders.create);

  const [submittedOrder, setSubittedOrder] = useState<{
    data: FormData;
    items: CartItem[];
    grandTotal: number;
  } | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema),
    mode: "onBlur",
    defaultValues: { paymentMethod: "emoney" },
  });

  const paymentMethod = watch("paymentMethod");
  const shipping = 50;
  const vat = totalPrice * 0.2;
  const grandTotal = totalPrice + shipping;

  const onSubmit = async (data: FormData) => {
    console.log("submitting");
    setIsSubmitting(true);
    try {
      const newOrder = {
        ...data,
        items: cart.map((i: any) => ({
          id: i.id,
          slug: i.slug,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          image: i.image,
        })),
        subtotal: totalPrice,
        shipping,
        vat,
        grandTotal,
      };
      const newOrderId = await createOrder(newOrder);

      await fetch("/api/send-order-to-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: data.email,
          name: data.name,
          orderId: newOrderId,
          items: cart,
          grandTotal,
          shippingAddress: {
            address: data.address,
            zipCode: data.zipCode,
            country: data.country,
            city: data.city,
          },
        }),
      });

      setOrderId(newOrderId);
      setShowSuccessModal(true);
      setSubittedOrder({ data: data, items: cart, grandTotal });
      console.log(newOrder);
      clearCart();
    } catch (error) {
      console.error("Order failed:", error);
      alert("Order failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0 && !showSuccessModal) {
    return (
      <div className="custom-container py-30 text-center  mt-[90px] lg:mt-24">
        <h1 className="text-3xl font-bold mb-14">Your cart is empty</h1>
        <Link href="/">
          <button className="btn-1">Continue Shopping</button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="custom-container mt-[90px] lg:mt-24 bg-dark-grey"
      >
        <a
          onClick={() => router.back()}
          className="opacity-50 mt-12 mb-6 lg:mt-[79px] lg:mb-[38px] block"
        >
          Go Back
        </a>

        <div className="flex flex-col lg:flex-row gap-8 mb-[97px] md:mb-[116px] lg:mb-[141px]">
          {/*  Checkout Form  */}
          <div className="flex-1 bg-white rounded-lg p-8">
            <h3 className="mb-8">Checkout</h3>

            {/*  Billing Details  */}
            <div className="mb-8">
              <span className="text-dark-orange subtitle">Billing Details</span>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <InputWrapper label="Name" error={errors.name?.message}>
                  <input
                    {...register("name")}
                    className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                      errors.name
                        ? "border-[#CD2C2C]"
                        : "border-[#CFCFCF] focus:border-dark-orange"
                    }`}
                    placeholder="Alexei Ward"
                  />
                </InputWrapper>

                <InputWrapper
                  label="Email Address"
                  error={errors.email?.message}
                >
                  <input
                    {...register("email")}
                    type="email"
                    className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                      errors.email
                        ? "border-[#CD2C2C]"
                        : "border-[#CFCFCF] focus:border-dark-orange"
                    }`}
                    placeholder="alexei@mail.com"
                  />
                </InputWrapper>

                <InputWrapper
                  label="Phone Number"
                  error={errors.phone?.message}
                >
                  <input
                    {...register("phone")}
                    type="tel"
                    className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                      errors.phone
                        ? "border-[#CD2C2C]"
                        : "border-[#CFCFCF] focus:border-dark-orange"
                    }`}
                    placeholder="+1 202-555-0136"
                  />
                </InputWrapper>
              </div>
            </div>

            {/*  Shipping Info  */}
            <div className="mb-8">
              <span className="text-dark-orange subtitle">Shipping Info</span>
              <div className="space-y-6 mt-4">
                <InputWrapper label="Address" error={errors.address?.message}>
                  <input
                    {...register("address")}
                    className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                      errors.address
                        ? "border-[#CD2C2C]"
                        : "border-[#CFCFCF] focus:border-dark-orange"
                    }`}
                    placeholder="1137 Williams Avenue"
                  />
                </InputWrapper>

                <div className="grid md:grid-cols-2 gap-6">
                  <InputWrapper
                    label="ZIP Code"
                    error={errors.zipCode?.message}
                  >
                    <input
                      {...register("zipCode")}
                      className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                        errors.zipCode
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF] focus:border-dark-orange"
                      }`}
                      placeholder="10001"
                    />
                  </InputWrapper>

                  <InputWrapper label="City" error={errors.city?.message}>
                    <input
                      {...register("city")}
                      className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                        errors.city
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF] focus:border-dark-orange"
                      }`}
                      placeholder="New York"
                    />
                  </InputWrapper>

                  <InputWrapper label="Country" error={errors.country?.message}>
                    <input
                      {...register("country")}
                      className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                        errors.country
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF] focus:border-dark-orange"
                      }`}
                      placeholder="United States"
                    />
                  </InputWrapper>
                </div>
              </div>
            </div>

            {/*  Payment Details  */}
            <div>
              <span className="text-dark-orange subtitle">Payment Details</span>

              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="flex items-center">
                  <label className="block text-xs font-bold">
                    Payment Method
                  </label>
                </div>

                <div className="space-y-3">
                  {[
                    { value: "emoney", label: "e-Money" },
                    { value: "cash", label: "Cash on Delivery" },
                  ].map((method) => (
                    <label
                      key={method.value}
                      className={`
                        flex items-center gap-4 px-6 py-4 border rounded-lg cursor-pointer
                        transition-colors
                        ${watch("paymentMethod") === method.value ? "border-dark-orange" : "border-[#CFCFCF]"}
                        hover:border-dark-orange
                      `}
                    >
                      <input
                        type="radio"
                        {...register("paymentMethod")}
                        value={method.value}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={`
                          relative flex h-5 w-5 items-center justify-center rounded-full
                          border-2 ${watch("paymentMethod") === method.value ? "border-dark-orange" : "border-[#CFCFCF]"}
                          after:absolute after:h-2.5 after:w-2.5 after:rounded-full
                          after:bg-dark-orange after:scale-0
                          ${watch("paymentMethod") === method.value ? "after:scale-100" : ""}
                          transition-transform
                        `}
                      />
                      <span className="font-bold">{method.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* e-Money Fields */}
              {paymentMethod === "emoney" && (
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <InputWrapper
                    label="e-Money Number"
                    error={errors.eMoneyNumber?.message}
                  >
                    <input
                      {...register("eMoneyNumber")}
                      className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                        errors.eMoneyNumber
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF] focus:border-dark-orange"
                      }`}
                      placeholder="238521993"
                    />
                  </InputWrapper>

                  <InputWrapper
                    label="e-Money PIN"
                    error={errors.eMoneyPin?.message}
                  >
                    <input
                      {...register("eMoneyPin")}
                      className={`w-full px-6 py-4 border rounded-lg outline-none transition-colors ${
                        errors.eMoneyPin
                          ? "border-[#CD2C2C]"
                          : "border-[#CFCFCF] focus:border-dark-orange"
                      }`}
                      placeholder="6891"
                    />
                  </InputWrapper>
                </div>
              )}

              {/* Cash on Delivery Info */}
              {paymentMethod === "cash" && (
                <div className="flex mt-8 gap-8 items-center">
                  <span className="shrink-0">
                    <Image
                      src="/checkout/icon-cash-on-delivery.svg"
                      alt="cash payment"
                      width={48}
                      height={48}
                    />
                  </span>
                  <p className="opacity-50 text-sm">
                    The ‘Cash on Delivery’ option enables you to pay in cash
                    when our delivery courier arrives at your residence. Just
                    make sure your address is correct so that your order will
                    not be cancelled.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/*  Summary  */}
          <div className="lg:w-[350px] bg-white rounded-lg p-8 h-fit">
            <h6 className="mb-8">Summary</h6>

            <div className="space-y-6 mb-8">
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
                    <p className="opacity-50">${item.price.toLocaleString()}</p>
                  </div>
                  <span className="opacity-50 font-bold">x{item.quantity}</span>
                </div>
              ))}
            </div>

            <div className="space-y-2 mb-8">
              <div className="flex justify-between">
                <span className="opacity-50 uppercase">Total</span>
                <span className="font-bold">
                  ${totalPrice.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50 uppercase">Shipping</span>
                <span className="font-bold">${shipping}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-50 uppercase">VAT (Included)</span>
                <span className="font-bold">${vat.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex justify-between mb-8">
              <span className="opacity-50 uppercase">Grand Total</span>
              <span className="font-bold text-dark-orange text-lg">
                ${grandTotal.toLocaleString()}
              </span>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-1 w-full disabled:opacity-50"
            >
              {isSubmitting ? "Loading..." : "Continue & Pay"}
            </button>
          </div>
        </div>
      </form>

      {/*  Success Modal  */}

      {showSuccessModal && submittedOrder && (
        <SuccessModal
          orderId={orderId}
          grandTotal={submittedOrder.grandTotal}
          firstItem={submittedOrder.items[0]}
          itemCount={submittedOrder.items.length}
          onClose={() => {
            setSubittedOrder(null);
            router.push("/");
          }}
        />
      )}
    </>
  );
}

//  Success Modal
function SuccessModal({
  orderId,
  grandTotal,
  firstItem,
  itemCount,
  onClose,
}: any) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-lg p-8 md:p-12 max-w-[540px] w-full">
        <Image
          src="/checkout/icon-order-confirmation.svg"
          alt="cash payment"
          width={64}
          height={64}
        />

        <h5 className="leading-7 tracking-[0.86px] mt-[23px] mb-4">
          Thank you
          <br />
          for your order
        </h5>

        <p className="opacity-50 mb-6">
          You will receive an email confirmation shortly.
        </p>

        <div className="bg-dark-grey rounded-lg overflow-hidden mb-8 flex max-md:flex-col w-full">
          <div className="p-6">
            {firstItem && (
              <div className="flex items-center gap-4 mb-3">
                <Image
                  src={firstItem.image.trimStart()}
                  alt={firstItem.name}
                  width={50}
                  height={50}
                  className="rounded"
                />
                <div className="flex-1">
                  <p className="font-bold">{firstItem.name}</p>
                  <p className="opacity-50">
                    ${firstItem.price.toLocaleString()}
                  </p>
                </div>
                <span className="opacity-50 font-bold">
                  x{firstItem.quantity}
                </span>
              </div>
            )}
            {itemCount > 1 && (
              <p className="text-xs opacity-50 text-center pt-3 border-t">
                and {itemCount - 1} other item(s)
              </p>
            )}
          </div>
          <div className="bg-black text-white p-6 w-full md:max-w-[198px]">
            <p className="opacity-50 uppercase mb-2">Grand Total</p>
            <h6>${grandTotal.toLocaleString()}</h6>
          </div>
        </div>

        <button onClick={onClose} className="btn-1 w-full!">
          Back to Home
        </button>
      </div>
    </div>
  );
}
