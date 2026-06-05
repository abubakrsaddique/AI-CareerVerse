"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const uploadResume = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    if (file.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      setResult(res.data.data);

      // ✅ ADD THIS LINE HERE
      localStorage.setItem("resume_uploaded", "true");

      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-black via-slate-900 to-indigo-950 text-white px-6 py-10 relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">AI Resume Analyzer</h1>
          <p className="text-gray-400 mt-2">
            Upload your resume and let AI analyze your career profile
          </p>
        </div>

        {/* UPLOAD CARD */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-xl">
          {/* FILE INPUT */}
          <div className="border border-dashed border-white/20 rounded-2xl p-10 text-center hover:border-cyan-500 transition">
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="text-sm text-gray-300"
            />

            <p className="text-gray-400 mt-3 text-sm">
              Only PDF files supported
            </p>

            {file && (
              <p className="text-cyan-400 mt-3 text-sm">
                Selected: {file.name}
              </p>
            )}
          </div>

          {/* ERROR */}
          {error && <p className="text-red-400 mt-4 text-sm">{error}</p>}

          {/* BUTTON */}
          <button
            onClick={uploadResume}
            disabled={loading}
            className="w-full mt-6 py-3 rounded-2xl bg-linear-to-br from-cyan-500 to-indigo-600 font-semibold hover:scale-[1.02] transition disabled:opacity-50"
          >
            {loading ? "Analyzing Resume..." : "Upload & Analyze"}
          </button>
        </div>

        {/* RESULT */}
        {result && (
          <div className="mt-10 space-y-6">
            {/* SCORE */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-gray-400 text-sm">AI Resume Score</h2>

              <div className="text-4xl font-bold text-cyan-400 mt-2">
                {result.score ?? 0}
              </div>

              <div className="h-2 bg-white/10 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full bg-linear-to-br from-cyan-500 to-indigo-500"
                  style={{ width: `${result.score ?? 0}%` }}
                />
              </div>
            </div>

            {/* SKILLS */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-gray-400 text-sm mb-4">Detected Skills</h2>

              <div className="flex flex-wrap gap-3">
                {result.skills?.map((skill: string) => (
                  <span
                    key={skill}
                    className="px-4 py-2 rounded-xl bg-white/10 border border-white/10 text-cyan-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* SUMMARY */}
            <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6">
              <h2 className="text-gray-400 text-sm mb-3">AI Summary</h2>

              <p className="text-gray-300 leading-relaxed">{result.summary}</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
