# DevEvent - Developer Events Platform [https://devesh.work]

A modern, full-stack web application built with Next.js 16 for discovering, creating, and managing developer events. Features a beautiful UI with animated light rays, event management, and user booking system.

[DevEvent Platform]

## 🚀 Features

- **Event Discovery**: Browse and search through developer events, hackathons, and conferences
- **Event Creation**: Create and manage your own events with image uploads
- **Event Booking**: Book spots for events with email notifications
- **Similar Events**: Event recommendations based on tags
- **Responsive Design**: Mobile-first design with beautiful animations
- **Real-time Updates**: Server-side rendering with caching for optimal performance

## 🆕 Next.js 16 Features Used

This project showcases the latest Next.js 16 features:

### 1. **Turbopack (Beta)**
- Lightning-fast development server and build tool
- Significantly faster than Webpack for development
- Improved hot module replacement (HMR)

### 2. **`"use cache"` Directive**
- New caching primitive for server components
- Granular cache control with `cacheLife()` function
- Automatic cache invalidation and revalidation

```typescript
async function Home() {
  "use cache";
  cacheLife("minutes");
  
  const events = await getAllEvents();
  // Component automatically cached for specified duration
}
```

### 3. **Enhanced Server Actions**
- Direct database operations without API routes
- Better performance and reduced latency
- Type-safe server-side functions

```typescript
'use server'

export const getAllEvents = async(): Promise<IEventData[]> => {
    // Direct database access from server components
}
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **OGL** - WebGL library for animated light rays background

### Backend
- **MongoDB** - NoSQL database for event and user data
- **Mongoose** - MongoDB object modeling
- **Cloudinary** - Image upload and optimization
- **Server Actions** - Direct server-side operations

### Authentication & Analytics
- **Better Auth** - Modern authentication solution
- **PostHog** - Product analytics and user tracking

### Development Tools
- **Turbopack** - Next-generation bundler
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting

## 📁 Project Structure

```
nextjs16/
├── app/                    # App Router pages
│   ├── api/               # API routes
│   ├── createevent/       # Event creation page
│   ├── events/[slug]/     # Dynamic event pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable components
│   ├── BookEvent.tsx      # Event booking form
│   ├── CreateEventForm.tsx # Event creation form
│   ├── EventCard.tsx      # Event display card
│   ├── EventDetails.tsx   # Event detail view
│   ├── LightRays.tsx      # WebGL background animation
│   └── Navbar.tsx         # Navigation component
├── database/              # Database models
│   ├── booking.model.ts   # Booking schema
│   ├── event.model.ts     # Event schema
│   └── index.ts           # Model exports
├── lib/                   # Utility functions
│   ├── actions/           # Server actions
│   ├── auth.ts            # Authentication config
│   ├── mongodb.ts         # Database connection
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- MongoDB database
- Cloudinary account (for image uploads)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/DEVESH-001/DevEvent-NextJS-16.git
cd devevent
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:

```env
# Database
MONGODB_URI=your_mongodb_connection_string

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# Analytics (Optional)
NEXT_PUBLIC_POSTHOG_KEY=your_posthog_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com


4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)


### Event Management
- **Create Events**: Rich form with image upload and validation
- **Event Discovery**: Grid layout with filtering and search
- **Event Details**: Comprehensive event information with booking

### Booking System
- Email-based booking system
- Duplicate booking prevention
- Real-time booking counts

## 🔧 API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/events` | GET | Fetch all events |
| `/api/events` | POST | Create new event |
| `/api/events/[slug]` | GET | Fetch event by slug |

Built with ❤️ using Next.js 16 and modern web technologies.
