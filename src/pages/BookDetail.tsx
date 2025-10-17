import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSWR, { mutate } from "swr";
import { fetcher } from "../utils/fetcher";
import type { BookDetail } from "../types/Book";
import type { User } from "../types/User";
import { rentBook, returnBook } from "../services/rental.service";
import type { RentBookRequest, ReturnBookRequest } from "../types/Rental";
import { API_BASE_URL } from "../config/app";

export default function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showRent, setShowRent] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [returningId, setReturningId] = useState<string | null>(null);

  const {
    data: book,
    isLoading,
    error,
  } = useSWR<BookDetail>(id ? `/books/${id}` : null, fetcher);

  const { data: users } = useSWR<User[]>("/customers", fetcher);

  const handleRent = async () => {
    if (!selectedUser) return alert("Please select a user");
    if (!id) return alert("Book ID missing");

    try {
      const payload: RentBookRequest = {
        userId: selectedUser,
        books: [{ bookId: id }],
      };
      const resp = await rentBook(payload);
      if (resp.success) {
        mutate(`/books/${id}`); // รีเฟรชข้อมูล
        setShowRent(false);
        setSelectedUser("");
      } else {
        alert(resp.message);
      }
    } catch (err) {
      alert("Failed to rent book.");
    }
  };

  const handleReturn = async (userId: string) => {
    if (!window.confirm("Are you sure you want to return this book?")) return;
    if (!id) return;

    try {
      const payload: ReturnBookRequest = {
        userId,
        books: [{ bookId: id }],
      };
      const resp = await returnBook(payload);
      if (resp.success) {
        mutate(`/books/${id}`);
      } else {
        alert("Failed to return book.");
      }
    } catch (err) {
      alert("Failed to return book.");
    } finally {
      setReturningId(null);
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500">Loading...</p>
      </div>
    );

  if (!book || error)
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-500">Book not found.</p>
      </div>
    );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        {/* Book Info */}
        <div className="flex gap-6 mb-6">
          {book.cover && (
            <img
              src={`${API_BASE_URL}${book.cover}`}
              alt={book.title}
              className="w-48 h-64 object-cover rounded"
            />
          )}
          <div>
            <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
            <p>
              <strong>Author:</strong> {book.author}
            </p>
            <p>
              <strong>Publication:</strong> {book.publication}
            </p>
            <p>
              <strong>Year:</strong> {book.year}
            </p>
            <p>
              <strong>Total Stock:</strong> {book.totalStock}
            </p>
          </div>
        </div>

        {/* Rent Book Button */}
        <button
          onClick={() => setShowRent(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
        >
          Rent Book
        </button>

        {showRent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow w-full max-w-sm">
              <h2 className="text-xl font-bold mb-4">Select User to Rent</h2>
              {!users ? (
                <p>Loading users...</p>
              ) : (
                <select
                  value={selectedUser}
                  onChange={(e) => setSelectedUser(e.target.value)}
                  className="w-full p-3 border rounded mb-4"
                >
                  <option value="">-- Select User --</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.username}
                    </option>
                  ))}
                </select>
              )}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowRent(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleRent}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Rent
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Rentals Table */}
        <h2 className="text-2xl font-bold mb-2">Current Rentals</h2>
        {book.rentals && book.rentals.length > 0 ? (
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Username</th>
                <th className="border px-4 py-2">Rent Date</th>
                <th className="border px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {book.rentals.map((r) => (
                <tr key={r.id}>
                  <td className="border px-4 py-2">{r.user.username}</td>
                  <td className="border px-4 py-2">
                    {new Date(r.rentDate).toLocaleString()}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      disabled={returningId === r.id}
                      onClick={() => handleReturn(r.user.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      {returningId === r.id ? "Returning..." : "Return"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No current rentals.</p>
        )}

        {/* Back button */}
        <div className="mt-6">
          <button
            onClick={() => navigate("/books")}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}
