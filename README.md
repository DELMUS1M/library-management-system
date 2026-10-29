# Library Management System - Complete Book API, Auth & Authorization

This repository contains the full backend implementation for the Library Management System, built with NestJS, Prisma ORM, PostgreSQL, and Passport JWT Auth.

## Key Features & Required Files Checklist

- Genres Module (`api/src/genres/`): Full CRUD (`create`, `findAll`, `findOne`, `update`, `remove`) guarded for `LIBRARIAN` access.
- Books Module (`api/src/books/`):
  - `dto/create-book.dto.ts` with `class-validator` decorators (`title`, `author`, `isbn`, `publishedYr`, `totalCopies`, `genreId`).
  - `books.controller.ts` with `GET /books` supporting query params (`genreId`, `search`, `page`, `limit`).
  - `books.service.ts` building Prisma `where` clause for title/author search and skip/take pagination.
  - Guarded `POST`, `PATCH`, `DELETE` endpoints for `LIBRARIAN` users.
- Auth System (`api/src/auth/`):
  - `POST /auth/register` and `POST /auth/login` issuing JWTs.
  - Passwords securely hashed with `bcrypt`.
  - `jwt.strategy.ts` & `jwt-auth.guard.ts` extending `AuthGuard('jwt')`.
  - `roles.decorator.ts` & `roles.guard.ts` verifying `@Roles(Role.LIBRARIAN)`.
- Global Configuration (`api/src/main.ts`):
  - `ValidationPipe({ whitelist: true })` globally registered.
  - `enableCors()` active.
- Users Stretch Feature (`api/src/users/`):
  - `GET /users/profile` extracting user from `@Req()`.
- Postman Collection (`docs/postman_collection.json`):
  - Pre-configured requests for every endpoint built this week.

## Getting Started

1. Environment Setup: copy api/.env.example to api/.env
2. Install Dependencies & Seed Database: npm install, npx prisma migrate dev, npx prisma db seed
3. Start Development Server: npm run start:dev
4. Import Postman Collection: docs/postman_collection.json
