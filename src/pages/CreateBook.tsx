import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../services/upload.service";
import { createBook } from "../services/book.service";
import type { BookCreateReqeust } from "../types/Book";

export default function CreateBook() {
  const [bookData, setBookData] = useState<BookCreateReqeust>({
    title: "",
    author: "",
    ISBN: "",
    publication: "",
    year: "",
    pricePerDay: 0,
    totalStock: 0,
    cover: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");
  const navigate = useNavigate();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (imageFile) {
        const imgPath = await uploadImage(imageFile);
        bookData.cover = imgPath;

        await createBook(bookData);
      }
      navigate("/books");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-600">
          📚 Create Book
        </h1>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter book title"
            value={bookData.title}
            onChange={(e) =>
              setBookData({ ...bookData, title: e.target.value })
            }
            className="w-full p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Author
          </label>
          <input
            type="text"
            placeholder="Enter book author"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            ISBN
          </label>
          <input
            type="text"
            placeholder="Enter book isbn"
            value={bookData.ISBN}
            onChange={(e) => setBookData({ ...bookData, ISBN: e.target.value })}
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Publication
          </label>
          <input
            type="text"
            placeholder="Enter book publication"
            value={bookData.publication}
            onChange={(e) =>
              setBookData({ ...bookData, publication: e.target.value })
            }
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Year
          </label>
          <input
            type="text"
            placeholder="Enter book year"
            value={bookData.year}
            onChange={(e) => setBookData({ ...bookData, year: e.target.value })}
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Price
          </label>
          <input
            type="number"
            placeholder="Enter book price"
            value={bookData.pricePerDay}
            onChange={(e) =>
              setBookData({ ...bookData, pricePerDay: Number(e.target.value) })
            }
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-2">
          <label
            htmlFor="title"
            className="block mb-1 font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            placeholder="Enter book amount"
            value={bookData.totalStock}
            onChange={(e) =>
              setBookData({ ...bookData, totalStock: Number(e.target.value) })
            }
            className="w-full p-3 border rounded mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block mb-1 text-gray-600 font-medium">
            Upload Cover Image
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {preview && (
          <div className="mb-3 flex justify-center">
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-48 object-cover rounded shadow"
            />
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-green-500 text-white p-3 rounded hover:bg-green-600 transition"
        >
          Create
        </button>
      </form>
    </div>
  );
}
