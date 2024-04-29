import { books } from "../booklist";
import { book } from "./entity";

const bookStore = new Map<string, book>();

books.forEach((book) => {
  bookStore.set(book.id, book);
});

export function getBooks(page?: number) {
  if (!page) page = 1;
  const booksArray = Array.from(bookStore.values());
  const books = booksArray.slice((page - 1) * 6, page * 6);
  const pageQtd = Math.ceil(booksArray.length / 6);
  return { books, pageQtd };
}

export function getBook(id: string) {
  return bookStore.get(id);
}

export function updateWishListStatus(id: string, isWishListed = true) {
  const book = getBook(id);
  if (book) {
    book.isWishListed = isWishListed;
    bookStore.set(book.id, book);
    return book;
  }
  return null;
}

export function getWishList(page?: number) {
  if (!page) page = 1;
  const wishList = Array.from(bookStore.values()).filter(
    (book) => book.isWishListed
  );

  console.log({ wishList });

  const books = wishList.slice((page - 1) * 6, page * 6);
  const pageQtd = Math.ceil(wishList.length / 6);
  return { books, pageQtd };
}
