# AAA Academy Admin Portal Setup Guide

This guide will help you set up the complete admin portal with authentication and event management system.

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn package manager

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Option A: Local PostgreSQL
1. Install PostgreSQL on your system
2. Create a new database called `academy_db`
3. Update the `.env` file with your database credentials:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/academy_db?schema=public"
```

#### Option B: Cloud Database (Recommended)
Use a cloud PostgreSQL service like:
- [Supabase](https://supabase.com) (Free tier available)
- [PlanetScale](https://planetscale.com)
- [Railway](https://railway.app)
- [Heroku Postgres](https://www.heroku.com/postgres)

Update your `.env` file with the provided connection string.

### 3. Environment Configuration

Create or update your `.env` file:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here-change-in-production"

# Admin Credentials (for initial setup)
ADMIN_EMAIL="admin@aaaacademy.com"
ADMIN_PASSWORD="admin123"
```

### 4. Database Migration and Seeding

```bash
# Generate Prisma client
npm run db:generate

# Run database migrations
npm run db:migrate

# Seed the database with initial admin user and sample events
npm run db:seed
```

### 5. Start the Development Server

```bash
npm run dev
```

## Admin Portal Access

### Login Credentials
- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@aaaacademy.com`
- **Password**: `admin123`

### Features Available

1. **Authentication System**
   - Secure login/logout with NextAuth
   - Role-based access (Admin/Manager)
   - Session management

2. **Event Management**
   - Create new events
   - Edit existing events
   - Delete events
   - Search and filter events
   - Pagination support

3. **Event Properties**
   - Title and description
   - Category (Workshop, Seminar, Certification, Webinar, Conference)
   - Duration and pricing
   - Date and location
   - Participant limits
   - Virtual/physical event toggle
   - Active/inactive status

## API Endpoints

### Authentication
- `POST /api/auth/signin` - User login
- `POST /api/auth/signout` - User logout

### Events
- `GET /api/events` - List events (with pagination, search, filters)
- `POST /api/events` - Create new event
- `GET /api/events/[id]` - Get specific event
- `PUT /api/events/[id]` - Update event
- `DELETE /api/events/[id]` - Delete event

## Database Schema

### Users Table
- `id` - Unique identifier
- `email` - User email (unique)
- `name` - User full name
- `password` - Hashed password
- `role` - User role (ADMIN/MANAGER)
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

### Events Table
- `id` - Unique identifier
- `title` - Event title
- `description` - Event description
- `category` - Event category
- `duration` - Event duration
- `price` - Event price
- `currency` - Price currency
- `date` - Event date and time
- `location` - Event location
- `maxParticipants` - Maximum participants
- `imageUrl` - Event image URL
- `isVirtual` - Virtual event flag
- `isActive` - Active status
- `createdBy` - Creator user ID
- `createdAt` - Creation timestamp
- `updatedAt` - Last update timestamp

## Security Features

- Password hashing with bcrypt
- JWT-based session management
- Role-based access control
- CSRF protection
- Input validation and sanitization

## Deployment

### Environment Variables for Production
Make sure to update these for production:

```env
NEXTAUTH_URL="https://your-domain.com"
NEXTAUTH_SECRET="your-strong-secret-key"
DATABASE_URL="your-production-database-url"
```

### Recommended Deployment Platforms
- [Vercel](https://vercel.com) (Recommended for Next.js)
- [Netlify](https://netlify.com)
- [Railway](https://railway.app)
- [DigitalOcean App Platform](https://www.digitalocean.com/products/app-platform)

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Verify your DATABASE_URL is correct
   - Ensure your database is running
   - Check firewall settings for cloud databases

2. **Authentication Not Working**
   - Verify NEXTAUTH_SECRET is set
   - Check NEXTAUTH_URL matches your domain
   - Ensure admin user was created during seeding

3. **Build Errors**
   - Run `npm run db:generate` to update Prisma client
   - Clear `.next` folder and rebuild

### Reset Database
If you need to reset everything:

```bash
npm run db:reset
```

This will reset the database and re-seed with initial data.

## Support

For additional support or questions about the admin portal setup, please refer to the documentation or contact the development team.

## Next Steps

1. Customize the admin interface styling
2. Add more user roles and permissions
3. Implement email notifications
4. Add event registration functionality
5. Create analytics and reporting features 