# Library Management System - Borrow Tracking, Space Booking & Admin Routes

This repository contains the backend implementation for borrow tracking, study space bookings, and protected admin routes built with NestJS, Prisma ORM, and PostgreSQL.

## Features Implemented
1. **Prisma Schema (`api/prisma/schema.prisma`)**:
   - `BorrowStatus` (`PENDING`, `APPROVED`, `REJECTED`, `RETURNED`, `OVERDUE`) and `BookingStatus` (`PENDING`, `CONFIRMED`, `CANCELLED`) enums.
   - `BorrowRequest`, `Space`, and `Booking` models with full relational constraints to `User` and `Book`.

2. **Borrow Tracking (`POST /borrow-requests`, `PATCH /borrow-requests/:id/status`)**:
   - `POST /borrow-requests` creates a borrow request from reading list items.
   - `PATCH /borrow-requests/:id/status` (Librarian only) updates status and automatically computes late fines.

3. **Fine Calculator & Unit Testing (`fine-calculator.ts` & `fine-calculator.spec.ts`)**:
   - Pure typed `calculateFine(dueDate, returnDate, ratePerDay)` function.
   - Unit tests covering on-time returns ($0.00 fine) and late returns (accurate daily rate computation).

4. **Space Booking with Overlap Conflict Checks (`POST /bookings`)**:
   - Server-side conflict detection via Prisma `findFirst` checking time overlaps (`startTime < newEnd AND endTime > newStart`).
   - Throws `ConflictException` (409) if the space is already booked.

5. **Admin Routes (`/admin/borrow-requests`, `/admin/bookings`)**:
   - Protected with `@Roles(Role.LIBRARIAN)` and `RolesGuard`.

## Running Unit Tests
```bash
cd api
npm run test
```

## Setup Instructions
```bash
cd api
cp .env.example .env
npm install
npx prisma migrate dev --name init
npx prisma db seed
npm run start:dev
```
