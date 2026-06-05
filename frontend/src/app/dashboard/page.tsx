"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import gsap from "gsap";
import axios from "axios";

type DashboardData = {
  name?: string;
  score?: number;
  skills?: string[];
  summary?: string;
};

const LOAD_MESSAGES = [
  "Analyzing your resume...",
  "Extracting skills...",
  "Scoring your profile...",
];

export default function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [msgIndex, setMsgIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const msgTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // ✅ Fetch effect — all hooks before any return
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    setLoading(true);
    setData(null);
    setError("");
    setProgress(0);
    setMsgIndex(0);

    let p = 0;
    progressTimer.current = setInterval(() => {
      p = Math.min(p + Math.random() * 8, 92);
      setProgress(p);
    }, 200);

    let i = 0;
    msgTimer.current = setInterval(() => {
      i = (i + 1) % LOAD_MESSAGES.length;
      setMsgIndex(i);
    }, 1400);

    const minDelay = new Promise((res) => setTimeout(res, 800));

    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/resume/latest", {
          headers: { Authorization: `Bearer ${token}` },
          params: { t: Date.now() },
        });
        await minDelay;
        setData(res.status === 404 || !res.data ? null : res.data);
      } catch {
        await minDelay;
        setError("Failed to load dashboard data");
      } finally {
        clearInterval(progressTimer.current!);
        clearInterval(msgTimer.current!);
        setProgress(100);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      clearInterval(progressTimer.current!);
      clearInterval(msgTimer.current!);
    };
  }, [searchParams]);

  // ✅ GSAP animation effect — always runs, guarded by !loading && data
  useEffect(() => {
    if (!loading && data && cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".card");

      // Set initial state before animating
      gsap.set(cards, { y: 40, opacity: 0 });

      gsap.to(cards, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.1,
      });
    }
  }, [loading, data]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white gap-5">
        <div className="w-12 h-12 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin" />

        <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-cyan-500 rounded-full transition-all duration-200 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p
          key={msgIndex}
          className="text-sm text-gray-400 tracking-wide animate-pulse"
        >
          {LOAD_MESSAGES[msgIndex]}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">📄</div>
          <h2 className="text-2xl font-bold">No Resume Uploaded Yet</h2>
          <p className="text-gray-400 mt-2">
            Upload your resume to get AI insights
          </p>
          {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          <button
            onClick={() => router.push("/upload")}
            className="mt-6 px-6 py-3 bg-linear-to-r from-cyan-500 to-indigo-600 rounded-xl font-semibold hover:scale-105 transition"
          >
            Upload Resume
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white px-6 py-10 relative overflow-hidden">
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">AI Career Dashboard</h1>
          <p className="text-gray-400 mt-2">Your AI-powered resume insights</p>
        </div>

        {/* ✅ ref attached here so GSAP can find .card children */}
        <div ref={cardsRef} className="grid md:grid-cols-2 gap-6">
          <div className="card backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-gray-400 text-sm">Candidate Name</h2>
            <p className="text-2xl font-bold mt-2">
              {data.name || "Not Available"}
            </p>
          </div>

          <div className="card backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-gray-400 text-sm">AI Resume Score</h2>
            <div className="text-4xl font-bold text-cyan-400 mt-2">
              {data.score ?? 0}
            </div>
          </div>

          <div className="card md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-gray-400 text-sm mb-4">Skills</h2>
            {data.skills?.length ? (
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/10 text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No skills detected</p>
            )}
          </div>

          <div className="card md:col-span-2 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
            <h2 className="text-gray-400 text-sm mb-3">Summary</h2>
            <p className="text-gray-300">{data.summary}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
