"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authApi } from "@/lib/api";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async () => {
    // =========================
    // FRONTEND VALIDATIONS
    // =========================
    if (!name || !email || !password) {
      setError("Please fill all fields");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      await authApi.post("/api/auth/register", {
        name,
        email,
        password,
      });

      setSuccess("Account created successfully. Redirecting...");

      setTimeout(() => {
        router.replace("/login");
      }, 1500);
    } catch (err: any) {
      // =========================
      // BACKEND ERROR HANDLING
      // (example: email already exists)
      // =========================
      setError(
        err?.response?.data?.message ||
          "Email already exists or registration failed",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-r from-black via-slate-900 to-indigo-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md relative">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 mt-2">Join AI CareerVerse</p>
          </div>

          {/* Name */}
          <div className="mb-4">
            <label className="text-sm text-gray-300 block mb-2">
              Full Name
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-sm text-gray-300 block mb-2">Email</label>

            <div className="relative">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="text-sm text-gray-300 block mb-2">Password</label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-12 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && <p className="text-red-400 text-sm mt-3">{error}</p>}

          {/* Success */}
          {success && <p className="text-green-400 text-sm mt-3">{success}</p>}

          {/* Button */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-xl bg-linear-to-r from-cyan-500 to-indigo-600 text-white font-semibold hover:scale-[1.02] transition-all disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {/* Footer */}
          <div className="text-center mt-6 text-gray-400 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/login")}
              className="text-cyan-400 hover:text-cyan-300"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
