import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import "dotenv/config";

export async function POST(request: NextRequest) {
  console.log("sending email");
  try {
    const body = await request.json();
    const { email, name, orderId, items, grandTotal, shippingAddress } = body;

    // Validate required fields
    if (!email || !name || !orderId || !items || !grandTotal) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter (Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: process.env.NODE_ENV === "production",
      },
    });

    // Base URL for order tracking
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    const orderUrl = `${baseUrl}/orders/${orderId}`;

    const mailOptions = {
      from: `"Audiophile Store" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: `Order Confirmation #${orderId}`,
      html: `
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #f5f5f5; font-family: Arial, sans-serif;">
    <tr>
      <td align="center" style="padding: 20px 10px;">
        
        <!-- Main container -->
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; width: 100%; background-color: #ffffff;">
          
          <!-- Header -->
          <tr>
            <td align="center" style="background-color: #191919; padding: 40px 20px;">
              <h1 style="margin: 0; color: #d87d4a; font-size: 32px; font-weight: bold; letter-spacing: 3px;">
                AUDIOPHILE
              </h1>
            </td>
          </tr>
          
          <!-- Body -->
          <tr>
            <td style="padding: 40px 30px;">
              
              <!-- Greeting -->
              <h2 style="margin: 0 0 16px 0; color: #191919; font-size: 24px; font-weight: bold;">
                Thank you for your order, ${name}!
              </h2>
              
              <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 24px;">
                Your order <strong style="color: #191919;">#${orderId}</strong> has been confirmed.
              </p>
              
              <!-- Order Summary -->
              <h3 style="margin: 20px 0 20px 0; color: #191919; font-size: 18px; font-weight: bold;">
                Order Summary
              </h3>
              
              <!-- Items -->
              ${items
                .map(
                  (item: any) => `
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px; border-bottom: 1px solid #f5f5f5; padding-bottom: 20px;">
                  <tr>
                    <td style="vertical-align: top; padding-right: 15px;">
                      <div style="color: #191919; font-weight: bold; font-size: 15px; line-height: 20px; margin-bottom: 6px;">
                        ${item.name}
                      </div>
                    </td>
                    <td width="110" style="vertical-align: top;">
                      <div style="color: #666666; font-size: 14px; line-height: 20px;">
                        Quantity: ${item.quantity}
                      </div>
                    </td>
                    <td width="80" align="right" style="vertical-align: top; color: #191919; font-weight: bold; font-size: 15px;">
                      $${item.price.toLocaleString()}
                    </td>
                  </tr>
                </table>
              `
                )
                .join("")}
              
              <!-- Total -->
              <table role="presentation" width="100%" cellpadding="20" cellspacing="0" border="0" style="background-color: #fafafa; margin: 30px 0;">
                <tr>
                  <td style="color: #191919; font-size: 16px; font-weight: bold;">
                    Grand Total
                  </td>
                  <td align="right" style="color: #d87d4a; font-size: 22px; font-weight: bold;">
                    $${grandTotal.toLocaleString()}
                  </td>
                </tr>
              </table>
              
              <!-- Shipping Details -->
              <h3 style="margin: 30px 0 20px 0; color: #191919; font-size: 18px; font-weight: bold;">
                Shipping Details
              </h3>
              
              <table role="presentation" width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color: #fef9f5; border-left: 4px solid #d87d4a; margin-bottom: 30px;">
                <tr>
                  <td style="color: #666666; font-size: 14px; line-height: 22px;">
                    📦 <strong style="color: #191919;">Delivery Time:</strong> 5-7 business days<br/>
                    ${
                      shippingAddress
                        ? `
                      <div style="margin-top: 12px;">
                        <strong style="color: #191919;">Shipping Address:</strong><br/>
                        ${shippingAddress.address}<br/>
                        ${shippingAddress.city}, ${shippingAddress.zipCode}<br/>
                        ${shippingAddress.country}
                      </div>
                    `
                        : ""
                    }
                    <div style="margin-top: 12px; color: #666666;">
                      You'll receive a tracking number once your order ships.
                    </div>
                  </td>
                </tr>
              </table>
              
              <!-- CTA Button -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${orderUrl}" style="display: inline-block; padding: 16px 40px; background-color: #d87d4a; color: #ffffff; text-decoration: none; font-weight: bold; font-size: 16px;">
                      View Your Order
                    </a>
                  </td>
                </tr>
              </table>
              
              <!-- Support/Contact Info -->
              <table role="presentation" width="100%" cellpadding="16" cellspacing="0" border="0" style="background-color: #f9f9f9; margin: 30px 0;">
                <tr>
                  <td style="color: #666666; font-size: 14px; line-height: 22px;">
                    <strong style="color: #191919; display: block; margin-bottom: 8px;">Need Help?</strong>
                    📧 Email: <a href="mailto:${process.env.GMAIL_USER}" style="color: #d87d4a; text-decoration: none;">${process.env.GMAIL_USER}</a><br/>
                    💬 Reply to this email with any questions
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td align="center" style="background-color: #191919; padding: 30px 20px;">
              <p style="margin: 0 0 8px 0; color: #999999; font-size: 13px; line-height: 20px;">
                Audiophile Store
              </p>
            </td>
          </tr>
          
        </table>
        
      </td>
    </tr>
  </table>
      `,
      text: `
Hi ${name},

Thank you for your order!

ORDER CONFIRMATION #${orderId}

Order Summary:
${items.map((item: any) => `${item.name} x${item.quantity} - $${item.price.toLocaleString()}`).join("\n")}

Grand Total: $${grandTotal.toLocaleString()}

Shipping Details:
- Delivery: 5-7 business days
${shippingAddress ? `- Address: ${shippingAddress.address}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}` : ""}

View your order: ${orderUrl}

Need Help?
Email: ${process.env.GMAIL_USER}

Audiophile Store
      `,
    };

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
