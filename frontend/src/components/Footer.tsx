export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-linear-to-r from-black via-slate-900 to-indigo-950 text-white">
      {/* subtle glow */}
      <div className="absolute inset-0 bg-linear-to-r from-cyan-500/5 to-indigo-500/5 pointer-events-none" />

      <div className="relative py-8 text-center text-sm text-gray-400">
        © 2026 AI CareerVerse. All rights reserved.
      </div>
    </footer>
  );
}
