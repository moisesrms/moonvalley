import { NextRequest, NextResponse } from "next/server";
import { getBook, updateWishListStatus, getWishList } from "../core/repository";

export async function POST(request: Request) {
  const { id } = await request.json();
  if (!id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const book = getBook(id);
  if (!book) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  updateWishListStatus(book.id, !book.isWishListed);

  return NextResponse.json(book);
}

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const books = getWishList(page ? Number(page) : 1);
  return NextResponse.json(books);
}
