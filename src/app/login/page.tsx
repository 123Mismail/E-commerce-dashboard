
 "use client"
import { useState } from "react";
 import {useRouter} from "next/navigation"

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router =  useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Replace with your API endpoint
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
    
      if (response.ok) {
        
        // Redirect to dashboard after successful login
        router.push("/");
      } else {
        // Handle API errors (e.g., invalid credentials)
        const errorData = await response.json(); // Parse the error response
        alert(errorData.message || "Invalid credentials. Please try again.");
      }
    } catch (error) {
      // Handle network errors or unexpected errors
      console.error("Login error:", error);
      alert("An unexpected error occurred. Please check your connection and try again.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
    <form
      onSubmit={handleLogin}
      className="bg-white p-8 rounded-xl shadow-lg w-96 border border-gray-100"
    >
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Admin Login</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium mb-2 text-gray-600">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="mb-8">
        <label className="block text-sm font-medium mb-2 text-gray-600">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
          placeholder="Enter your password"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        Login
      </button>
    </form>
  </div>
  );
}