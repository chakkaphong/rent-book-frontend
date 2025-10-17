import { API_BASE_URL } from "../config/app";
import type { RentBookRequest, RentBookResponse, ReturnBookRequest,ReturnBookResponse } from "../types/Rental";

export async function rentBook(req: RentBookRequest): Promise<RentBookResponse> {
    const token = localStorage.getItem("token");
    const res = await fetch(`${API_BASE_URL}/rentals`, {
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
    const res = await fetch(`${API_BASE_URL}/rentals/return`, {
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