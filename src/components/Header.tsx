import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
      <h1 className="text-xl font-bold">Book Rental</h1>
      <nav>
        <Link to="/books" className="mr-4 hover:underline">
          Books
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </nav>
    </header>
  );
}
