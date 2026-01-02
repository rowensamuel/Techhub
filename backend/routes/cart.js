const express = require('express');
const jwt = require('jsonwebtoken');
const { getUserCart, addToCart, updateCartQuantity, removeFromCart, clearCart } = require('../database');

const router = express.Router();

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Get user's cart
router.get('/', authenticateToken, async (req, res) => {
  try {
    const cart = await getUserCart(req.user.id);
    res.json(cart);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ error: 'Failed to get cart' });
  }
});

// Add item to cart
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const cartItem = await addToCart(req.user.id, productId, quantity);
    // Return updated cart
    const updatedCart = await getUserCart(req.user.id);
    res.status(201).json(updatedCart);
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ error: 'Failed to add item to cart' });
  }
});

// Update cart item quantity
router.put('/:productId', authenticateToken, async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (!quantity) {
      return res.status(400).json({ error: 'Missing quantity' });
    }

    await updateCartQuantity(req.user.id, productId, quantity);
    // Return updated cart
    const updatedCart = await getUserCart(req.user.id);
    res.json(updatedCart);
  } catch (error) {
    console.error('Update cart error:', error);
    res.status(500).json({ error: 'Failed to update cart item' });
  }
});

// Remove item from cart
router.delete('/:productId', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;

    await removeFromCart(req.user.id, productId);
    // Return updated cart
    const updatedCart = await getUserCart(req.user.id);
    res.json(updatedCart);
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ error: 'Failed to remove item from cart' });
  }
});

// Clear cart
router.delete('/', authenticateToken, async (req, res) => {
  try {
    await clearCart(req.user.id);
    res.json([]);
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ error: 'Failed to clear cart' });
  }
});

module.exports = router;
