# Frontend - AI-Powered E-commerce Platform

This is the Next.js frontend for the AI-powered e-commerce platform.

## Features

- **Modern UI**: Responsive design with Tailwind CSS
- **User Authentication**: Login/register with JWT token management
- **Product Catalog**: Browse products with filtering and search
- **Shopping Cart**: Real-time cart management with context API
- **Checkout**: Stripe integration for secure payments
- **AI Search**: Natural language product search interface
- **Order Management**: View order history and status
- **User Profile**: Account management and settings

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Payment**: Stripe.js
- **Icons**: Heroicons
- **Image Optimization**: Next.js Image component

## Project Structure

```
frontend/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Authentication pages
│   ├── register/
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── orders/            # Order history
│   ├── search/            # AI search
│   └── profile/           # User profile
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── Navbar.tsx        # Navigation
│   ├── ProductCard.tsx   # Product display
│   └── ProductGrid.tsx   # Product grid layout
├── contexts/             # React contexts
│   ├── AuthContext.tsx   # Authentication state
│   └── CartContext.tsx   # Shopping cart state
├── lib/                  # Utilities
│   ├── api.ts           # API client configuration
│   └── stripe.ts        # Stripe configuration
└── public/              # Static assets
```

## Pages Overview

### Home Page (`/`)
- Hero section with call-to-action
- Featured products grid
- Platform benefits showcase
- AI search promotion

### Authentication
- **Login** (`/login`): User sign-in with demo account info
- **Register** (`/register`): User registration with validation

### Products
- **Product List** (`/products`): Paginated product catalog with category filtering
- **Product Detail** (`/products/[id]`): Individual product page with add-to-cart

### Shopping & Orders
- **Cart** (`/cart`): Shopping cart management with quantity controls
- **Checkout Success** (`/checkout/success`): Payment confirmation
- **Orders** (`/orders`): Order history and status tracking

### User Features
- **Profile** (`/profile`): Account settings and password change
- **AI Search** (`/search`): Natural language product search

## Components

### Core Components

#### Navbar
- Responsive navigation with search bar
- User authentication state
- Shopping cart indicator
- Mobile-friendly dropdown menus

#### ProductCard
- Product image with fallback
- Price and category display
- Add to cart functionality
- Stock status indicators

#### ProductGrid
- Responsive grid layout
- Loading states
- Empty state handling

### UI Components

#### Toaster
- Global notification system
- Success, error, and info messages
- Auto-dismiss functionality

## State Management

### AuthContext
Manages user authentication state:
```typescript
interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, name?: string) => Promise<void>
  logout: () => void
  loading: boolean
}
```

### CartContext
Manages shopping cart state:
```typescript
interface CartContextType {
  items: CartItem[]
  total: string
  addToCart: (productId: string, quantity?: number) => Promise<void>
  updateQuantity: (itemId: string, quantity: number) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  clearCart: () => void
  loading: boolean
  itemCount: number
}
```

## Setup

### Prerequisites
- Node.js 18+
- Backend API running on http://localhost:5000

### Installation
```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env.local

# Configure your .env.local file
# Start development server
npm run dev
```

### Environment Variables
```env
# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:5000/api"

# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
```

## Styling

### Tailwind CSS
The project uses Tailwind CSS for styling with custom utility classes:

```css
/* Custom utility classes */
.btn-primary { /* Primary button styles */ }
.btn-secondary { /* Secondary button styles */ }
.btn-outline { /* Outline button styles */ }
.input-field { /* Form input styles */ }
.card { /* Card container styles */ }
.card-hover { /* Card with hover effects */ }
```

### Responsive Design
- Mobile-first approach
- Breakpoints: `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px)
- Flexible grid layouts
- Touch-friendly interface elements

## API Integration

### API Client Configuration
```typescript
// lib/api.ts
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: { 'Content-Type': 'application/json' }
})

// Automatic token attachment
api.interceptors.request.use((config) => {
  const token = Cookies.get('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
```

### Error Handling
- Automatic token refresh on 401 errors
- User-friendly error messages
- Toast notifications for feedback

## Authentication Flow

1. **Login/Register**: User submits credentials
2. **Token Storage**: JWT stored in HTTP-only cookies
3. **Context Update**: User state updated globally
4. **Protected Routes**: Automatic redirect for unauthorized access
5. **Token Validation**: Automatic validation on app load

## Payment Integration

### Stripe Checkout
```typescript
const handleCheckout = async () => {
  const response = await api.post('/checkout')
  const { url } = response.data
  window.location.href = url // Redirect to Stripe
}
```

### Payment Success
- Automatic order confirmation
- Cart clearing
- Order details display
- Navigation to order history

## Search Implementation

### AI Search Interface
- Natural language input
- Search suggestions and examples
- Results with recommendations
- Category-based filtering

### Search Features
- Real-time search as you type
- Search history (future feature)
- Filters and sorting options
- AI-powered recommendations

## Performance Optimizations

### Next.js Features
- **Image Optimization**: Automatic image optimization and lazy loading
- **Code Splitting**: Automatic route-based code splitting
- **Static Generation**: Pre-rendered pages where possible
- **Font Optimization**: Automatic font optimization

### Custom Optimizations
- **Lazy Loading**: Components loaded on demand
- **Memoization**: React.memo for expensive components
- **Debounced Search**: Reduced API calls during typing
- **Optimistic Updates**: Immediate UI feedback

## Accessibility

### Features Implemented
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels
- **Color Contrast**: WCAG compliant color schemes
- **Focus Management**: Visible focus indicators
- **Semantic HTML**: Proper heading hierarchy

### Testing
- Use screen readers to test navigation
- Verify keyboard-only navigation
- Check color contrast ratios
- Test with accessibility tools

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Development Guidelines

#### Component Creation
```typescript
// components/NewComponent.tsx
interface NewComponentProps {
  // Define props
}

export default function NewComponent({ }: NewComponentProps) {
  return (
    <div className="component-styles">
      {/* Component content */}
    </div>
  )
}
```

#### Adding New Pages
```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">New Page</h1>
      {/* Page content */}
    </div>
  )
}
```

#### Context Usage
```typescript
// Using contexts in components
import { useAuth } from '@/contexts/AuthContext'
import { useCart } from '@/contexts/CartContext'

export default function Component() {
  const { user } = useAuth()
  const { items, addToCart } = useCart()
  
  // Component logic
}
```

## Testing

### Manual Testing Checklist
- [ ] User registration and login
- [ ] Product browsing and filtering
- [ ] Add/remove items from cart
- [ ] Checkout process with test cards
- [ ] Order history viewing
- [ ] Search functionality
- [ ] Responsive design on mobile
- [ ] Error handling scenarios

### Test Accounts
- Email: `test@example.com`
- Password: `password123`

### Test Payment Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## Deployment

### Build Process
```bash
# Build the application
npm run build

# Test production build locally
npm run start
```

### Deployment Platforms
- **Vercel** (Recommended): Automatic deployments from Git
- **Netlify**: Static site hosting with serverless functions
- **AWS Amplify**: Full-stack deployment platform

### Environment Configuration
Ensure production environment variables are set:
- `NEXT_PUBLIC_API_URL`: Production API URL
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`: Production Stripe key

## Troubleshooting

### Common Issues

#### API Connection Errors
```
Network Error / CORS Error
```
- Check API URL in environment variables
- Verify backend is running
- Check CORS configuration

#### Authentication Issues
```
Unauthorized / Token expired
```
- Clear browser cookies
- Check JWT token format
- Verify API authentication endpoints

#### Build Errors
```
Module not found
```
- Check import paths
- Verify all dependencies are installed
- Check TypeScript configuration

#### Styling Issues
```
Styles not applying
```
- Check Tailwind CSS configuration
- Verify class names are correct
- Check for CSS conflicts

## Future Enhancements

### Planned Features
- **Advanced Search**: Filters, sorting, faceted search
- **Product Reviews**: User reviews and ratings
- **Wishlist**: Save products for later
- **Recommendations**: Personalized product suggestions
- **Admin Dashboard**: Product and order management
- **PWA Features**: Offline support, push notifications

### Performance Improvements
- **Caching**: Implement Redis caching
- **CDN**: Use CDN for static assets
- **Bundle Analysis**: Optimize bundle size
- **Service Workers**: Implement caching strategies

## Contributing

1. Follow TypeScript best practices
2. Use Tailwind CSS for styling
3. Implement proper error handling
4. Add loading states for async operations
5. Ensure responsive design
6. Test on multiple devices and browsers

For more information, see the main [README.md](../README.md) and [setup.md](../setup.md).
