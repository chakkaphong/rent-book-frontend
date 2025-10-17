import { Link } from "react-router-dom";
import useSWR from "swr";
import { useState, useEffect } from "react";
import type { BookList } from "../types/Book";
import { searchBooks } from "../services/book.service";
import { API_BASE_URL } from "../config/app";

export default function BookList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data: books, isLoading } = useSWR<BookList[]>(
    ["searchBooks", debouncedTerm],
    () => searchBooks(debouncedTerm),
    { revalidateOnFocus: false }
  );

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Book List</h1>
        <Link
          to="/books/create"
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Create Book
        </Link>
      </div>

      {/* 🔍 Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by title or author..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* 📚 Book Grid */}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {books?.length ? (
          books.map((book: BookList) => (
            <div key={book.id} className="bg-white p-4 rounded shadow">
              {book.cover && (
                <img
                  src={`${API_BASE_URL}${book.cover}`}
                  alt={book.title}
                  className="w-full h-48 object-cover rounded mb-2"
                />
              )}
              <h2 className="text-xl font-bold">{book.title}</h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <div className="mt-2 flex gap-2">
                <Link
                  to={`/books/update/${book.id}`}
                  className="text-yellow-500 hover:underline"
                >
                  Edit
                </Link>
                <Link
                  to={`/books/${book.id}`}
                  className="text-blue-500 hover:underline"
                >
                  Detail
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No books found.</p>
        )}
      </div>
    </div>
  );
}
