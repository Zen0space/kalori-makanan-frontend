# 🍽️ Kalori Makanan Frontend

A modern, comprehensive frontend platform for the Kalori Makanan API - showcasing 750+ Malaysian and international food items with detailed nutritional information.

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/your-site)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [🏗️ Project Structure](#️-project-structure)
- [🔧 Configuration](#-configuration)
- [📚 Documentation](#-documentation)
- [🎨 UI Components](#-ui-components)
- [🔌 API Integration](#-api-integration)
- [🚀 Deployment](#-deployment)
- [🛠️ Development](#️-development)
- [📖 Additional Guides](#-additional-guides)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## ✨ Features

### 🌟 Core Features
- **🏠 Interactive Landing Page** - Beautiful showcase of the API with live demos
- **📖 Comprehensive Documentation** - Complete API reference with examples
- **🧪 Interactive API Tester** - Test endpoints directly in the browser
- **🔐 Authentication System** - API key generation and management
- **📊 Analytics Dashboard** - Usage tracking and insights
- **🎨 Dark/Light Theme** - Full theme support with system preference detection

### 🔧 Technical Features
- **⚡ Modern Stack** - Vite + React + TypeScript + Tailwind CSS
- **📱 Responsive Design** - Mobile-first, works on all devices
- **♿ Accessibility** - WCAG compliant components
- **🚀 Performance Optimized** - Fast loading with code splitting
- **🤖 Keep-Alive System** - Prevents API hibernation (see [Keep-Alive Guide](#keep-alive-function))
- **🔒 Type-Safe** - Full TypeScript integration with API types

### 🍽️ Food API Features
- **🔍 Smart Search** - Search 750+ food items with autocomplete
- **📊 Nutrition Data** - Detailed calorie and nutrition information
- **🏷️ Categories** - 11 organized food categories
- **🇲🇾 Malaysian Focus** - Extensive Malaysian food database
- **🌍 International** - Global food items included

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/kalori-makanan-frontend.git
   cd kalori-makanan-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env-example.txt .env.local
   ```

   Update `.env.local` with your API credentials:
   ```env
   VITE_KALORI_MAKANAN_BASE_URL=https://kalori-makanan-kkm.onrender.com
   VITE_KALORI_MAKANAN_API_KEY=your_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   ```
   http://localhost:5173
   ```

## 🏗️ Project Structure

```
kalori-makanan-frontend/
├── 📁 src/
│   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 ui/             # Base UI components (Button, Card, etc.)
│   │   ├── Auth.tsx           # Authentication components
│   │   ├── Header.tsx         # Navigation header
│   │   └── Footer.tsx         # Site footer
│   ├── 📁 screen/             # Main page components
│   │   ├── Home.tsx           # Landing page
│   │   ├── Documentation.tsx  # API documentation
│   │   ├── Examples.tsx       # Code examples & testing
│   │   └── Dashboard.tsx      # User dashboard
│   ├── 📁 lib/                # Core utilities
│   │   ├── api.ts             # API client functions
│   │   ├── types.ts           # TypeScript interfaces
│   │   ├── auth.ts            # Authentication logic
│   │   └── db.ts              # Database utilities
│   ├── 📁 context/            # React context providers
│   └── 📁 utils/              # Helper functions
├── 📁 netlify/
│   └── 📁 functions/          # Serverless functions
│       └── keep-alive.mts     # API keep-alive function
├── 📁 public/                 # Static assets
├── 📄 README.md               # This file
├── 📄 LIVE_API_SETUP.md       # API setup guide
├── 📄 KEEP_ALIVE_FUNCTION.md  # Keep-alive documentation
└── 📄 todo.md                 # Development roadmap
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_KALORI_MAKANAN_BASE_URL` | API base URL | ✅ | `https://kalori-makanan-kkm.onrender.com` |
| `VITE_KALORI_MAKANAN_API_KEY` | API authentication key | ✅ | - |
| `VITE_TURSO_DB_URL` | Database URL for user data | ⚠️ | - |
| `VITE_TURSO_DB_AUTH_TOKEN` | Database auth token | ⚠️ | - |

⚠️ = Required for full functionality

### Build Configuration

The project uses Vite with optimized build settings:
- **Output**: `dist/` directory
- **Assets**: Automatic optimization and hashing
- **Code Splitting**: Automatic for optimal loading
- **Source Maps**: Enabled for debugging

## 📚 Documentation

The platform includes comprehensive documentation:

### 📖 Built-in Documentation
- **API Reference** - Complete endpoint documentation
- **Code Examples** - Copy-paste ready examples in multiple languages
- **Authentication Guide** - API key setup and usage
- **Error Handling** - Common issues and solutions

### 🔗 External Links
- **Live API Docs**: [https://kalori-makanan-kkm.onrender.com/docs](https://kalori-makanan-kkm.onrender.com/docs)
- **ReDoc Interface**: [https://kalori-makanan-kkm.onrender.com/redoc](https://kalori-makanan-kkm.onrender.com/redoc)

## 🎨 UI Components

### Base Components
- **Button** - Various styles and states
- **Card** - Content containers with shadows
- **Badge** - Status and category indicators
- **CodeBlock** - Syntax-highlighted code display

### Layout Components
- **Header** - Navigation with theme toggle
- **Footer** - Links and information
- **Container** - Responsive content wrapper

### Feature Components
- **ApiTester** - Interactive API testing interface
- **Auth** - Authentication forms and management
- **UsageChart** - Analytics visualization

## 🔌 API Integration

### Type-Safe API Client

The platform includes a comprehensive API client with:

```typescript
// Example API usage
import { searchFoods, getCategories } from './lib/api';

// Search for foods
const results = await searchFoods('nasi lemak');

// Get all categories
const categories = await getCategories();
```

### Supported Endpoints
- `GET /health` - API health check
- `GET /foods/search` - Search food items
- `GET /foods/{id}` - Get specific food
- `GET /foods` - List all foods (paginated)
- `GET /categories` - Get food categories
- `GET /foods/search/{name}/calories` - Quick calorie lookup

### Error Handling
- Automatic retry for failed requests
- User-friendly error messages
- Comprehensive logging for debugging

## 🚀 Deployment

### Netlify Deployment (Recommended)

1. **Connect your repository** to Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. **Set environment variables** in Netlify dashboard
4. **Deploy** and enjoy!

### Manual Deployment

```bash
# Build for production
npm run build

# Preview build locally
npm run preview

# Deploy to Netlify
npm run netlify:deploy
```

### Keep-Alive Function

The project includes an automatic keep-alive system that prevents your API from hibernating on free hosting services. See the [Keep-Alive Function Guide](#keep-alive-function) for details.

## 🛠️ Development

### Available Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run preview          # Preview production build

# Testing & Quality
npm run lint             # Run ESLint
npm run type-check       # TypeScript checking

# Netlify
npm run netlify:dev      # Netlify dev environment
npm run netlify:build    # Build for Netlify
npm run netlify:deploy   # Deploy to Netlify
```

### Development Guidelines

- **TypeScript**: All code must be typed
- **ESLint**: Follow configured linting rules
- **Responsive**: Mobile-first design approach
- **Accessibility**: Ensure components are accessible
- **Performance**: Optimize for fast loading

### Tech Stack Details

| Technology | Purpose | Version |
|------------|---------|---------|
| **React** | UI Framework | 18.2+ |
| **TypeScript** | Type Safety | 5.2+ |
| **Vite** | Build Tool | 5.2+ |
| **Tailwind CSS** | Styling | 3.4+ |
| **Framer Motion** | Animations | 12.23+ |
| **SWR** | Data Fetching | 2.3+ |
| **Lucide React** | Icons | 0.525+ |

## 📖 Additional Guides

### 📋 Detailed Documentation

1. **[🔄 Keep-Alive Function](KEEP_ALIVE_FUNCTION.md)**
   - Prevents API hibernation
   - Automatic scheduling options
   - Configuration and monitoring
   - Troubleshooting guide

2. **[🔌 Live API Setup](LIVE_API_SETUP.md)**
   - Environment configuration
   - API key setup
   - Testing your integration
   - Troubleshooting common issues

3. **[📝 Development Roadmap](todo.md)**
   - Completed features checklist
   - Future improvement plans
   - Phase-by-phase enhancement roadmap

### 🎯 Quick Navigation

- **Need to set up the API?** → [Live API Setup Guide](LIVE_API_SETUP.md)
- **API going to sleep?** → [Keep-Alive Function](KEEP_ALIVE_FUNCTION.md)
- **Want to contribute?** → [Development Roadmap](todo.md)
- **Found a bug?** → [Create an issue](https://github.com/Zen0space/kalori-makanan-frontend/issues)

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### 🐛 Reporting Issues
1. Check existing issues first
2. Use the issue template
3. Provide detailed reproduction steps

### 💡 Suggesting Features
1. Check the [roadmap](todo.md) first
2. Create a feature request issue
3. Explain the use case and benefits

### 🔧 Development Contributions
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### 📝 Documentation
- Improve existing docs
- Add examples and tutorials
- Fix typos and errors

## 🏆 Project Status

- ✅ **Core Features**: Complete
- ✅ **Authentication**: Implemented
- ✅ **API Integration**: Full coverage
- ✅ **Documentation**: Comprehensive
- ✅ **Deployment**: Production ready
- 🚀 **Future Enhancements**: [See roadmap](todo.md)

## 📊 Key Metrics

- **🍽️ Food Items**: 750+ in database
- **🏷️ Categories**: 11 organized groups
- **⚡ Performance**: Lighthouse score 90+
- **📱 Mobile**: Fully responsive
- **♿ Accessibility**: WCAG 2.1 compliant
- **🔒 Security**: Type-safe with error handling

## 📞 Support

### Getting Help

1. **📖 Documentation**: Check the guides above
2. **🐛 Issues**: [GitHub Issues](https://github.com/Zen0space/kalori-makanan-frontend/issues)
3. **💬 Discussions**: [GitHub Discussions](https://github.com/Zen0space/kalori-makanan-frontend/discussions)
4. **📧 Email**: Support contact (if available)

### Useful Links

- **🌐 Live Demo**: [https://kalori-me.senitera.com/]
- **📚 API Docs**: [https://kalori-makanan-kkm.onrender.com/docs](https://kalori-makanan-kkm.onrender.com/docs)
- **🔧 Backend Repo**: [Backend repository link]

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

**Built with ❤️ for the developer community**

🍽️ **Kalori Makanan Frontend** - Making nutrition data accessible through beautiful, fast, and reliable APIs

[⭐ Star this repo](https://github.com/Zen0space/kalori-makanan-frontend) • [🐛 Report Bug](https://github.com/Zen0space/kalori-makanan-frontend/issues) • [💡 Request Feature](https://github.com/Zen0space/kalori-makanan-frontend/issues)

</div>
