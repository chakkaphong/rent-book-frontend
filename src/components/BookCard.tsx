import React from "react";
import { Link } from "react-router-dom";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
}

export default function BookCard({ id, title, author }: BookCardProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition mb-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="text-gray-600">Author: {author}</p>
      <Link
        to={`/books/${id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        View Detail
      </Link>
    </div>
  );
}
