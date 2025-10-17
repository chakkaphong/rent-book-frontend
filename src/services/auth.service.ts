import { API_BASE_URL } from "../config/app";
import type { LoginRequest, LoginResponse } from "../types/Auth";

export async function login(req: LoginRequest): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Login failed");


    return res.json();
}