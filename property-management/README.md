# PropertyHub - Property Management Platform

A comprehensive property management web application built for the Kenyan market, serving landlords, property managers, tenants, and communities with a focus on M-PESA integration.

## 🚀 Features

### Core Features
- **User Authentication & Role Management** - Multi-role system (Admin, Landlord, Tenant, Maintenance Staff, Community Manager)
- **Property Management** - Complete property and unit management with images and documents
- **Tenant Management** - Tenant profiles, lease management, and onboarding
- **Payment Processing** - M-PESA integration (STK Push), automated invoicing, receipt generation
- **Maintenance Management** - Work order tracking, vendor management, preventive maintenance
- **Community Features** - Announcements, events, amenity booking
- **Financial Reporting** - Revenue tracking, expense management, analytics
- **Notifications** - SMS (Africa's Talking), Email (Resend), In-app notifications

### Kenyan Market Focus
- **M-PESA Integration** - Seamless rent collection via Kenya's most popular payment method
- **Local Currency Support** - Kenyan Shillings (KES) formatting and display
- **Compliance Ready** - Built with Kenyan property management regulations in mind

## 🛠 Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI components built on Radix UI
- **Lucide React** - Beautiful icons

### Backend & Database
- **Supabase** - Authentication, Database, Storage, and Real-time features
- **PostgreSQL** - Robust relational database
- **Row Level Security (RLS)** - Data security and access control

### State Management & Data Fetching
- **React Query (TanStack Query)** - Server state management and caching
- **Zustand** - Client state management
- **React Hook Form** - Form handling with validation

### Integrations
- **M-PESA Daraja API** - Mobile money payments
- **Africa's Talking** - SMS notifications
- **Resend** - Email services
- **Stripe** - Card payment processing (optional)

## 📦 Installation

### Prerequisites
- Node.js 18+ and npm
- Supabase account and project

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd property-management
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Copy `.env.local` to your local environment and configure:
   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

   # M-PESA Daraja API Configuration
   NEXT_PUBLIC_MPESA_CONSUMER_KEY=your_mpesa_consumer_key
   NEXT_PUBLIC_MPESA_CONSUMER_SECRET=your_mpesa_consumer_secret
   NEXT_PUBLIC_MPESA_SHORTCODE=your_mpesa_shortcode
   NEXT_PUBLIC_MPESA_PASSKEY=your_mpesa_passkey
   MPESA_CALLBACK_URL=your_mpesa_callback_url

   # Other configurations...
   ```

4. **Set up Supabase Database**
   Run the SQL schema provided in `database/schema.sql` to create all necessary tables and set up Row Level Security.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗 Project Structure

```
property-management/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (auth)/            # Authentication pages
│   │   ├── (dashboard)/       # Dashboard and protected pages
│   │   ├── api/               # API routes
│   │   └── globals.css        # Global styles
│   ├── components/            # Reusable UI components
│   │   └── ui/               # shadcn/ui components
│   ├── contexts/             # React contexts
│   ├── hooks/                # Custom React hooks
│   ├── lib/                  # Utility functions and configurations
│   ├── types/                # TypeScript type definitions
│   └── utils/                # Helper functions
├── public/                   # Static assets
└── docs/                     # Documentation
```

## 🔐 Authentication & Authorization

### User Roles
- **Super Admin** - Full system access
- **Property Manager/Landlord** - Property and tenant management
- **Tenant** - Rent payments, maintenance requests, community access
- **Maintenance Staff** - Work orders and repairs
- **Community Manager** - HOA/gated community management

### Security Features
- Email/password authentication with 2FA support
- Role-based access control (RBAC)
- Row Level Security (RLS) in Supabase
- Session management
- Protected API routes

## 💳 Payment Integration

### M-PESA Integration
- STK Push for tenant-initiated payments
- Payment confirmation webhooks
- Transaction status tracking
- Automatic receipt generation

### Payment Methods
- M-PESA (Primary for Kenyan market)
- Bank transfers
- Card payments (via Stripe)
- Cash payments (manual recording)

## 📊 Features Overview

### Property Management
- Multi-property portfolio view
- Property creation wizard
- Unit management with bulk import
- Document storage (title deeds, insurance, permits)
- Property valuation tracking
- Image galleries

### Tenant Management
- Tenant onboarding workflow
- Digital lease management
- Payment history tracking
- Communication logs
- Document management (ID, proof of income)

### Maintenance Management
- Request submission with photo uploads
- Work order assignment and tracking
- Vendor management
- Preventive maintenance scheduling
- Cost tracking and reporting

### Financial Management
- Automated invoice generation
- Payment reminders and notifications
- Revenue and expense tracking
- Financial reports and analytics
- Export to PDF/Excel

## 🚀 Deployment

### Production Deployment
1. Build the application:
   ```bash
   npm run build
   ```

2. Set up production environment variables

3. Deploy to your preferred platform (Vercel, AWS, etc.)

### Environment Variables Required for Production
- All variables from development
- Production Supabase credentials
- Production M-PESA API credentials
- Email and SMS service API keys

## 🧪 Testing

### Manual Testing Checklist
- User registration and login flows
- Role-based access control
- Property creation and management
- Tenant onboarding process
- M-PESA payment integration (sandbox mode)
- Maintenance request workflow
- Report generation
- Mobile responsiveness

## 📱 Mobile Support

The application is fully responsive and works on:
- Desktop browsers
- Tablets
- Mobile phones

## 🔄 Real-time Features

Using Supabase real-time capabilities:
- Live payment status updates
- Real-time maintenance request updates
- Live notifications
- Instant dashboard updates

## 📈 Analytics & Reporting

### Available Reports
- Property performance reports
- Tenant payment history
- Maintenance cost analysis
- Occupancy reports
- Financial statements
- Custom date range reports

### Data Visualization
- Revenue trends
- Occupancy rates
- Maintenance costs by category
- Payment status breakdowns

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Email: support@propertyhub.co.ke
- Documentation: [Link to docs]

## 🗺 Roadmap

### Phase 2 Features
- Mobile app (React Native)
- Advanced analytics with charts
- Lease management automation
- Bulk operations
- Payment plans and installments

### Phase 3 Features
- AI-powered rent price optimization
- Predictive analytics
- Automated lease renewals
- Energy monitoring dashboard
- Multi-currency support

## 🌟 Why PropertyHub?

- **Built for Kenya** - Designed specifically for the Kenyan property market
- **M-PESA First** - Native integration with Kenya's preferred payment method
- **Comprehensive** - All features needed for property management in one platform
- **Modern Tech** - Built with the latest web technologies for reliability and performance
- **Scalable** - Can grow from single properties to large portfolios
- **User-Friendly** - Intuitive interface requiring minimal training

---

**PropertyHub** - Transforming Property Management in Kenya 🇰🇪