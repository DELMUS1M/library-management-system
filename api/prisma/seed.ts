import { PrismaClient, Role } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clean existing data
  await prisma.review.deleteMany();
  await prisma.book.deleteMany();
  await prisma.genre.deleteMany();
  await prisma.user.deleteMany();

  // Create Users
  const librarian = await prisma.user.create({
    data: {
      email: "librarian@library.com",
      name: "Head Librarian",
      role: Role.LIBRARIAN,
    },
  });

  const patron = await prisma.user.create({
    data: {
      email: "ogoradelmus1@gmail.com",
      name: "Delmus",
      role: Role.PATRON,
    },
  });

  // Create 5 Genres
  const genresData = [
    { name: "Fiction" },
    { name: "Science Fiction" },
    { name: "Non-Fiction" },
    { name: "Mystery & Thriller" },
    { name: "Technology" },
  ];

  const createdGenres: Record<string, string> = {};
  for (const g of genresData) {
    const genre = await prisma.genre.create({ data: g });
    createdGenres[g.name] = genre.id;
  }

  // Create 16 Books across genres
  const booksData = [
    // Fiction
    { title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", publishedYr: 1960, genreName: "Fiction" },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", publishedYr: 1925, genreName: "Fiction" },
    { title: "1984", author: "George Orwell", isbn: "9780451524935", publishedYr: 1949, genreName: "Fiction" },

    // Science Fiction
    { title: "Dune", author: "Frank Herbert", isbn: "9780441172719", publishedYr: 1965, genreName: "Science Fiction" },
    { title: "Neuromancer", author: "William Gibson", isbn: "9780441569564", publishedYr: 1984, genreName: "Science Fiction" },
    { title: "Foundation", author: "Isaac Asimov", isbn: "9780553293357", publishedYr: 1951, genreName: "Science Fiction" },
    { title: "Snow Crash", author: "Neal Stephenson", isbn: "9780553380958", publishedYr: 1992, genreName: "Science Fiction" },

    // Non-Fiction
    { title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", isbn: "9780062316097", publishedYr: 2014, genreName: "Non-Fiction" },
    { title: "Educated", author: "Tara Westover", isbn: "9780399590504", publishedYr: 2018, genreName: "Non-Fiction" },
    { title: "Thinking, Fast and Slow", author: "Daniel Kahneman", isbn: "9780374533557", publishedYr: 2011, genreName: "Non-Fiction" },

    // Mystery & Thriller
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson", isbn: "9780307949486", publishedYr: 2005, genreName: "Mystery & Thriller" },
    { title: "Gone Girl", author: "Gillian Flynn", isbn: "9780307588371", publishedYr: 2012, genreName: "Mystery & Thriller" },
    { title: "The Da Vinci Code", author: "Dan Brown", isbn: "9780307474278", publishedYr: 2003, genreName: "Mystery & Thriller" },

    // Technology
    { title: "Designing Data-Intensive Applications", author: "Martin Kleppmann", isbn: "9781449373320", publishedYr: 2017, genreName: "Technology" },
    { title: "Clean Code", author: "Robert C. Martin", isbn: "9780132350884", publishedYr: 2008, genreName: "Technology" },
    { title: "The Pragmatic Programmer", author: "Andrew Hunt & David Thomas", isbn: "9780135957059", publishedYr: 2019, genreName: "Technology" },
  ];

  for (const b of booksData) {
    const book = await prisma.book.create({
      data: {
        title: b.title,
        author: b.author,
        isbn: b.isbn,
        publishedYr: b.publishedYr,
        genreId: createdGenres[b.genreName],
      },
    });

    // Seed a stretch review for one book
    if (b.isbn === "9781449373320") {
      await prisma.review.create({
        data: {
          rating: 5,
          comment: "Essential reading for system design and architecture!",
          bookId: book.id,
          userId: patron.id,
        },
      });
    }
  }

  console.log(`Seeding complete! Seeded ${Object.keys(createdGenres).length} genres and ${booksData.length} books.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
