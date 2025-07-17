# 🛍️ Nuvora Store - Modern E-commerce Website

A modern, responsive e-commerce website built with React, TypeScript, and TailwindCSS. Features a professional design with product browsing, shopping cart functionality, and mobile-responsive layout.

## ✨ Features

- **Product Catalog**: Browse products with advanced filtering and search
- **Shopping Cart**: Add/remove items with localStorage persistence
- **Responsive Design**: Mobile-first approach with TailwindCSS
- **Product Details**: Detailed product pages with image galleries
- **Category Navigation**: Organized product categories
- **Professional Pages**: About, Deals, Support pages
- **WhatsApp Integration**: Floating WhatsApp button for customer support
- **Modern UI**: Clean, professional interface with smooth animations

## 🚀 Live Demo

Visit the live site: [Nuvora Store](https://YOUR_USERNAME.github.io/nuvora-fakestore/)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS
- **Build Tool**: Vite
- **Routing**: React Router v7
- **State Management**: React Context API
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/YOUR_USERNAME/nuvora-fakestore.git
cd nuvora-fakestore
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

## 🏗️ Build

To build the project for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. **Create a GitHub repository** named `nuvora-fakestore`

2. **Push your code**:
```bash
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/nuvora-fakestore.git
git push -u origin main
```

3. **Enable GitHub Pages**:
   - Go to your repository settings
   - Navigate to "Pages" section
   - Set source to "GitHub Actions"

4. **The site will automatically deploy** when you push to main branch

### Manual Deployment

You can also use the included deployment script:

```bash
./deploy.sh
```

## 🎨 Customization

### Colors & Branding
- Update colors in `tailwind.config.js`
- Change logo and brand name in `src/components/ecommerce/header.tsx`
- Modify the color scheme throughout the components

### Product Data
- Update product information in `src/data/mock-products.ts`
- Add new categories and products as needed
- Modify product properties to match your needs

### WhatsApp Integration
- Update the WhatsApp number in `src/components/ecommerce/whatsapp-float.tsx`
- Customize the chat widget appearance and messages

## 📱 Features Overview

### Shopping Cart
- Add/remove items
- Quantity management
- localStorage persistence
- Real-time total calculation
- Free shipping threshold

### Product Pages
- Image galleries with navigation
- Product specifications
- Related products
- Stock status
- Customer reviews display

### Responsive Design
- Mobile-first approach
- Touch-friendly interface
- Optimized for all screen sizes
- Fast loading performance

## 🔧 Configuration

### Vite Configuration
The project uses Vite for build tooling. Key configurations:
- Base path set for GitHub Pages
- TypeScript support
- TailwindCSS integration
- Path aliases for clean imports

### Environment Variables
Create a `.env` file for environment-specific settings:
```
VITE_WHATSAPP_NUMBER=+1234567890
VITE_SITE_URL=https://yourdomain.com
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- React Team for the amazing framework
- TailwindCSS for the utility-first CSS framework
- Lucide for the beautiful icons
- Vite for the fast build tool

## 📞 Support

For support, email support@nuvorastore.com or use the WhatsApp button on the website.

---

Made with ❤️ by [Your Name]
- `pages`: Contains the main pages of the application. (Example: `Home`, `About`, etc.)
- `layouts`: Contains layout components for the application. (Example: `MainLayout`, `AuthLayout`, etc.)
- `providers`: Contains context providers for state management and other functionalities. (Example: `AuthProvider`,
  `AlertProvider`, etc.)
- `services`: Contains API service files for data fetching. (Example: `HttpClient` for data fetching)

## License

This project is licensed under the MIT License. See the `LICENSE` file for more details.
