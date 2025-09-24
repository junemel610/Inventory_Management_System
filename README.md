# Vinarao LPG Trading - Inventory Management System

A modern, responsive web application for managing LPG (Liquefied Petroleum Gas) inventory and sales. Built with React, this application provides a complete e-commerce solution for LPG trading businesses with separate interfaces for customers and administrators.

## 🚀 Features

### Customer Features
- **Product Browsing**: Browse LPG products by weight categories (2.7kg, 11kg, 22kg, 50kg)
- **Shopping Cart**: Add products to cart, modify quantities, and view totals
- **User Authentication**: Secure login and account creation
- **Order Management**: Place orders and view order history
- **Profile Management**: Update personal information and account details
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Admin Features
- **Product Management**: Add, view, and delete products from inventory
- **Order Management**: View pending orders and update order status
- **Dashboard**: Comprehensive admin interface for business operations

### Technical Features
- **Persistent Cart**: Cart contents saved across browser sessions
- **Real-time Updates**: Live cart count and order status updates
- **Modern UI**: Clean, professional interface with smooth animations
- **Accessibility**: Proper focus management and keyboard navigation
- **Performance**: Optimized React components with efficient state management

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Routing**: React Router DOM 7.9.1
- **Styling**: Styled Components 6.1.19
- **State Management**: React Context API
- **Build Tool**: Create React App
- **Package Manager**: npm

## 📁 Project Structure

```
frontend-web/
├── public/
│   ├── assets/          # Static assets (images, fonts)
│   ├── fonts/           # Custom fonts
│   └── index.html       # Main HTML template
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── Header.js           # Navigation header
│   │   ├── Card.js             # Product card component
│   │   └── BackgroundContainer.js # Background wrapper
│   ├── contexts/        # React Context providers
│   │   ├── CartContext.js      # Cart state management
│   │   └── OrderContext.js     # Order state management
│   ├── pages/           # Main application pages
│   │   ├── Login.js            # User authentication
│   │   ├── CustomerHome.js     # Product browsing
│   │   ├── Cart.js             # Shopping cart
│   │   ├── Checkout.js         # Order placement
│   │   ├── OrderHistory.js     # Order history
│   │   ├── UserProfile.js      # User profile management
│   │   ├── CreateUser.js       # Account creation
│   │   ├── AdminHome.js        # Admin dashboard
│   │   ├── Home.js             # Landing page
│   │   └── About.js            # About page
│   ├── utils/           # Utility functions
│   │   └── api.js              # API utilities
│   ├── data.js          # Product data
│   ├── App.js           # Main application component
│   ├── App.css          # Global styles
│   └── index.js         # Application entry point
└── package.json         # Dependencies and scripts
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd frontend-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📖 Usage

### For Customers
1. **Login or Create Account**: Start by logging in or creating a new account
2. **Browse Products**: Use the weight filter tabs to browse different LPG products
3. **Add to Cart**: Click on products to add them to your cart with desired quantities
4. **Manage Cart**: View cart contents, modify quantities, or remove items
5. **Checkout**: Provide delivery information and place your order
6. **Track Orders**: View your order history and current order status

### For Administrators
1. **Admin Login**: Use admin credentials to access the admin interface
2. **Manage Products**: Add new products or remove existing ones
3. **Process Orders**: View pending orders and update their status
4. **Monitor Business**: Track inventory and order metrics

## 🏗️ Architecture

### State Management
The application uses React Context API for global state management:
- **CartContext**: Manages shopping cart state with localStorage persistence
- **OrderContext**: Handles order data and status updates

### Component Structure
- **Pages**: Main route components representing different screens
- **Components**: Reusable UI elements (Header, Card, etc.)
- **Contexts**: Global state providers for cart and orders

### Styling Approach
- **Styled Components**: CSS-in-JS for component-scoped styling
- **Responsive Design**: Mobile-first approach with media queries
- **Custom Fonts**: Integrated Freeman, JosefinSans, and Kanit fonts
- **Consistent Design System**: Unified color scheme and spacing

### Data Persistence
- **localStorage**: Cart and order data persist across browser sessions
- **Context State**: Real-time state updates across components
- **Error Handling**: Graceful fallbacks for storage operations

## 🎨 Design System

### Colors
- **Primary**: #007bff (Blue)
- **Success**: #28a745 (Green)
- **Danger**: #dc3545 (Red)
- **Secondary**: #6c757d (Gray)
- **Background**: Custom LPG-themed background

### Typography
- **Headers**: Freeman font family
- **Body Text**: JosefinSans font family
- **Accent**: Kanit font family

### Components
- **Buttons**: Consistent sizing with hover effects
- **Cards**: Shadowed containers with rounded corners
- **Forms**: Clean input styling with focus states
- **Navigation**: Responsive header with mobile menu

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm test` - Run test suite
- `npm run build` - Create production build
- `npm run eject` - Eject from Create React App

### Code Style
- ESLint configuration for code quality
- Prettier for consistent formatting
- Component-based architecture
- Functional components with hooks

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Desktop**: Full feature set with grid layouts
- **Tablet**: Adapted layouts with touch-friendly controls
- **Mobile**: Single-column layouts with optimized navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👥 Authors

- **Developer**: Meljune Royette G. Go
- **Course**: Software Design (CPE 025)
- **Institution**: Technological Institute of the Philippines - QC

## 🙏 Acknowledgments

- React community for excellent documentation
- Styled Components for CSS-in-JS solution
- Create React App for streamlined development setup
- LPG industry for inspiring this inventory management solution