# Coast Guard Family Welfare Association (CGFWA)

Welcome to the official web portal for the **Coast Guard Family Welfare Association**. This platform serves as a central hub for information regarding the association's community outreach, healthcare camps, educational stipends, women's empowerment initiatives, and disaster relief programs.

## Features

- **Dynamic Dual-Language Support:** Fully integrated Bengali (BN) and English (EN) language toggles across all pages.
- **Modern UI/UX:** Built with Tailwind CSS, featuring a responsive, premium design language with smooth micro-animations, glassmorphism elements, and accessible color palettes (Brand Blue & Yellow).
- **Interactive News & Events:** Dynamic routing for news articles and upcoming events with detailed, floating content cards.
- **Multimedia Galleries:** Embedded YouTube video galleries and interactive photo lightboxes.

## Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## Run Locally

**Prerequisites:** Node.js 18+

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Start the development server:**
   ```bash
   npm run dev
   ```
3. Open [http://localhost:3000](http://localhost:3000) (or the port specified in your terminal) in your browser to view the application.

## Project Structure

- `/app`: Next.js App Router pages and layouts.
- `/components`: Reusable UI components (Navbar, Footer, Cards, Modals).
- `/data`: Dummy JSON data for news, events, leadership, and galleries.
- `/context`: Global state providers (e.g., `LanguageContext`).
- `/public`: Static assets like images and icons.
