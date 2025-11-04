import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import "dotenv/config";

console.log("GMAIL_USER:", process.env.GMAIL_USER);
console.log(
  "GMAIL_APP_PASSWORD:",
  process.env.GMAIL_APP_PASSWORD ? "SET" : "MISSING"
);

export async function POST(request: NextRequest) {
  console.log("posting");
  try {
    const body = await request.json();
    const { email, name, orderId, items, grandTotal } = body;
    // Validate required fields
    if (!email || !name || !orderId || !items || !grandTotal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter (Gmail )
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === 'production',
      },
    });

    const mailOptions = {
      from: `"Audiophile Store" <${process.env.GMAIL_USER}>`, // Sender (display name)
      to: email, // Recipient
      subject: `Order Confirmation #${orderId} - Thank You!`,
      html: `
        <div style="font-family:Arial, sans-serif;  max-width: 1024px; margin: 0 auto;">
          <h1 style="color: #d87d4a; text-align:center; margin: 10 auto;">Audiophile</h1>
          <h2 style="font-weight: 700;">Thank you for your order, ${name}!</h2>
          <p>Your order <strong>#${orderId}</strong> has been confirmed.</p>
          
          <h3 >Order Summary</h3>
          <ul style="padding:8px;">
            ${items
              .map(
                (item: any) => `
              <li style="display: flex; gap:8px">
                <img src=${item.image.trimStart()} alt='product' width='24'/> <strong>${item.name}</strong> x${item.quantity} - $${item.price.toLocaleString()}
              </li>
            `
              )
              .join("")}
          </ul>
          
          <p><strong>Total: $${grandTotal.toLocaleString()}</strong></p>
          
          <p>Expect shipment within 5-7 business days.</p>
          <small>Audiophile Store</small>
        </div>
      `,
      // Fallback plain text
      text: `
        Thank you for your order, ${name}!
        
        Order #${orderId}
        Items:
        ${items.map((item: any) => `${item.name} x${item.quantity} - $${item.price.toLocaleString()}`).join("\n")}
        
        Total: $${grandTotal.toLocaleString()}
        
        We'll ship soon. Questions? Reply here.
        
        Audiophile Store
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent!" });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
