# Luma POS Marketing Website

The marketing website for Luma POS - a Stripe-integrated mobile point of sale system built for event vendors, pop-up bars, and food trucks. Built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- ⚡ Next.js 14 with App Router
- 🎨 Tailwind CSS for styling
- 🎭 Framer Motion animations
- 📱 Fully responsive design
- 🚀 Optimized performance
- 🔍 SEO friendly

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/luma-pos.git
cd luma-pos
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```bash
cp .env.example .env
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3333](http://localhost:3333) to view the website.

## Available Scripts

- `npm run dev` - Start development server on port 3333
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
luma-pos/
├── app/              # Next.js app directory
│   ├── about/       # About page
│   ├── layout.tsx   # Root layout
│   └── page.tsx     # Home page
├── components/       # React components
├── lib/             # Utility functions
├── public/          # Static assets
└── ...config files
```

## Tech Stack

- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Fonts:** Inter & Roboto Mono

## Environment Variables

See `.env.example` for required environment variables.

## License

MIT