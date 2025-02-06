# Өмнөговь аймгийн Худалдан авах ажиллагааны газар - Project Documentation

## Project Overview
This is the official website for the Procurement Agency of Umnugovi Province. The project is built using modern web technologies to provide a robust and user-friendly platform for procurement-related activities.

## Technical Stack

### Frontend
- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Radix UI primitives
- **State Management**: React Hooks

### Backend
- **Platform**: Supabase
- **Database**: PostgreSQL (provided by Supabase)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth

## Project Structure
```
project/
├── app/                    # Next.js 13+ app directory
├── components/            # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions and configurations
├── public/              # Static assets
└── types/               # TypeScript type definitions
```

## Key Features
- Modern, responsive design
- Server-side rendering with Next.js
- Type-safe development with TypeScript
- Secure authentication with Supabase
- File storage capabilities with Supabase Storage
- Real-time data updates (where applicable)

## Environment Configuration
The project uses environment variables for configuration. These are stored in `.env` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://vtyqbodhgnnpwwzqnxta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

## Supabase Integration
Supabase is used as the backend platform, providing:
- Database storage
- File storage
- Authentication
- Real-time subscriptions
- Row Level Security (RLS) policies

### Supabase Client Setup
The Supabase client is initialized in `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
```

## Admin Panel Requirements

### Authentication
- Role-based access control (Admin/Editor/Viewer)
- Supabase authentication integration
- Session management

### Content Management
1. **Posts/News Management**
   - CRUD operations for procurement announcements
   - Rich text editor support
   - File attachment handling

2. **User Management**
   - Manage user roles/permissions
   - Activity monitoring

3. **File Management**
   - Upload/download tracking
   - Version control
   - Supabase storage integration

### UI Requirements
- Dashboard with analytics
- Data tables with sorting/filtering
- Audit logs
- Responsive design

### Security
- Row Level Security enforcement
- Activity logging
- Two-factor authentication option

## Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Write comments for complex logic
- Create reusable components when possible

### State Management
- Use React hooks for local state
- Utilize Supabase real-time subscriptions for live updates
- Implement proper error handling and loading states

### Security
- Never expose sensitive credentials in the codebase
- Use environment variables for sensitive information
- Implement proper authentication checks
- Follow Supabase security best practices

### Performance
- Optimize images and assets
- Implement proper caching strategies
- Use Next.js built-in optimizations
- Minimize bundle size

## Deployment
The application is deployed using Vercel's platform, which provides:
- Automatic deployments
- Preview deployments for pull requests
- SSL certificates
- CDN distribution

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Contributing
- Create feature branches from main
- Follow the established code style
- Write meaningful commit messages
- Test thoroughly before submitting PRs
- Document any new features or changes
- Support main langauge Mongolia

## Support
For any technical issues or questions, please contact the development team.


NEXT_PUBLIC_SUPABASE_URL=https://vtyqbodhgnnpwwzqnxta.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ0eXFib2RoZ25ucHd3enFueHRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg1MTc5NjUsImV4cCI6MjA1NDA5Mzk2NX0.hE6hc1l5GhegWCpU5xTD59uHk4LWEvNLxyyxRqp9vTc