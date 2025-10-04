import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import rateLimit from 'express-rate-limit'

// Import routes
import authRoutes from './routes/auth'
import productRoutes from './routes/products'
import cartRoutes from './routes/cart'
import orderRoutes from './routes/orders'
import categoryRoutes from './routes/categories'
import searchRoutes from './routes/search'
import checkoutRoutes from './routes/checkout'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
})

// Middleware
app.use(helmet())
app.use(cors({
  origin: [
    process.env.FRONTEND_URL || 'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:4789',
    'http://localhost:4789',
    'https://ai-powered-en-commerce-platform.vercel.app',
    'https://ai-powered-e-commerce-platform.vercel.app',
    /\.vercel\.app$/,
    /\.netlify\.app$/
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))
app.use(morgan('combined'))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use('/api/', limiter)

// CRITICAL: Register all API routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/checkout', checkoutRoutes)

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    // Test database connection
    const { prisma } = await import('./lib/prisma')
    await prisma.$connect()
    
    // Count records to verify seeding
    const [userCount, productCount, categoryCount] = await Promise.all([
      prisma.user.count(),
      prisma.product.count(),
      prisma.category.count()
    ])
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      data: {
        users: userCount,
        products: productCount,
        categories: categoryCount
      },
      version: '2.0.0'
    })
  } catch (error) {
    console.error('Health check failed:', error)
    res.status(500).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// Test endpoint with version info
app.get('/test', (req, res) => {
  res.json({ 
    message: 'AI E-commerce API is working!',
    version: '2.0.0',
    timestamp: new Date().toISOString(),
    routes: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      categories: '/api/categories',
      search: '/api/search',
      checkout: '/api/checkout'
    }
  })
})

// Emergency setup endpoint - creates everything in one go
app.get('/emergency-setup', async (req, res) => {
  try {
    const { prisma } = await import('./lib/prisma')
    const bcrypt = require('bcryptjs')
    
    let results = {
      tablesCreated: false,
      categoriesAdded: 0,
      productsAdded: 0,
      usersAdded: 0,
      errors: []
    }

    // Step 1: Create tables
    try {
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "users" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          "email" TEXT NOT NULL UNIQUE,
          "password" TEXT NOT NULL,
          "name" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "categories" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          "name" TEXT NOT NULL UNIQUE,
          "description" TEXT,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
        );
      `
      
      await prisma.$executeRaw`
        CREATE TABLE IF NOT EXISTS "products" (
          "id" TEXT NOT NULL PRIMARY KEY DEFAULT (lower(hex(randomblob(16)))),
          "title" TEXT NOT NULL,
          "description" TEXT,
          "price" REAL NOT NULL,
          "image" TEXT,
          "stock" INTEGER NOT NULL DEFAULT 0,
          "categoryId" TEXT NOT NULL,
          "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
        );
      `
      
      results.tablesCreated = true
    } catch (error) {
      results.errors.push(`Table creation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Step 2: Add categories
    try {
      const categories = [
        { name: 'Electronics', description: 'Electronic devices and gadgets' },
        { name: 'Clothing', description: 'Fashion and apparel' },
        { name: 'Books', description: 'Books and literature' },
        { name: 'Home & Garden', description: 'Home improvement and garden supplies' }
      ]

      for (const category of categories) {
        const catId = 'cat_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
        try {
          await prisma.$executeRaw`
            INSERT OR IGNORE INTO "categories" ("id", "name", "description", "createdAt", "updatedAt")
            VALUES (${catId}, ${category.name}, ${category.description}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
          `
          results.categoriesAdded++
        } catch (error) {
          results.errors.push(`Category ${category.name}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }
    } catch (error) {
      results.errors.push(`Categories: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Step 3: Get category IDs and add products
    try {
      const categories = await prisma.$queryRaw`SELECT "id", "name" FROM "categories"` as Array<{id: string, name: string}>
      const categoryMap: Record<string, string> = {}
      categories.forEach(cat => {
        categoryMap[cat.name] = cat.id
      })

      const products = [
        // Electronics (15 products)
        { title: 'iPhone 15 Pro', description: 'Latest iPhone with advanced features and titanium design', price: 999.99, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', stock: 50, category: 'Electronics' },
        { title: 'MacBook Pro 16"', description: 'Powerful laptop for professionals with M3 chip', price: 2499.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', stock: 25, category: 'Electronics' },
        { title: 'Samsung Galaxy S24 Ultra', description: 'Latest Android flagship with S Pen', price: 1199.99, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', stock: 40, category: 'Electronics' },
        { title: 'AirPods Pro 2nd Gen', description: 'Wireless earbuds with adaptive transparency', price: 249.99, image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500', stock: 60, category: 'Electronics' },
        { title: 'iPad Air 5th Gen', description: 'Versatile tablet with M1 chip for work and creativity', price: 599.99, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', stock: 35, category: 'Electronics' },
        { title: 'Sony WH-1000XM5', description: 'Premium noise-canceling headphones', price: 399.99, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500', stock: 45, category: 'Electronics' },
        { title: 'Nintendo Switch OLED', description: 'Portable gaming console with vibrant OLED screen', price: 349.99, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', stock: 30, category: 'Electronics' },
        { title: 'Dell XPS 13', description: 'Ultra-portable laptop with InfinityEdge display', price: 1299.99, image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500', stock: 20, category: 'Electronics' },
        { title: 'Apple Watch Series 9', description: 'Advanced smartwatch with health monitoring', price: 399.99, image: 'https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=500', stock: 55, category: 'Electronics' },
        { title: 'Canon EOS R6 Mark II', description: 'Professional mirrorless camera for photography', price: 2499.99, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500', stock: 15, category: 'Electronics' },
        { title: 'Samsung 65" QLED TV', description: '4K Smart TV with Quantum Dot technology', price: 1799.99, image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=500', stock: 12, category: 'Electronics' },
        { title: 'Bose QuietComfort Earbuds', description: 'True wireless earbuds with world-class noise cancellation', price: 279.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500', stock: 40, category: 'Electronics' },
        { title: 'Microsoft Surface Pro 9', description: '2-in-1 laptop tablet with detachable keyboard', price: 1099.99, image: 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?w=500', stock: 25, category: 'Electronics' },
        { title: 'Google Pixel 8 Pro', description: 'AI-powered Android phone with advanced camera', price: 999.99, image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500', stock: 35, category: 'Electronics' },
        { title: 'Gaming PC RTX 4080', description: 'High-performance gaming desktop with RTX 4080', price: 2799.99, image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?w=500', stock: 8, category: 'Electronics' },

        // Clothing (12 products)
        { title: 'Premium Cotton T-Shirt', description: 'Soft organic cotton tee in multiple colors', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500', stock: 200, category: 'Clothing' },
        { title: 'Classic Denim Jacket', description: 'Timeless denim jacket with vintage wash', price: 89.99, image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=500', stock: 50, category: 'Clothing' },
        { title: 'Running Sneakers Pro', description: 'Professional athletic shoes with advanced cushioning', price: 149.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', stock: 75, category: 'Clothing' },
        { title: 'Wool Blend Sweater', description: 'Cozy sweater perfect for cold weather', price: 79.99, image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500', stock: 60, category: 'Clothing' },
        { title: 'Slim Fit Jeans', description: 'Modern slim fit denim with stretch comfort', price: 69.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', stock: 80, category: 'Clothing' },
        { title: 'Leather Boots', description: 'Genuine leather boots for style and durability', price: 199.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500', stock: 40, category: 'Clothing' },
        { title: 'Summer Dress', description: 'Light and breezy dress perfect for warm weather', price: 59.99, image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500', stock: 65, category: 'Clothing' },
        { title: 'Business Shirt', description: 'Professional dress shirt for office wear', price: 49.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500', stock: 90, category: 'Clothing' },
        { title: 'Yoga Leggings', description: 'High-performance leggings for yoga and fitness', price: 39.99, image: 'https://images.unsplash.com/photo-1506629905607-45e5e6aa4bf6?w=500', stock: 100, category: 'Clothing' },
        { title: 'Winter Coat', description: 'Warm and stylish coat for winter weather', price: 159.99, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500', stock: 30, category: 'Clothing' },
        { title: 'Casual Hoodie', description: 'Comfortable hoodie for everyday wear', price: 54.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', stock: 85, category: 'Clothing' },
        { title: 'Designer Handbag', description: 'Elegant handbag with premium materials', price: 249.99, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500', stock: 25, category: 'Clothing' },

        // Books (8 products)
        { title: 'AI for Everyone', description: 'Comprehensive guide to artificial intelligence', price: 24.99, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', stock: 200, category: 'Books' },
        { title: 'The Future of Work', description: 'How technology is reshaping careers', price: 19.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', stock: 150, category: 'Books' },
        { title: 'Cooking Masterclass', description: 'Professional cooking techniques and recipes', price: 34.99, image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=500', stock: 120, category: 'Books' },
        { title: 'Digital Marketing Guide', description: 'Complete guide to online marketing strategies', price: 29.99, image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500', stock: 100, category: 'Books' },
        { title: 'Mindfulness and Meditation', description: 'Practical guide to mindful living', price: 16.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', stock: 180, category: 'Books' },
        { title: 'Science Fiction Anthology', description: 'Collection of the best sci-fi short stories', price: 22.99, image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=500', stock: 90, category: 'Books' },
        { title: 'Photography Basics', description: 'Learn the fundamentals of digital photography', price: 27.99, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', stock: 75, category: 'Books' },
        { title: 'Entrepreneurship 101', description: 'Essential guide for starting your own business', price: 32.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', stock: 110, category: 'Books' },

        // Home & Garden (10 products)
        { title: 'Smart Coffee Maker', description: 'WiFi-enabled coffee machine with app control', price: 199.99, image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500', stock: 30, category: 'Home & Garden' },
        { title: 'Ceramic Plant Pot Set', description: 'Beautiful handcrafted ceramic planters', price: 49.99, image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500', stock: 120, category: 'Home & Garden' },
        { title: 'LED Desk Lamp', description: 'Adjustable LED lamp with USB charging port', price: 79.99, image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500', stock: 65, category: 'Home & Garden' },
        { title: 'Throw Pillow Set', description: 'Decorative pillows to enhance your living space', price: 39.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500', stock: 90, category: 'Home & Garden' },
        { title: 'Essential Oil Diffuser', description: 'Ultrasonic aromatherapy diffuser with timer', price: 59.99, image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500', stock: 55, category: 'Home & Garden' },
        { title: 'Kitchen Knife Set', description: 'Professional chef knives with wooden block', price: 149.99, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500', stock: 40, category: 'Home & Garden' },
        { title: 'Bamboo Cutting Board', description: 'Eco-friendly cutting board with juice groove', price: 29.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', stock: 80, category: 'Home & Garden' },
        { title: 'Smart Thermostat', description: 'WiFi thermostat with energy-saving features', price: 249.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', stock: 25, category: 'Home & Garden' },
        { title: 'Garden Tool Set', description: 'Complete set of essential gardening tools', price: 89.99, image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500', stock: 35, category: 'Home & Garden' },
        { title: 'Luxury Candle Collection', description: 'Set of premium scented candles', price: 69.99, image: 'https://images.unsplash.com/photo-1602874801006-e26d405dba8f?w=500', stock: 70, category: 'Home & Garden' }
      ]

      for (const product of products) {
        try {
          const categoryId = categoryMap[product.category]
          if (categoryId) {
            const prodId = 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
            await prisma.$executeRaw`
              INSERT OR IGNORE INTO "products" ("id", "title", "description", "price", "image", "stock", "categoryId", "createdAt", "updatedAt")
              VALUES (${prodId}, ${product.title}, ${product.description}, ${product.price}, ${product.image}, ${product.stock}, ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
            `
            results.productsAdded++
          }
        } catch (error) {
          results.errors.push(`Product ${product.title}: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
      }
    } catch (error) {
      results.errors.push(`Products: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Step 4: Create test user
    try {
      const hashedPassword = await bcrypt.hash('password123', 12)
      const userId = 'user_' + Date.now() + '_test'
      
      await prisma.$executeRaw`
        INSERT OR IGNORE INTO "users" ("id", "email", "password", "name", "createdAt", "updatedAt")
        VALUES (${userId}, 'test@example.com', ${hashedPassword}, 'Test User', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
      `
      results.usersAdded = 1
    } catch (error) {
      results.errors.push(`User creation: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }

    // Final counts
    const finalCounts = await Promise.all([
      prisma.$queryRaw`SELECT COUNT(*) as count FROM "categories"`,
      prisma.$queryRaw`SELECT COUNT(*) as count FROM "products"`,
      prisma.$queryRaw`SELECT COUNT(*) as count FROM "users"`
    ])

    res.json({
      message: 'Emergency setup completed!',
      results,
      finalCounts: {
        categories: Number((finalCounts[0] as any)[0]?.count || 0),
        products: Number((finalCounts[1] as any)[0]?.count || 0),
        users: Number((finalCounts[2] as any)[0]?.count || 0)
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Emergency setup failed:', error)
    res.status(500).json({
      message: 'Emergency setup failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    })
  }
})

// Add more products endpoint
app.get('/add-more-products', async (req, res) => {
  try {
    const { prisma } = await import('./lib/prisma')
    
    // Get category IDs
    const categories = await prisma.$queryRaw`SELECT "id", "name" FROM "categories"` as Array<{id: string, name: string}>
    const categoryMap: Record<string, string> = {}
    categories.forEach(cat => {
      categoryMap[cat.name] = cat.id
    })

    const newProducts = [
      // More Electronics
      { title: 'iPhone 14 Pro Max', description: 'Previous generation iPhone with excellent features', price: 899.99, image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500', stock: 30, category: 'Electronics' },
      { title: 'Samsung Galaxy Tab S9', description: 'Premium Android tablet for productivity', price: 799.99, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', stock: 25, category: 'Electronics' },
      { title: 'Sony PlayStation 5', description: 'Next-gen gaming console with 4K gaming', price: 499.99, image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=500', stock: 15, category: 'Electronics' },
      { title: 'MacBook Air M2', description: 'Lightweight laptop perfect for everyday use', price: 1199.99, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500', stock: 20, category: 'Electronics' },
      { title: 'Apple iPad Pro 12.9"', description: 'Professional tablet with M2 chip', price: 1099.99, image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500', stock: 18, category: 'Electronics' },
      
      // More Clothing
      { title: 'Nike Air Max 270', description: 'Comfortable running shoes with air cushioning', price: 159.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', stock: 50, category: 'Clothing' },
      { title: 'Levi\'s 501 Original Jeans', description: 'Classic straight-leg jeans in vintage wash', price: 89.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500', stock: 60, category: 'Clothing' },
      { title: 'Champion Reverse Weave Hoodie', description: 'Premium heavyweight hoodie', price: 79.99, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500', stock: 40, category: 'Clothing' },
      { title: 'Adidas Ultraboost 22', description: 'High-performance running shoes', price: 189.99, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500', stock: 35, category: 'Clothing' },
      { title: 'Ralph Lauren Polo Shirt', description: 'Classic polo shirt in multiple colors', price: 69.99, image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500', stock: 70, category: 'Clothing' },
      
      // More Books
      { title: 'The Psychology of Money', description: 'Timeless lessons on wealth and happiness', price: 18.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', stock: 100, category: 'Books' },
      { title: 'Atomic Habits', description: 'An easy and proven way to build good habits', price: 16.99, image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500', stock: 150, category: 'Books' },
      { title: 'The 7 Habits of Highly Effective People', description: 'Powerful lessons in personal change', price: 19.99, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500', stock: 80, category: 'Books' },
      
      // More Home & Garden
      { title: 'Instant Pot Duo 7-in-1', description: 'Multi-use pressure cooker and slow cooker', price: 99.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', stock: 25, category: 'Home & Garden' },
      { title: 'Dyson V15 Detect', description: 'Powerful cordless vacuum with laser detection', price: 749.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', stock: 12, category: 'Home & Garden' },
      { title: 'KitchenAid Stand Mixer', description: 'Professional-grade stand mixer for baking', price: 379.99, image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500', stock: 15, category: 'Home & Garden' },
      { title: 'Ninja Foodi Air Fryer', description: 'Multi-functional air fryer and pressure cooker', price: 199.99, image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500', stock: 30, category: 'Home & Garden' },
      { title: 'Roomba i7+ Robot Vacuum', description: 'Smart robot vacuum with self-emptying base', price: 599.99, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500', stock: 8, category: 'Home & Garden' }
    ]

    let addedCount = 0
    for (const product of newProducts) {
      try {
        const categoryId = categoryMap[product.category]
        if (categoryId) {
          const prodId = 'prod_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
          await prisma.$executeRaw`
            INSERT INTO "products" ("id", "title", "description", "price", "image", "stock", "categoryId", "createdAt", "updatedAt")
            VALUES (${prodId}, ${product.title}, ${product.description}, ${product.price}, ${product.image}, ${product.stock}, ${categoryId}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT ("id") DO NOTHING;
          `
          addedCount++
        }
      } catch (error) {
        console.error(`Failed to add product ${product.title}:`, error)
      }
    }

    // Get final count
    const totalProducts = await prisma.$queryRaw`SELECT COUNT(*) as count FROM "products"`
    
    res.json({
      message: `Successfully added ${addedCount} more products!`,
      addedProducts: addedCount,
      totalProducts: Number((totalProducts as any)[0]?.count || 0),
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Add more products failed:', error)
    res.status(500).json({
      message: 'Failed to add more products',
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
})

// API info endpoint
app.get('/api', (req, res) => {
  res.json({ 
    message: 'AI-Powered E-commerce API',
    version: '2.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      cart: '/api/cart',
      orders: '/api/orders',
      categories: '/api/categories',
      search: '/api/search',
      checkout: '/api/checkout'
    }
  })
})

// Global error handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Error:', err)
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message
  })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/health`)
  console.log(`🔗 API Base: http://localhost:${PORT}/api`)
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`)
  console.log(`🗄️ Database: ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`)
  console.log(`🔐 JWT Secret: ${process.env.JWT_SECRET ? 'Set' : 'Not set'}`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'Not set'}`)
})
