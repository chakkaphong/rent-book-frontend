import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginRequest } from "../types/Auth";
import { login } from "../services/auth.service";

export default function Login() {
  const [user, setUserData] = useState<LoginRequest>({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      const resp = await login(user);
      if (resp.access_token) {
        localStorage.setItem("token", resp.access_token);
        navigate("/books");
      } else {
        alert("Failed login");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
        <input
          type="text"
          placeholder="Username"
          value={user.username}
          onChange={(e) => setUserData({ ...user, username: e.target.value })}
          className="w-full mb-4 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={user.password}
          onChange={(e) => setUserData({ ...user, password: e.target.value })}
          className="w-full mb-6 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 transition">
          Login
        </button>
      </form>
    </div>
  );
}
