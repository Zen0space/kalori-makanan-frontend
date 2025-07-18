# Kalori Makanan Frontend 🍽️

A modern, clean frontend for the Kalori Makanan API - providing easy access to nutritional data for 750+ Malaysian and international foods.

🌐 **Live Demo**: [https://kalori-me.senitera.com](https://kalori-me.senitera.com)  
🚀 **API**: [https://kalori-makanan-kkm.onrender.com](https://kalori-makanan-kkm.onrender.com)  
📚 **API Docs**: [https://kalori-makanan-kkm.onrender.com/docs](https://kalori-makanan-kkm.onrender.com/docs)

## ✨ Features

- 🎯 **Modern Landing Page** - Clean, responsive design with smooth animations
- 🔍 **Live API Demo** - Interactive search with real-time results
- 📖 **Comprehensive Documentation** - Complete API reference and guides
- 💻 **Code Examples** - Ready-to-use code snippets in multiple languages
- 📱 **Mobile Responsive** - Works perfectly on all devices
- ⚡ **Fast Performance** - Optimized for speed and efficiency

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Fetching**: SWR
- **Icons**: Lucide React
- **Deployment**: Netlify

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager
- Git

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/Zen0space/kalori-makanan-frontend.git
cd kalori-makanan-frontend
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Set up environment variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_BASE_URL=https://kalori-makanan-kkm.onrender.com
```

### 4. Run the development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 📁 Project Structure

```
kalori-makanan-frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Landing page
│   ├── globals.css        # Global styles
│   ├── docs/              # Documentation page
│   └── examples/          # API examples page
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components
│   └── sections/          # Page sections
├── lib/                   # Utilities and helpers
│   ├── api.ts            # API client
│   ├── types.ts          # TypeScript types
│   └── utils.ts          # Utility functions
├── public/               # Static assets
└── package.json          # Dependencies
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Run TypeScript compiler check
```

## 🌐 Deployment

### Deploying to Netlify

1. **Build Configuration**

   Create `netlify.toml` in the root directory:

   ```toml
   [build]
     command = "npm run build"
     publish = "out"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

2. **Configure Next.js for Static Export**

   Update `next.config.mjs`:

   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```

3. **Deploy to Netlify**

   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `out`
   - Add environment variable: `NEXT_PUBLIC_API_BASE_URL`
   - Deploy!

### Manual Deployment

```bash
# Build for production
npm run build

# The 'out' directory contains the static files
# Upload this directory to your hosting provider
```

## 🔌 API Integration

The frontend integrates with the Kalori Makanan API. Key endpoints:

- `GET /foods/search?name={name}` - Search foods
- `GET /foods/{id}` - Get food by ID
- `GET /categories` - List categories
- `GET /foods` - List all foods (paginated)

See the [API documentation](https://kalori-makanan-kkm.onrender.com/docs) for complete details.

## 🎨 Customization

### Colors

Edit the color palette in `tailwind.config.ts`:

```javascript
colors: {
  primary: {
    DEFAULT: '#4299e1',
    dark: '#3182ce',
    light: '#63b3ed',
  },
  // ... more colors
}
```

### Fonts

The project uses Inter for body text and JetBrains Mono for code. To change fonts, update `app/globals.css` and `app/layout.tsx`.

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🐛 Bug Reports

Found a bug? Please [open an issue](https://github.com/Zen0space/kalori-makanan-frontend/issues) with:

- Bug description
- Steps to reproduce
- Expected behavior
- Screenshots (if applicable)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Kalori Makanan API](https://github.com/Zen0space/kalori-makanan-kkm) for providing the food data
- [Next.js](https://nextjs.org/) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for Next.js and inspiration

## 📞 Contact

- **API Issues**: [API Repository](https://github.com/Zen0space/kalori-makanan-kkm)
- **Frontend Issues**: [Frontend Repository](https://github.com/Zen0space/kalori-makanan-frontend)

---

Made with ❤️ in Malaysia