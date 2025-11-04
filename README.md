# Audiophile E-commerce

A modern e-commerce platform for premium audio equipment built with Next.js, TypeScript, and Convex.

## Live Demo

🔗 **[View Live Site](https://audiophile-ecommerce-olu.vercel.app/)**

## Features

- 🛒 Full-featured shopping cart
- 📧 Email notifications with Nodemailer
- 🎨 Responsive design with Tailwind CSS
- ✅ Form validation with React Hook Form & Zod
- 🔄 Real-time data with Convex
- ⚡ Fast and optimized with Next.js 16

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone and install**
   ```bash
   git clone <repo-url>
   cd audiophile-ecommerce
   npm install
   ```

2. **Set up environment variables**
   
   Create `.env.local` in the root directory:
   ```env
   CONVEX_DEPLOYMENT=your_convex_deployment_url
   NEXT_PUBLIC_CONVEX_URL=your_convex_public_url
   
   # Email configuration (Nodemailer)
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASSWORD=your_app_password
   ```

3. **Set up Convex**
   ```bash
   npx convex dev
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Deploy to Hosting Service


Or manually:
```bash
vercel --prod
```

Remember to add environment variables in Vercel dashboard.

## Tech Stack

- **Next.js 16** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Styling
- **Convex** - Backend & database
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Nodemailer** - Email service
- **Notyf** - Toast notifications

## Project Structure

```
audiophile-ecommerce/
├── app/              # Next.js app directory
├── components/       # React components
├── convex/          # Convex backend functions
├── public/          # Static assets
└── .env.local       # Environment variables
```

## License

MIT

---

Built with Next.js and deployed on Vercel