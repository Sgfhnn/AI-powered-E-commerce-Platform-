const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Check if data already exists
  const existingCategories = await prisma.category.count()
  if (existingCategories > 0) {
    console.log('Database already seeded, skipping...')
    return
  }

  // Create categories
  const electronics = await prisma.category.create({
    data: {
      name: 'Electronics',
      description: 'Electronic devices and gadgets'
    }
  })

  const clothing = await prisma.category.create({
    data: {
      name: 'Clothing',
      description: 'Fashion and apparel'
    }
  })

  const books = await prisma.category.create({
    data: {
      name: 'Books',
      description: 'Books and literature'
    }
  })

  const home = await prisma.category.create({
    data: {
      name: 'Home & Garden',
      description: 'Home improvement and garden supplies'
    }
  })

  console.log('Categories created')

  // Create sample products
  await prisma.product.createMany({
    data: [
      {
        title: 'iPhone 15 Pro',
        description: 'Latest iPhone with advanced features and A17 Pro chip',
        price: 999.99,
        image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=500',
        stock: 50,
        categoryId: electronics.id
      },
      {
        title: 'MacBook Air M2',
        description: 'Powerful laptop for professionals with M2 chip',
        price: 1299.99,
        image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500',
        stock: 30,
        categoryId: electronics.id
      },
      {
        title: 'AirPods Pro',
        description: 'Wireless earbuds with active noise cancellation',
        price: 249.99,
        image: 'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?w=500',
        stock: 100,
        categoryId: electronics.id
      },
      {
        title: 'Samsung Galaxy S24',
        description: 'Latest Android flagship with AI features',
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
        stock: 75,
        categoryId: electronics.id
      },
      {
        title: 'Classic Cotton T-Shirt',
        description: 'Comfortable 100% cotton t-shirt in various colors',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
        stock: 200,
        categoryId: clothing.id
      },
      {
        title: 'Premium Denim Jeans',
        description: 'High-quality denim jeans with perfect fit',
        price: 79.99,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500',
        stock: 150,
        categoryId: clothing.id
      },
      {
        title: 'The Great Gatsby',
        description: 'Classic American novel',
        price: 14.99,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
        stock: 75,
        categoryId: books.id
      }
    ]
  })

  // Create a test user
  const hashedPassword = await bcrypt.hash('password123', 12)
  await prisma.user.create({
    data: {
      email: 'test@example.com',
      password: hashedPassword,
      name: 'Test User'
    }
  })

  console.log('Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
