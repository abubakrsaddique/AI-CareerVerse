"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Initial check
    checkAuth();

    // Listen for auth changes
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    router.replace("/login");
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/5 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <h1 className="text-2xl font-bold bg-linear-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
            AI CareerVerse
          </h1>
        </Link>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-gray-300">
          <Link href="/" className="hover:text-cyan-400">
            Home
          </Link>

          <Link href="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          <Link href="/upload" className="hover:text-cyan-400">
            Upload Resume
          </Link>

          <Link href="/analytics" className="hover:text-cyan-400">
            Analytics
          </Link>
        </div>

        {/* Auth */}
        <div className="flex gap-3">
          {!isLoggedIn ? (
            <>
              <Link href="/login">
                <button className="px-4 py-2 border border-white/20 rounded-xl text-white hover:bg-white/10">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-2 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white">
                  Register
                </button>
              </Link>
            </>
          ) : (
            <button
              onClick={logout}
              className="px-4 py-2 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 hover:bg-red-500/30 transition"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
