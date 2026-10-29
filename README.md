# Library Management System - Data Layer Implementation

## Project Overview
This repository contains the data layer implementation for the Library Management System, built with NestJS / TypeScript, PostgreSQL, and Prisma ORM.

## Schema Decisions
### Why Book References Genre via Foreign Key vs. Embedding
In traditional document-oriented databases (like MongoDB), genres might be embedded as sub-documents or array tags inside a book document. However, in our relational PostgreSQL model built with Prisma, **`Book` references `Genre` through a explicit foreign key (`genreId`) with a `@relation` constraint**. 

Here are the primary architectural reasons for this decision:
1. **Data Normalization & Integrity**: Normalizing genres into a distinct table prevents data duplication and inconsistency (e.g., typos in genre names across hundreds of books).
2. **Single Source of Truth**: Updating a genre name or metadata requires modifying only one row in the `Genre` table rather than updating thousands of book records.
3. **Query Performance & Indexing**: Filtering or grouping books by genre is fast and indexable when referencing a normalized primary key foreign key relation.
4. **Referential Integrity**: PostgreSQL enforces foreign key constraints, ensuring that a book cannot reference a non-existent genre.

### Modeling in Prisma vs. Document Databases (Stretch Note)
Modeling relations in Prisma provides strong compile-time type safety via generated TypeScript client interfaces. Unlike document databases where relations are manually resolved or joins require complex aggregation pipelines (`$lookup`), Prisma handles joins seamlessly via nested `include` queries (`prisma.book.findMany({ include: { genre: true } })`) while retaining relational schema guarantees.

## Database Setup & Seeding

1. **Environment Configuration**
   Copy `.env.example` to `.env` inside the `api` folder and update your PostgreSQL connection string:
   ```bash
   cp api/.env.example api/.env
   ```

2. **Run Migrations**
   ```bash
   cd api
   npx prisma migrate dev --name init
   ```

3. **Seed Database**
   ```bash
   npx prisma db seed
   ```

## Repository Structure
```
api/
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   └── prisma/
│       └── prisma.service.ts
└── .env.example
README.md
push_to_github.ps1
```
