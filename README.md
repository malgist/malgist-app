<div align="center">
  <img src="public/LogoMalgist2.png" alt="Malgist Logo" width="200"/>

  # Malgist

  ### Intelligent DeFi Portfolio Management Platform

  [![Next.js](https://img.shields.io/badge/Next.js-16.0.5-black?style=flat&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/license-MIT-green?style=flat)](LICENSE)

  *Maximize your DeFi yields with AI-powered portfolio optimization*

  [Live Demo](#) • [Documentation](#) • [Report Bug](#) • [Request Feature](#)
</div>

---

## ✨ Overview

**Malgist** is a cutting-edge DeFi portfolio management platform that leverages artificial intelligence to help users optimize their cryptocurrency investments across multiple protocols. Built on Web3 technology, Malgist provides intelligent strategy recommendations, real-time portfolio tracking, and seamless interaction with leading DeFi protocols.

### 🎯 Key Features

- **🤖 AI-Powered Strategy Builder** - Get personalized investment strategies based on your risk tolerance and goals
- **📊 Real-Time Portfolio Analytics** - Track your positions, earnings, and performance across multiple protocols
- **🔄 Automated Rebalancing** - Keep your portfolio optimized with smart rebalancing recommendations
- **🏆 Community Leaderboard** - Compare strategies and learn from top performers
- **📈 Multi-Protocol Support** - Integrate with Aave, Lido, Compound, and more
- **🔐 Non-Custodial** - Your keys, your crypto - full control over your assets
- **📱 Responsive Design** - Beautiful interface that works on all devices

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun
- A Web3 wallet (MetaMask, WalletConnect, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/malgist-app.git
   cd malgist-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Configure your `.env.local` with necessary API keys and configurations.

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🏗️ Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) - React framework with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe development
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **UI Components**:
  - [Radix UI](https://www.radix-ui.com/) - Accessible component primitives
  - [Lucide React](https://lucide.dev/) - Beautiful icon library
- **Animations**: [Framer Motion](https://www.framer.com/motion/) - Production-ready motion library
- **Charts**: [Recharts](https://recharts.org/) - Composable charting library

### Web3 Integration
- **Wallet Connection**: [RainbowKit](https://www.rainbowkit.com/) - Best-in-class wallet connection
- **Web3 Library**: [Wagmi](https://wagmi.sh/) - React Hooks for Ethereum
- **Ethereum Client**: [Viem](https://viem.sh/) - TypeScript interface for Ethereum
- **Provider**: [Ethers.js](https://docs.ethers.org/) - Ethereum library

### State Management & Data
- **Data Fetching**: [TanStack Query](https://tanstack.com/query) - Powerful async state management
- **Drag & Drop**: [dnd-kit](https://dndkit.com/) - Modern drag and drop toolkit

---

## 📁 Project Structure

```
malgist-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Dashboard/Portfolio page
│   ├── strategy/                # Strategy builder
│   ├── leaderboard/            # Community leaderboard
│   ├── profile/                # User profiles
│   └── reports/                # Monthly reports
├── components/                  # React components
│   ├── layout/                 # Layout components
│   │   ├── DashboardLayout.tsx
│   │   └── Sidebar.tsx
│   ├── portfolio/              # Portfolio management
│   │   ├── DepositModal.tsx
│   │   ├── WithdrawModal.tsx
│   │   ├── RebalanceModal.tsx
│   │   └── PositionCard.tsx
│   ├── strategy/               # Strategy builder components
│   │   ├── AIQuestionnaireModal.tsx
│   │   ├── StrategyCanvas.tsx
│   │   ├── ProtocolLibrary.tsx
│   │   └── AllocationCard.tsx
│   ├── leaderboard/            # Leaderboard components
│   ├── wallet/                 # Web3 wallet components
│   └── providers/              # React context providers
├── lib/                         # Utilities and configurations
│   ├── wagmi.ts                # Wagmi configuration
│   └── avatar.ts               # Avatar generation
├── types/                       # TypeScript type definitions
│   └── index.ts
├── public/                      # Static assets
└── package.json                # Project dependencies
```

---

## 💡 Core Features

### 1. Portfolio Dashboard
Monitor all your DeFi positions in one place:
- Real-time balance tracking across protocols
- Total value locked (TVL) and APY calculations
- Historical performance charts
- Quick deposit, withdraw, and rebalance actions

### 2. AI Strategy Builder
Create optimized investment strategies:
- Answer a few questions about your goals
- Get AI-powered allocation recommendations
- Customize protocols and percentages with drag-and-drop
- Visual strategy canvas with real-time analytics

### 3. Smart Rebalancing
Keep your portfolio optimized:
- Automated rebalancing suggestions
- Visual comparison of current vs. target allocations
- Gas-efficient execution strategies
- Historical rebalancing performance

### 4. Community Leaderboard
Learn from the best:
- Top-performing strategies ranked by performance
- Detailed strategy breakdowns
- Follow and copy successful allocations
- User profiles with strategy history

### 5. Monthly Reports
Track your progress:
- Comprehensive monthly performance summaries
- Protocol-wise earnings breakdown
- Risk-adjusted returns analysis
- Downloadable PDF reports

---

## 🔧 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint
```

### Code Quality

This project follows modern React and TypeScript best practices:
- Functional components with hooks
- TypeScript strict mode enabled
- ESLint for code quality
- Organized component structure
- Responsive design patterns

---

## 🌐 Supported Protocols

Malgist currently integrates with leading DeFi protocols:

| Protocol | Type | Networks |
|----------|------|----------|
| **Aave V3** | Lending | Ethereum, Polygon, Arbitrum |
| **Lido** | Staking | Ethereum |
| **Compound V3** | Lending | Ethereum, Base |
| **Yearn Finance** | Yield Aggregator | Ethereum |
| **Convex Finance** | Yield Optimizer | Ethereum |

*More protocols coming soon!*

---

## 🔐 Security

- **Non-custodial**: You always maintain full control of your funds
- **Audited contracts**: All integrated protocols are battle-tested
- **No private key storage**: Wallet connection via secure Web3 providers
- **Open source**: Transparent codebase for community review

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Wallet integration by [RainbowKit](https://www.rainbowkit.com/)
- UI components from [Radix UI](https://www.radix-ui.com/)
- Charts powered by [Recharts](https://recharts.org/)
- Icons by [Lucide](https://lucide.dev/)

---

## 📞 Support

- **Documentation**: [docs.malgist.io](#)
- **Discord**: [Join our community](#)
- **Twitter**: [@malgist](#)
- **Email**: support@malgist.io

---

<div align="center">

  **Made with ❤️ by the Malgist Team**

  [Website](#) • [Twitter](#) • [Discord](#) • [Telegram](#)

</div>
