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

##### Create a .env file in the root of your project and add the following variables:
```
DATABASE_URL=mysql://username:password@localhost:3306/yourdatabase
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000
SALT_ROUNDS=12
```

### 4.Set up Prisma:

##### Generate Prisma client:
```
npx prisma generate
```
##### Apply database migrations:

```
npx prisma migrate dev --name init
```

### 5.Seed the database:

##### Run the seed script to populate the database with initial data:
```
npx ts-node prisma/seed.ts

```

## Running the Application

##### First, run the development server:

```
npm run dev
# or
yarn dev
# or
pnpm dev

```

##### Open http://localhost:3000 with your browser to see the result.


## Learn more 

### 🔒 Authentication
The application uses NextAuth for authentication. Users can sign in on the landing page. After signing in, they will be redirected to the dashboard.

### 🗂️ Prisma Schema

##### This is your Prisma schema file (prisma/schema.prisma):

```
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
}

model User {
  id       Int     @id @default(autoincrement())
  email    String  @unique
  password String
  name     String?
  image    String?
}

```

### 🌱 Seed Script

##### The seed script (prisma/seed.ts) adds an initial user to the database:


```
import { PrismaClient } from '@prisma/client';
import { hash } from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const password = await hash('test', 12);
  const user = await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: {},
    create: {
      email: 'test@test.com',
      name: 'Test User',
      password,
    },
  });
  console.log({ user });
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

```

