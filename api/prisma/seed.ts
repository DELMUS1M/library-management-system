import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding library management system data...');

  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  const hashedPassword = await bcrypt.hash('Password123!', 10);
  
  const librarian = await prisma.user.create({
    data: {
      email: 'librarian@library.com',
      password: hashedPassword,
      name: 'Head Librarian',
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: 'patron@library.com',
      password: hashedPassword,
      name: 'John Doe',
      role: Role.PATRON,
    },
  });

  const genres = await Promise.all([
    prisma.genre.create({ data: { name: 'Fiction' } }),
    prisma.genre.create({ data: { name: 'Science Fiction' } }),
    prisma.genre.create({ data: { name: 'Technology & Computing' } }),
    prisma.genre.create({ data: { name: 'History' } }),
    prisma.genre.create({ data: { name: 'Philosophy' } }),
  ]);

  const [fiction, sciFi, tech, history, philosophy] = genres;

  const booksData = [
    { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', isbn: '9780743273565', publishedYr: 1925, totalCopies: 5, genreId: fiction.id },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', isbn: '9780061120084', publishedYr: 1960, totalCopies: 4, genreId: fiction.id },
    { title: '1984', author: 'George Orwell', isbn: '9780451524935', publishedYr: 1949, totalCopies: 6, genreId: sciFi.id },
    { title: 'Brave New World', author: 'Aldous Huxley', isbn: '9780060850524', publishedYr: 1932, totalCopies: 3, genreId: sciFi.id },
    { title: 'Dune', author: 'Frank Herbert', isbn: '9780441172719', publishedYr: 1965, totalCopies: 5, genreId: sciFi.id },
    { title: 'Clean Code', author: 'Robert C. Martin', isbn: '9780132350884', publishedYr: 2008, totalCopies: 8, genreId: tech.id },
    { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', isbn: '9781449373320', publishedYr: 2017, totalCopies: 10, genreId: tech.id },
    { title: 'The Pragmatic Programmer', author: 'Andrew Hunt & David Thomas', isbn: '9780135957059', publishedYr: 2019, totalCopies: 7, genreId: tech.id },
    { title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', isbn: '9780062316097', publishedYr: 2014, totalCopies: 6, genreId: history.id },
    { title: 'Guns, Germs, and Steel', author: 'Jared Diamond', isbn: '9780393317558', publishedYr: 1997, totalCopies: 4, genreId: history.id },
    { title: 'Meditations', author: 'Marcus Aurelius', isbn: '9780812968255', publishedYr: 180, totalCopies: 5, genreId: philosophy.id },
    { title: 'Beyond Good and Evil', author: 'Friedrich Nietzsche', isbn: '9780140449235', publishedYr: 1886, totalCopies: 3, genreId: philosophy.id },
    { title: 'Neuromancer', author: 'William Gibson', isbn: '9780441569560', publishedYr: 1984, totalCopies: 4, genreId: sciFi.id },
    { title: 'Refactoring', author: 'Martin Fowler', isbn: '9780134757599', publishedYr: 2018, totalCopies: 5, genreId: tech.id },
    { title: 'The Silk Roads', author: 'Peter Frankopan', isbn: '9781101912379', publishedYr: 2015, totalCopies: 3, genreId: history.id },
    { title: 'Critique of Pure Reason', author: 'Immanuel Kant', isbn: '9780521555548', publishedYr: 1781, totalCopies: 2, genreId: philosophy.id },
  ];

  for (const book of booksData) {
    await prisma.book.create({ data: book });
  }

  console.log('Database successfully seeded with 2 users, 5 genres, and 16 books!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
