import type { RentBookRequest, RentBookResponse, ReturnBookRequest,ReturnBookResponse } from "../types/Rental";

export async function rentBook(req: RentBookRequest): Promise<RentBookResponse> {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:3000/rentals", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Rent book failed");

    return res.json();
}


export async function returnBook(req: ReturnBookRequest): Promise<ReturnBookResponse> {
    const token = localStorage.getItem("token");
    const res = await fetch("http://127.0.0.1:3000/rentals/return", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Return book failed");

    return res.json();
}