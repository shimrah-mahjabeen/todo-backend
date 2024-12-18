# todo-backend


## Prerequisites

-Node.js: Ensure Node.js (v18+) is installed on your system.

-PostgreSQL: A running instance of PostgreSQL.

-npm or Yarn: A package manager for installing dependencies.

-Prisma CLI: Install globally using npm install -g prisma.

## Project Setup
1. Clone the Repository

`git clone https://github.com/<your-username>/todo-backend.git`

`cd todo-backend`

2. Install Dependencies
Run the following command to install the required packages:

`npm install`

## Database Configuration
1. Create a PostgreSQL Database

Log in to your PostgreSQL server and create a new database:

### CREATE DATABASE todo_backend;
2. Configure the .env File

Create a .env file in the root directory and add your PostgreSQL connection string:

`DATABASE_URL=postgresql://<username>:<password>@<host>:<port>/todo_backend`

Replace <username>, <password>, <host>, and <port> with your PostgreSQL credentials.

### Setting up Prisma
1. Generate Prisma Client
Run the following command to generate the Prisma Client:

`npx prisma generate`

2. Apply Migrations

To apply the schema to your database:

`npx prisma migrate dev --name init`

This will create a migration file and sync the database schema with your Prisma schema.

3. Seed the Database (Optional)

If you have seed data to populate the database, set up a seed script in prisma/seed.ts and run:


`npx prisma db seed`

### Running the Project
1. Development Mode

Start the project in development mode:

`npm run dev`

2. Build and Start

Build and run the production version:

`npm run build`

`npm start`
