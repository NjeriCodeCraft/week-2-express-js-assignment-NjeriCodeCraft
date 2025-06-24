const express = require('express');
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const { NotFoundError } = require('../Utils/errors');

// Middleware
const authenticate = require('../middleware/auth');
const validateProduct = require('../middleware/validateProduct');

// Apply auth to all routes
router.use(authenticate);

// Temporary in-memory data
let products = [
  {
    id: uuidv4(),
    name: "Laptop",
    description: "A powerful machine",
    price: 999.99,
    category: "electronics",
    inStock: true
  }
];

// GET all products with optional filtering + pagination
router.get('/', (req, res) => {
  let result = [...products];

  // Filter by category
  if (req.query.category) {
    result = result.filter(p => p.category === req.query.category);
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length;
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = result.slice(start, end);

  res.json({
    page,
    limit,
    total: result.length,
    data: paginated
  });
});

// GET product by ID
router.get('/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id);
  if (!product) throw new NotFoundError('Product not found');
  res.json(product);
});

// POST create product (with validation)
router.post('/', validateProduct, (req, res) => {
  const { name, description, price, category, inStock } = req.body;
  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

// PUT update product (with validation)
router.put('/:id', validateProduct, (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const { name, description, price, category, inStock } = req.body;
  products[index] = {
    id: products[index].id,
    name,
    description,
    price,
    category,
    inStock
  };
  res.json(products[index]);
});

// DELETE product
router.delete('/:id', (req, res) => {
  const index = products.findIndex(p => p.id === req.params.id);
  if (index === -1) return res.status(404).json({ error: 'Product not found' });

  const deletedProduct = products.splice(index, 1)[0];
  res.json({ message: 'Product deleted', deletedProduct });
});

// SEARCH by name: /api/products/search?name=lamp
router.get('/search', (req, res) => {
  const name = req.query.name?.toLowerCase();
  if (!name) return res.status(400).json({ error: 'Missing name query param' });

  const matches = products.filter(p =>
    p.name.toLowerCase().includes(name)
  );

  res.json(matches);
});

// STATS: count of products per category
router.get('/stats', (req, res) => {
  const stats = {};
  products.forEach(p => {
    stats[p.category] = (stats[p.category] || 0) + 1;
  });

  res.json({
    totalProducts: products.length,
    countByCategory: stats
  });
});

module.exports = router;
