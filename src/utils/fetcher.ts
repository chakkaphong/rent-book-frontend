import { API_BASE_URL } from "../config/app";

export async function fetcher(path: string, payload?: any) {
    const url = /^https?:\/\//i.test(path)
        ? path
        : `${API_BASE_URL}${path.startsWith("/") ? "" : "/"}${path}`;

    const res = await fetch(url, {
        method: payload ? "POST" : "GET",
        headers: {
            "Content-Type": "application/json",
        },
        body: payload ? JSON.stringify(payload) : undefined,
    });

    if (!res.ok) {
        throw new Error("Failed to fetch");
    }

    return res.json();
}
