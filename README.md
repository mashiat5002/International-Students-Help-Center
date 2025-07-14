# International Students Help Center

A full-stack web platform to support international students with AI-powered guidance, expert consultations, document management, and more. Built with Next.js, React, MongoDB, and Tailwind CSS.

---

## Features

- **AI Assistance:** Get instant answers, personalized suggestions, and application help from an AI assistant.
- **Expert Consultation:** Book meetings, join video conferences, and interact with education experts.
- **Scholarship Database:** Search and filter scholarships and grants for studying abroad.
- **Document Management:** Upload, review, and manage important study documents.
- **Seminar Scheduling:** Organize and join online seminars and events.
- **Country Selector:** Explore study opportunities by country.
- **User Profiles:** Manage student and expert profiles, including social links and professional info.
- **Admin Dashboard:** Manage users, experts, and platform content.

---

## Directory Structure (Key Parts)

```
International-Students-Help-Center/
├── public/                  # Static assets (images, icons, Spline scenes)
├── src/
│   ├── app/
│   │   ├── components/      # Reusable UI components
│   │   │   ├── Landing/     # Homepage hero, features, country selector
│   │   │   ├── layout/      # Navbar, Footer, Layout, BackButton
│   │   │   ├── common/      # Toast, SplineLoader, LoadingSpinner, etc.
│   │   │   ├── auth/        # Auth modals/cards
│   │   │   ├── Expert Deshboard/ # Expert dashboard widgets
│   │   ├── (utils)/         # API call utilities (fetch, push, update, etc.)
│   │   ├── api/             # Next.js API routes (REST endpoints)
│   │   ├── models/          # Mongoose models (user, expert, journey, etc.)
│   │   ├── homepage/        # Homepage route
│   │   ├── ai-assistance/   # AI assistant feature page
│   │   ├── experts-consultation/ # Expert consultation feature page
│   │   ├── video-conference/     # Video conference feature page
│   │   ├── admin-dashboard/ # Admin dashboard
│   │   ├── ...              # Other feature routes
│   ├── pages/               # (Legacy/compatibility)
│   ├── middleware.ts        # Next.js middleware
├── lib/
│   └── auth/                # Authentication backend logic
├── package.json             # Project dependencies and scripts
├── tsconfig.json            # TypeScript config
├── tailwind.config.js       # Tailwind CSS config
├── README.md                # Project documentation
```

---

## Tech Stack

- **Frontend:** Next.js, React, Tailwind CSS, Framer Motion
- **Backend:** Next.js API routes, Mongoose, MongoDB
- **Authentication:** NextAuth.js, JWT
- **Real-time:** Socket.io for video and chat
- **Email:** Nodemailer
- **3D/Animation:** Spline, Framer Motion
- **Other:** TypeScript, ESLint, PostCSS

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Run the development server:**
   ```bash
   npm run dev
   ```
3. **Open [http://localhost:3000](http://localhost:3000) in your browser.**

---

## Notable Components

- `src/app/components/Landing/Hero.tsx` - Homepage hero with dynamic image slider
- `src/app/components/Landing/Features.tsx` - Homepage features section
- `src/app/components/Landing/CountrySelector.tsx` - Country selection UI
- `src/app/components/layout/Navbar.tsx` - Responsive navigation bar
- `src/app/components/layout/Footer.tsx` - Footer with contact, links, and subscription
- `src/app/components/common/Toast.tsx` - Toast notification
- `src/app/components/common/SplineLoader.tsx` - 3D loader animation
- `src/app/components/common/LoadingSpinner.tsx` - Loading spinner
- `src/app/components/Expert Deshboard/Expert_dashboard.tsx` - Expert dashboard
- `src/app/components/Expert Deshboard/Profile.tsx` - Expert profile management
- `src/app/components/Expert Deshboard/MeetingRequests.tsx` - Meeting requests management

---

## API & Utilities

- All API routes are in `src/app/api/` (REST endpoints for auth, meetings, seminars, etc.)
- Utility functions for API calls are in `src/app/(utils)/`
- Data models (Mongoose schemas) are in `src/app/models/`

---

## Static Assets

- All images and static files are in the `public/` directory.
- Spline 3D scenes are in `public/spline/`.

---

## Contributing

1. Fork the repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## License

This project is for educational and demonstration purposes.
