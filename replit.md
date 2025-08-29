# Overview

This is a modern full-stack web application built with React frontend and Express backend. The application appears to be a business website or landing page with contact form functionality. It uses a PostgreSQL database with Drizzle ORM for data persistence and features a clean, responsive UI built with shadcn/ui components and Tailwind CSS.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The frontend is built as a React Single Page Application (SPA) using Vite as the build tool and development server. The application follows a component-based architecture with TypeScript for type safety.

**Key Design Decisions:**
- **UI Framework**: Uses shadcn/ui components built on top of Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with CSS variables for theming and dark mode support
- **Routing**: Uses Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management and data fetching
- **Form Handling**: React Hook Form with Zod validation for type-safe form handling
- **Animations**: Framer Motion for smooth animations and transitions

**Directory Structure:**
- `client/src/components/ui/` - Reusable UI components from shadcn/ui
- `client/src/pages/` - Page components for different routes
- `client/src/hooks/` - Custom React hooks
- `client/src/lib/` - Utility functions and configurations

## Backend Architecture

The backend is an Express.js REST API server that handles contact form submissions and serves the React application in production.

**Key Design Decisions:**
- **Framework**: Express.js for simplicity and flexibility
- **Data Storage**: Dual storage approach with in-memory storage for development and PostgreSQL for production
- **Validation**: Zod schemas shared between frontend and backend for consistent validation
- **Development Setup**: Vite middleware integration for hot module replacement during development

**API Structure:**
- `POST /api/contact` - Submit contact form
- `GET /api/contact-submissions` - Retrieve all submissions (admin endpoint)

## Data Storage

**Database Choice**: PostgreSQL with Neon serverless hosting for scalability and reliability.

**ORM**: Drizzle ORM chosen for:
- Type-safe database queries
- Lightweight runtime
- Excellent TypeScript integration
- Schema migrations support

**Schema Design**:
- `users` table for potential authentication system
- `contact_submissions` table for storing form submissions with proper validation

## Development vs Production

**Development Mode**:
- Uses in-memory storage for rapid development
- Vite dev server with HMR for frontend
- Express server handles API routes

**Production Mode**:
- Compiled React app served as static files
- Express server handles both API and static file serving
- PostgreSQL database for data persistence

## External Dependencies

- **Neon Database**: Serverless PostgreSQL hosting for production database
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Framer Motion**: Animation library for smooth UI transitions
- **React Query**: Server state management and caching
- **Zod**: Schema validation for type safety
- **React Hook Form**: Form state management and validation
- **Wouter**: Lightweight React router
- **Drizzle ORM**: Type-safe database ORM

The application is designed to be easily deployable on platforms like Replit, with automatic database provisioning and environment variable management.