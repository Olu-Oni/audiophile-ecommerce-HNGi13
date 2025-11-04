import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  orders: defineTable({
    // Customer info
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    address: v.string(),
    zipCode: v.string(),
    city: v.string(),
    country: v.string(),
    
    // Payment info
    paymentMethod: v.string(), // "emoney" or "cash"
    eMoneyNumber: v.optional(v.string()),
    eMoneyPin: v.optional(v.string()),
    
    // Order details
    items: v.array(
      v.object({
        id: v.number(),
        slug: v.string(),
        name: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),
    
    // Totals
    subtotal: v.number(),
    shipping: v.number(),
    vat: v.number(),
    grandTotal: v.number(),
    
    // Status
    status: v.string(),
    createdAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_created_at", ["createdAt"]),
});