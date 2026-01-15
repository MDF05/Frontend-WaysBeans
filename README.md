# WaysBean Frontend Client

> **Modern Coffee E-commerce Interface**

The **WaysBean Frontend** is a polished, responsive web application built to provide an exceptional user experience for coffee lovers. It connects seamlessly with the WaysBean Backend API.

## Frontend Overview
- **Platform**: Web (Single Page Application)
- **Framework**: React.js (Vite)
- **Styling**: Chakra UI & TailwindCSS
- **State**: Redux Toolkit

## Features
- :sparkles: **Modern UI**: Clean, responsive design using Chakra UI.
- :iphone: **Mobile First**: Optimized for all device sizes.
- :rocket: **Fast Performance**: Powered by Vite and optimized assets.
- :shopping_cart: **Dynamic Cart**: Real-time state management for shopping cart.
- :art: **Animations**: Smooth transitions with Framer Motion.
- :bell: **Live Updates**: Real-time order status via Socket.io.

## Tech Stack
- **Core**: [React](https://react.dev/), [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/)
- **UI Context**: [Chakra UI](https://chakra-ui.com/), [TailwindCSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Data Fetching**: [Axios](https://axios-http.com/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)

## Installation

1.  **Navigate to the frontend directory**
    ```bash
    cd Frontend-WaysBeans
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file and configure the backend URL.
    See **[ENVIRONMENT.md](./ENVIRONMENT.md)**.
    ```bash
    VITE_API_BASE_URL="http://localhost:5000/api/v1"
    ```

## Development Workflow

Start the development server with HMR (Hot Module Replacement):
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

## Build & Deployment

To create a production build:
```bash
npm run build
```
See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed hosting instructions (Vercel, Netlify, etc.).

## 📚 Documentation

The frontend documentation is organized as follows:

### Technical Docs
- **[System Architecture](./ARCHITECTURE.md)**: Component hierarchy and state flow.
- **[Style Guide](./STYLE_GUIDE.md)**: Component patterns and styling rules.
- **[Environment Setup](./ENVIRONMENT.md)**: Configuration reference.

### Operational Docs
- **[Deployment Guide](./DEPLOYMENT.md)**: Build and deploy instructions.
- **[Testing Strategy](./TESTING.md)**: Testing tools and plans.

### Community & Legal
- **[Contributing](./CONTRIBUTING.md)**: Guidelines for UI contributions.
- **[Code of Conduct](./CODE_OF_CONDUCT.md)**: Community standards.
- **[Changelog](./CHANGELOG.md)**: Version history.
- **[Roadmap](./ROADMAP.md)**: Future features.
- **[Support](./SUPPORT.md)**: Where to get help.
- **[Disclaimer](./DISCLAIMER.md)**: Usage terms.
- **[License](./LICENSE)**: MIT License.

## Contribution Guide

1.  Fork the repo.
2.  Create a feature branch (`feat/new-ui-component`).
3.  Commit changes.
4.  Push to branch.
5.  Open a Pull Request.

Please Lint your code before committing:
```bash
npm run lint
```

## Author

- **WaysBean Team**
- **Contact**: `frontend@waysbean.com`

---
*Built with React & Passion* ⚛️
