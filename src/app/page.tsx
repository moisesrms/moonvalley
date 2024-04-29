"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Menubar, MenubarMenu } from "@radix-ui/react-menubar";
import { book } from "./api/book/core/entity";

export default function Home() {
  const [books, setBooks] = useState<book[]>([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getBooks = async () => {
      const response = await fetch("/api/book?page=" + page);
      const { books } = await response.json();
      setBooks(books);
    };
    getBooks();
  }, [page]);

  return (
    <main className="flex min-h-screen flex-col items-center px-24 py-14 h-screen">
      <Menubar className="fixed top-0 flex items-center justify-center p-3 border bg-primary text-primary-foreground w-full rounded-md">
        <MenubarMenu>
          <h1>Nile.com</h1>
        </MenubarMenu>
      </Menubar>

      <div className="z-10 w-full max-w-5xl items-center justify-evenly font-mono text-sm flex flex-wrap">
        {books.map((book) => (
          <Card key={book.id} className="w-1/4 m-2">
            <CardHeader>
              <CardTitle>{book.name}</CardTitle>
              <CardDescription>
                {book.isWishListed ? "WishListed" : "Not WishListed"}.
              </CardDescription>
            </CardHeader>
            <CardContent></CardContent>
            <CardFooter className="flex justify-between">
              <Button className="w-full">
                {book.isWishListed ? "Remove from WishList" : "Add to WishList"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </main>
  );
}
