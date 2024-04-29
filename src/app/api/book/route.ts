import { NextRequest, NextResponse } from "next/server";
import { getBooks } from "./core/repository";

export async function GET(request: NextRequest) {
  const page = request.nextUrl.searchParams.get("page");
  const books = getBooks(page ? Number(page) : 1);
  return NextResponse.json(books);
}
