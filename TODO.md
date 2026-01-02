## Phase 1: Setup Backend Infrastructure
- [x] Update package.json with backend dependencies
- [x] Create server.js with Express setup
- [x] Create database.js for SQLite setup
- [x] Create database schema and seed initial data

## Phase 2: Implement API Routes
- [x] Create routes/products.js (CRUD for products)
- [x] Create routes/users.js (register, login, profile)
- [x] Create routes/orders.js (place order, get orders)
- [x] Create routes/cart.js (cart management)
- [x] Create middleware/auth.js for authentication

## Phase 3: Update Frontend Integration
- [x] Update AppContext.tsx to use API calls instead of localStorage
- [x] Add API base URL configuration
- [x] Handle authentication tokens
- [x] Fix Auth.tsx component for proper authentication flow
- [x] Create admin user in database

## Phase 4: Testing and Finalization
- [x] Install backend dependencies
- [x] Start backend server
- [x] Test all API endpoints
- [x] Test frontend-backend integration
- [x] Update README with backend setup instructions

## Phase 5: Audio Integration
- [x] Add Netflix Ta-dum sound effect to splash screen
=======
# TechHub Premium Gadget Store - Setup Guide

## Quick Start: Run Backend and Frontend

### Start Backend Server
```bash
cd backend
node server.js
```
Backend runs on http://localhost:5000

### Start Frontend Server (in separate terminal)
```bash
npm run dev
```
Frontend runs on http://localhost:3000

### Access Website
Open browser to http://localhost:3000

---

## How to Run the Website

### Prerequisites
- Node.js installed (version 16 or higher)
- npm or yarn package manager

### Step-by-Step Setup

#### 1. Install Frontend Dependencies
```bash
npm install
```

#### 2. Install Backend Dependencies
```bash
cd backend
npm install
cd ..
```

#### 3. Start the Backend Server
Open a new terminal and run:
```bash
cd backend
node server.js
```
The backend will start on http://localhost:5000

#### 4. Start the Frontend Development Server
In a separate terminal, run:
```bash
npm run dev
```
The frontend will start on http://localhost:3000

#### 5. Access the Website
Open your browser and go to: http://localhost:3000

### Default Admin Credentials
- Email: admin@techhub.com
- Password: admin123

### Features Available
- Browse products by category
- User registration and login
- Add products to cart
- Place orders
- Admin dashboard for product management
- Responsive design for mobile and desktop

### Troubleshooting
- If you get "failed to fetch" errors, ensure both servers are running
- Check browser console for detailed error messages
- Make sure ports 3000 and 5000 are not blocked by firewall

---

# Backend Implementation Plan

## Phase 1: Setup Backend Infrastructure
- [x] Update package.json with backend dependencies
- [x] Create server.js with Express setup
- [x] Create database.js for SQLite setup
- [x] Create database schema and seed initial data

## Phase 2: Implement API Routes
- [x] Create routes/products.js (CRUD for products)
- [x] Create routes/users.js (register, login, profile)
- [x] Create routes/orders.js (place order, get orders)
- [x] Create routes/cart.js (cart management)
- [x] Create middleware/auth.js for authentication

## Phase 3: Update Frontend Integration
- [x] Update AppContext.tsx to use API calls instead of localStorage
- [x] Add API base URL configuration
- [x] Handle authentication tokens
- [x] Fix Auth.tsx component for proper authentication flow
- [x] Create admin user in database

## Phase 4: Testing and Finalization
- [x] Install backend dependencies
- [x] Start backend server
- [x] Test all API endpoints
- [x] Test frontend-backend integration
- [x] Update README with backend setup instructions
