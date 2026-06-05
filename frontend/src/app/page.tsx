"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/upload");
    } else {
      router.push("/login");
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-r from-indigo-950 via-slate-900 to-black text-white overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-20 left-20 h-72 w-72 bg-purple-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 h-72 w-72 bg-cyan-500/20 rounded-full blur-3xl" />

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="text-center">
          <span className="px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-sm">
            AI Powered Career Growth Platform
          </span>

          <h1 className="mt-8 text-6xl font-extrabold leading-tight">
            Build Your
            <span className="block bg-linear-to-r from-cyan-400 to-indigo-500 bg-clip-text text-transparent">
              Dream Career With AI
            </span>
          </h1>

          <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-400">
            Upload your resume, discover skill gaps, generate personalized
            career roadmaps, and prepare for interview using AI insights.
          </p>

          {/* CTA BUTTONS */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              onClick={handleGetStarted}
              className="px-8 py-4 rounded-2xl bg-linear-to-r from-cyan-500 to-indigo-600 font-semibold shadow-lg shadow-cyan-500/20 hover:scale-105 transition"
            >
              Get Started
            </button>

            <Link href="/dashboard">
              <button className="px-8 py-4 rounded-2xl border border-white/20 bg-white/5 hover:bg-white/10 transition">
                Dashboard
              </button>
            </Link>
          </div>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-3">Resume Analysis</h3>
            <p className="text-gray-400">
              AI scans your resume and identifies strengths, weaknesses, and
              missing skills.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-3">Career Roadmaps</h3>
            <p className="text-gray-400">
              Generate personalized learning paths tailored to your target role.
            </p>
          </div>

          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8">
            <h3 className="text-xl font-bold mb-3">Interview Prep</h3>
            <p className="text-gray-400">
              Practice AI-generated interview questions and receive feedback
              instantly.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
