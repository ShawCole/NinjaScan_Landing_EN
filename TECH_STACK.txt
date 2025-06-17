# Technology Stack Documentation

## Core Technologies

### Frontend Framework
- **React** (v18.3.1)
  - Modern, component-based UI library
  - Hooks-based architecture
  - Virtual DOM for efficient rendering
- **TypeScript** (v5.5.3)
  - Static typing for improved development experience
  - Enhanced IDE support and code reliability
- **Vite** (v5.4.1)
  - Modern build tool with fast HMR
  - Optimized production builds
  - ESM-based dev server

### Styling & UI Components
- **Tailwind CSS** (v3.4.11)
  - Utility-first CSS framework
  - JIT (Just-In-Time) compilation
  - Custom design system support
- **shadcn/ui**
  - Built on Radix UI primitives
  - Accessible components
  - Customizable with Tailwind
- **Radix UI Components**
  - Accessible primitives
  - Includes:
    * Accordion, Alert Dialog, Avatar
    * Dialog, Dropdown Menu
    * Navigation Menu, Popover
    * Tabs, Toast, Tooltip
- **Lucide React** (v0.462.0)
  - Modern icon library
  - Customizable and lightweight

### Routing & State Management
- **React Router DOM** (v6.26.2)
  - Client-side routing
  - Dynamic route matching
  - Nested routes support
- **TanStack Query** (v5.56.2)
  - Data fetching and caching
  - Server state management
  - Automatic background updates

### Internationalization (i18n)
- **i18next** (v25.1.3)
  - Robust internationalization framework
  - Supports:
    * Multiple languages
    * Namespace separation
    * Dynamic content
- **react-i18next** (v15.5.1)
  - React bindings for i18next
  - Hooks-based API
- **i18next-browser-languagedetector** (v8.1.0)
  - Automatic language detection
  - Multiple detection strategies
- **i18next-http-backend** (v3.0.2)
  - Dynamic loading of translations
  - Lazy loading support

### Form Handling & Validation
- **React Hook Form** (v7.53.0)
  - Performance-focused form handling
  - Uncontrolled components
  - Built-in validation
- **Zod** (v3.23.8)
  - TypeScript-first schema validation
  - Runtime type checking
  - Automatic type inference

### Additional Libraries
- **date-fns** (v3.6.0)
  - Modern date manipulation
  - Tree-shakeable imports
- **Embla Carousel** (v8.3.0)
  - Touch-friendly carousel
  - Responsive design
- **Recharts** (v2.12.7)
  - Responsive charting library
  - Built with D3.js

### Development Tools
- **ESLint** (v9.9.0)
  - Code quality enforcement
  - Custom rule configuration
- **PostCSS** (v8.4.47)
  - CSS transformation tool
  - Modern CSS features
- **Autoprefixer**
  - Automatic vendor prefixing
  - Browser compatibility

## Development Environment Setup

```bash
# Node.js version
node >= 18.0.0

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Important Notes

1. **TypeScript Configuration**
   - Strict mode enabled
   - Path aliases configured
   - Modern ESM modules

2. **Styling Guidelines**
   - Use Tailwind utility classes
   - Follow shadcn/ui component patterns
   - Maintain dark mode support

3. **Internationalization**
   - Translations in `/public/locales`
   - Language detection enabled
   - Namespace separation

4. **Performance Considerations**
   - Code splitting enabled
   - Tree shaking supported
   - Optimized production builds 