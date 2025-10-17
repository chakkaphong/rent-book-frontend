import type { LoginRequest, LoginResponse } from "../types/Auth";

export async function login(req: LoginRequest): Promise<LoginResponse> {
    const res = await fetch("http://127.0.0.1:3000/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    });

    if (!res.ok) throw new Error("Login failed");


    return res.json();
}