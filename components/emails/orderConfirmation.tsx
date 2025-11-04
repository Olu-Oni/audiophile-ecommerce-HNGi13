import * as React from 'react';

interface OrderConfirmationEmailProps {
  name: string;
  orderId: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
  }>;
  grandTotal: number;
}

export const OrderConfirmationEmail: React.FC<OrderConfirmationEmailProps> = ({
  name,
  orderId,
  items,
  grandTotal,
}) => (
  <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#D87D4A' }}>Thank you for your order!</h1>
    <p>Hi {name},</p>
    <p>Your order has been confirmed and will be shipping soon.</p>
    
    <div style={{ backgroundColor: '#f5f5f5', padding: '20px', marginTop: '20px' }}>
      <h2 style={{ marginTop: 0 }}>Order #{orderId}</h2>
      
      {items.map((item, index) => (
        <div key={index} style={{ marginBottom: '10px', paddingBottom: '10px', borderBottom: '1px solid #ddd' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span>{item.quantity}x {item.name}</span>
            <span>${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        </div>
      ))}
      
      <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '2px solid #D87D4A' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
          <span>GRAND TOTAL</span>
          <span style={{ color: '#D87D4A' }}>${grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
    
    <p style={{ marginTop: '30px' }}>We'll send you a shipping confirmation email as soon as your order ships.</p>
    <p>Best regards,<br />The Audiophile Team</p>
  </div>
);