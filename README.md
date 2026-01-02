<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# TechHub - Premium Gadget Store

A full-stack e-commerce application for premium tech gadgets with user authentication, shopping cart, and admin dashboard.

## Features

- 🔐 User authentication (login/register)
- 👨‍💼 Admin dashboard access
- 🛒 Shopping cart functionality
- 💳 Secure checkout process
- 📱 Responsive design
- 🎨 Modern UI with dark theme
- 🔄 Real-time cart updates
- 📊 Order management

## Tech Stack

### Frontend
- React 19 with TypeScript
- Vite for build tooling
- Lucide React for icons
- Tailwind CSS for styling

### Backend
- Node.js with Express
- SQLite database
- JWT authentication
- bcryptjs for password hashing
- CORS enabled

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## Installation & Setup

### 1. Clone the repository
```bash
git clone <repository-url>
cd techhub---premium-gadget-store
```

### 2. Install Frontend Dependencies
```bash
npm install
```

### 3. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

### 4. Set Environment Variables (Optional)
Create a `.env.local` file in the root directory and add your Gemini API key if needed:
```
GEMINI_API_KEY=your_api_key_here
```

### 5. Start the Backend Server
```bash
cd backend
npm start
# or for development
node server.js
```
The backend will run on `http://localhost:5000`

### 6. Start the Frontend (in a new terminal)
```bash
npm run dev
```
The frontend will run on `http://localhost:3000` or `http://localhost:3001`

## Usage

### User Accounts
- **Regular User**: Register a new account or login with existing credentials
- **Admin User**: Use the "Administrator Override" button with:
  - Email: `admin@techhub.com`
  - Password: `admin123`

### Features
1. **Browse Products**: View all available gadgets on the store page
2. **Add to Cart**: Click "Add to Cart" on any product
3. **Manage Cart**: View cart, update quantities, or remove items
4. **Checkout**: Proceed to checkout, fill shipping details, and complete purchase
5. **Order History**: View your order history (when logged in)

## API Endpoints

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile (protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart
- `GET /api/cart` - Get user's cart (protected)
- `POST /api/cart` - Add item to cart (protected)
- `PUT /api/cart/:productId` - Update cart item quantity (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear entire cart (protected)

### Orders
- `GET /api/orders` - Get user's orders (protected)
- `POST /api/orders` - Create new order (protected)

## Database

The application uses SQLite database (`techhub.db`) with the following tables:
- `users` - User accounts and authentication
- `products` - Product catalog
- `cart` - Shopping cart items
- `orders` - Order records
- `order_items` - Individual order items

## Development

### Project Structure
```
techhub---premium-gadget-store/
├── backend/                 # Express.js backend
│   ├── routes/             # API route handlers
│   ├── database.js         # Database setup and functions
│   ├── server.js           # Main server file
│   └── package.json        # Backend dependencies
├── components/             # React components
├── context/                # React context providers
├── pages/                  # Page components
├── constants.tsx           # App constants
├── types.ts                # TypeScript type definitions
└── package.json            # Frontend dependencies
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
