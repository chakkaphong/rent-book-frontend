import type { BookCreateReqeust, BookUpdateReqeust } from "../types/Book";


export async function createBook(book: BookCreateReqeust) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:3000/books", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(book),
    });

    if (!res.ok) throw new Error("Create book failed");

    return res.json();
}


export async function searchBooks(search?: string) {
    const res = await fetch("http://127.0.0.1:3000/books/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search }),
    });

    if (!res.ok) throw new Error("Search books failed");
    return res.json();
}


export async function updateBook(book: BookUpdateReqeust) {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:3000/books", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(book),
    });

    if (!res.ok) throw new Error("Update book failed");

    return res.json();
}
