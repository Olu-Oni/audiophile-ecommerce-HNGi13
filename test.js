import 'dotenv/config';
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import nodemailer from "nodemailer";

console.log('GMAIL_USER:', process.env.GMAIL_USER);
console.log('GMAIL_APP_PASSWORD:', process.env.GMAIL_APP_PASSWORD ? 'SET' : 'MISSING');

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email content (customize as needed—HTML for better UX)
const mailOptions = {
  from: `"Audiophile Store" <${process.env.GMAIL_USER}>`, // Sender (display name)
  to: "oluomicheal8@gmail.com", // Recipient
  subject: `Order Confirmation  - Thank You!`,
  html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #d87d4a;">Audiophile</h1>
          <h2 style="color: #ffff;">Thank you for your order!</h2>
          </div>
      `,
  // Fallback plain text
  text: `
        Thank you for your order,!
        
       
        Audiophile Store
      `,
};

// Send email
await transporter.sendMail(mailOptions);
