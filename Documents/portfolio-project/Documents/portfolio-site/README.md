# Portfolio & Personal Website

A Next.js 15 + Tailwind CSS portfolio website with an Admin Dashboard for content management.

## Features

- **Public Pages**: Home, About, Experience, Portfolio (PPTs/Links), Contact, Resume.
- **Admin Dashboard**: Manage all content (Experience, Portfolio items, Links, Texts) via a secure admin panel.
- **Tech Stack**: Next.js 15 (App Router), Prisma, PostgreSQL, Tailwind CSS, Shadcn/UI compatible components.
- **Responsive**: Mobile-first design.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and fill in your database credentials and a JWT secret.

```bash
cp .env.example .env
```

For local development, you need a PostgreSQL database running.

### 3. Database Setup

Initialize the database schema:

```bash
npx prisma generate
npx prisma db push
```

(Optional) Seed the database if you have a seed script (not included by default).

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Static Preview

A standalone static HTML preview is available at `static-preview/index.html`. You can open this file directly in your browser to see the visual style without running the server.

## Deployment (Vercel)

1. Push this repository to GitHub/GitLab.
2. Import the project in Vercel.
3. Configure Environment Variables in Vercel:
   - `DATABASE_URL`: Your Postgres connection string (e.g. from Vercel Postgres).
   - `JWT_SECRET`: A random string for auth.
   - `POSTGRES_URL_NON_POOLING`: Same as DATABASE_URL usually, or specific for migrations.
4. Deploy. Vercel will automatically detect Next.js and build.

## Admin Access

Visit `/admin/login` to log in.
(Note: You need to manually create an Admin user in the database or use a seed script initially, or update the code to allow first-time registration if preferred).

