import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database for Borrow Tracking, Space Booking & Admin System...');

  // Password hash
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Users
  const librarian = await prisma.user.upsert({
    where: { email: 'librarian@library.org' },
    update: {},
    create: {
      email: 'librarian@library.org',
      name: 'Head Librarian',
      password: hashedPassword,
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.upsert({
    where: { email: 'patron@example.com' },
    update: {},
    create: {
      email: 'patron@example.com',
      name: 'Alex Patron',
      password: hashedPassword,
      role: Role.PATRON,
    },
  });

  // Genres
  const fiction = await prisma.genre.upsert({
    where: { name: 'Fiction' },
    update: {},
    create: { name: 'Fiction' },
  });

  const sciFi = await prisma.genre.upsert({
    where: { name: 'Science Fiction' },
    update: {},
    create: { name: 'Science Fiction' },
  });

  // Spaces
  const roomA = await prisma.space.upsert({
    where: { name: 'Study Room A' },
    update: {},
    create: { name: 'Study Room A', capacity: 4, location: '2nd Floor - East Wing' },
  });

  const roomB = await prisma.space.upsert({
    where: { name: 'Conference Room B' },
    update: {},
    create: { name: 'Conference Room B', capacity: 10, location: '3rd Floor - Main Hall' },
  });

  // Book
  const book = await prisma.book.upsert({
    where: { isbn: '9780141439518' },
    update: {},
    create: {
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '9780141439518',
      publishedYr: 1813,
      totalCopies: 5,
      availableCopies: 4,
      genreId: fiction.id,
    },
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
