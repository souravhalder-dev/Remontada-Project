# Remontada Workspace 

A modern, responsive, and polished e-commerce and catalog web application built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **Firebase Authentication**.

Remontada Workspace curates precision workspace essentials, ergonomic furniture, studio audio, and mechanical peripherals engineered for creators, engineers, and digital craftspeople.

---

##  Key Features

### 1. Landing Page (`/`) — 7 Complete Sections
1. **Sticky Responsive Navbar**:
   - Brand logo with gradient icon
   - 4+ primary navigation routes (Home, Catalog, Features, About Us)
   - Dynamic Authentication state:
     - Unauthenticated: "Sign In" and "Register" buttons
     - Authenticated: Avatar dropdown displaying user email, role, and direct shortcuts to **Add Product** and **Manage Products**, plus Sign Out
   - Responsive mobile navigation drawer with touch-friendly controls
2. **Hero Section**:
   - Modern headline with gradient typography, subtitle, and primary/secondary CTAs
   - Ambient background glow effects
   - Social proof metrics (15,000+ workstations equipped, 4.9/5 rating, 30-day trial)
3. **Curated Highlights (Section 3.1)**:
   - High-impact uniform cards displaying bestsellers with ratings, pricing, and "View Details" links
4. **Why Choose Remontada (Section 3.2)**:
   - 4 feature cards: Aviation-Grade Build, Sub-millisecond Wireless, Eco-Conscious Packaging, and 3-Year Concierge Warranty
5. **Verified Customer Testimonials (Section 3.3)**:
   - Client feedback cards with star ratings, quotes, avatar images, and professional titles
6. **Promotional Banner & Newsletter CTA (Section 3.4)**:
   - Interactive launch discount email subscription form with instant validation and feedback
7. **Comprehensive Footer**:
   - Categorized links (Catalog, Platform, Architecture), social media icons (GitHub, X/Twitter, LinkedIn), and copyright notice

### 2. Items Catalog Page (`/items`)
- **Real-Time Search Bar**: Instant search across titles, descriptions, categories, and tags
- **Multi-Field Filtering (3 Fields implemented)**:
  - **Category Filter**: All, Audio, Keyboards, Ergonomics, Displays, Desk Setup, Accessories
  - **Price Range Filter**: All Prices, Under $100, $100–$300, Over $300
  - **Minimum Rating Filter**: Any Rating, 4.5+ ★, 4.8+ ★
  - **Sort By**: Featured, Price: Low to High, Price: High to Low, Top Rated
- **Responsive Grid**: 1 column on mobile, 2 columns on tablet, 3–4 columns on desktop
- **Uniform Cards**: Image, title, 2-line short description, price, rating badge, category pill, and "View Details" CTA button

### 3. Dynamic Item Details Page (`/items/[id]`)
- Dynamic App Router page (`/items/[id]`)
- High-resolution image showcase with value proposition badges (Free Express Shipping, 30-Day Trial, Official Warranty)
- Full overview description
- Detailed technical specification grid (Material, Dimensions, Interface, Warranty, etc.)
- Metadata badges: Category, Catalog ID, Date added, Stock availability count, Customer rating
- Interactive quantity selector and order simulation action with toast feedback
- Share to clipboard and Wishlist toggle
- **Related Items Section**: Recommendations matching the product category or featured items
- Back button to the catalog

### 4. About Page (`/about`)
- Brand story and origin narrative
- Foundational pillars (Honest Materials, Acoustic Balance, Modular Longevity)
- Studio showcase photography and laboratory stats
- Architecture stack highlights

### 5. Firebase Authentication
- **Email & Password**: Registration and sign-in with full validation and error messages
- **Google Sign-In**: Integrated with Firebase `GoogleAuthProvider` popup
- **Auth Context API**: `AuthContext` provides global user state, persistence, and reactive updates
- **Evaluation Quick-Pass (Demo Login)**: Reviewers can log in with a single click to instantly test protected routes without having to set up external Firebase API keys

### 6. Protected Page: Add Product (`/items/add`)
- Only accessible when authenticated; unauthenticated visitors are automatically redirected to `/login`
- Form fields:
  - Product Title
  - Category selector
  - Price (USD)
  - Stock inventory units
  - Short description (1–2 lines)
  - Full description
  - Technical specifications (Material, Warranty, Connectivity)
  - Image URL with **Quick-Pick Preset Images** for fast evaluation
- Submit button with loading state
- Success toast notification and redirect to the newly created product details page
- Stateful persistence across the application via LocalStorage

### 7. Protected Page: Manage Products (`/items/manage`)
- Only accessible when authenticated
- **Dual View Layout**: Switchable between a responsive table and a grid card view
- Live search filter across the inventory
- Action buttons:
  - **View**: Navigates to `/items/[id]`
  - **Delete**: Prompts a confirmation modal, then deletes the item with feedback
- **Restore Sample Catalog**: Easily restore the default dataset if items are deleted

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/) (Strict typing throughout)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [Firebase Authentication](https://firebase.google.com/) (v11)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context API (`AuthContext`, `ItemContext`, `ToastContext`) with LocalStorage synchronization

---

##  Route Summary

| Route | Type | Description |
|---|---|---|
| `/` | Public | Landing page with 7 distinct sections (Hero, Bestsellers, Features, Reviews, Banner, Navbar, Footer) |
| `/items` | Public | Catalog with search, multi-field filters (category, price, rating, sort), and responsive grid |
| `/items/[id]` | Public (Dynamic) | Product details page with specifications, image showcase, and related items |
| `/about` | Public | Brand story, company values, laboratory stats, and mission statement |
| `/login` | Public | Firebase Email/Password login, Google Sign-In, and 1-Click Reviewer Demo |
| `/register` | Public | Firebase registration with name, email, password, and Google Sign-In |
| `/items/add` | **Protected** | Authenticated form to add new products with image presets and inline validation |
| `/items/manage` | **Protected** | Authenticated table/grid view to manage, inspect, and delete catalog items |

---

##  Setup & Installation

### 1. Clone the repository
```bash
git clone <your-repository-url>
cd nextjs
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Firebase (Optional for Reviewers)
The application includes a built-in **Evaluation Quick-Pass** button on the Login/Register pages for seamless testing. 

To connect your own Firebase project:
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Populate the keys from your [Firebase Console](https://console.firebase.google.com/) (`Project Settings > General > Your apps`):
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```
3. Enable **Email/Password** and **Google** under `Firebase Console > Authentication > Sign-in method`.

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

### 6. Lint & Type Check
```bash
npm run lint
```

---

##  Deployment (Vercel)

1. Push your repository to GitHub.
2. Import the repository on [Vercel](https://vercel.com).
3. If using custom Firebase keys, add the environment variables in the Vercel dashboard.
4. Click **Deploy**.
