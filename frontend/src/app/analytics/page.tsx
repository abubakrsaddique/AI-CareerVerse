"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type AnalyticsData = {
  resumesUploaded?: number;
  averageScore?: number;
  interviewsPracticed?: number;
};

export default function Analytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get("http://localhost:5000/api/analytics", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setData(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load analytics");

        // fallback demo data
        setData({
          resumesUploaded: 3,
          averageScore: 82,
          interviewsPracticed: 5,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-300">Loading Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white px-6 py-10 relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">User Analytics</h1>

          <p className="text-gray-400 mt-2">
            Track your AI career progress in real time
          </p>

          {error && <p className="text-red-400 mt-3">{error}</p>}
        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* RESUMES */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition">
            <h2 className="text-gray-400 text-sm">Resumes Uploaded</h2>

            <p className="text-4xl font-bold mt-3 text-cyan-400">
              {data?.resumesUploaded ?? 0}
            </p>
          </div>

          {/* SCORE */}
          <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl hover:scale-[1.02] transition">
            <h2 className="text-gray-400 text-sm">Average AI Score</h2>

            <p className="text-4xl font-bold mt-3 text-indigo-400">
              {data?.averageScore ?? 0}
            </p>

            <div className="h-2 bg-white/10 rounded-full mt-4 overflow-hidden">
              <div
                className="h-full bg-linear-to-br from-indigo-500 to-cyan-500"
                style={{
                  width: `${data?.averageScore ?? 0}%`,
                }}
              />
            </div>
          </div>

          {/* INTERVIEWS */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-xl opacity-60 overflow-hidden">
            {/* Coming Soon Badge */}
            <span className="absolute top-4 right-4 px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Coming Soon
            </span>

            <h2 className="text-gray-400 text-sm">Interviews Practiced</h2>

            <p className="text-4xl font-bold mt-3 text-purple-400 blur-[1px]">
              --
            </p>

            {/* Soft overlay effect */}
            <div className="absolute inset-0 bg-lnear-to-br from-purple-500/5 to-transparent pointer-events-none" />
          </div>
        </div>

        {/* FOOTER INSIGHT */}
        <div className="mt-10 backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
          <h2 className="text-gray-400 text-sm mb-2">AI Insight</h2>

          <p className="text-gray-300">
            Keep improving your resume score and practicing interviews to boost
            your career readiness.
          </p>
        </div>
      </div>
    </main>
  );
}
