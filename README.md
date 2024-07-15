## 🛠️  Admin Dashboard
This is a simple admin dashboard built with Next.js. The dashboard includes user management features, including a table of all users, and pages for creating and updating user records. The landing page is a sign-in page, and after successful authentication, users are redirected to the dashboard, which includes basic statistics about the users.

## ✨ Features
🛡️ User authentication with NextAuth using JWT strategy.
🕒 Session setup for 12 hours.
👥 User management (list, create, update).
📊 Basic user statistics.
🗄️ Uses Prisma with a MySQL provider for database management.
🛠️ Technologies Used
Next.js
NextAuth.js
Prisma
MySQL
## 🚀 Getting Started
Prerequisites
Node.js
MySQL database

This is a [Next.js](https://nextjs.org/) project with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Installation

### 1.Clone the repository:

```console
git clone https://github.com/DimitarSergeev/next_admin.git
cd next_admin
```
### 2.Install dependencies:

```console
npm install
# or
yarn install
# or
pnpm install
```
### 3.Set up environment variables:

```
DATABASE_URL=mysql://username:password@localhost:3306/yourdatabase
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
SALT_ROUNDS=12
```

### 4.Set up Prisma:

```
npx prisma generate
```
##### Apply database migrations:

```
npx prisma migrate dev --name init
```