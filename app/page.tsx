"use client";

import { useState } from "react";

function ShareIcon({ color }: { color: string }) {
  return (
    <svg
      width="16" height="16" viewBox="0 0 24 24"
      fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ stroke: color, transition: "stroke 0.8s ease" }}
    >
      <circle cx="18" cy="5" r="3"/>
      <circle cx="6" cy="12" r="3"/>
      <circle cx="18" cy="19" r="3"/>
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
    </svg>
  );
}

function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="M22 7l-10 7L2 7"/>
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}

function ContactButton({ email, btnBg, btnBorder, textColor }: {
  email: string;
  btnBg: string;
  btnBorder: string;
  textColor: string;
}) {
  const [revealed, setRevealed] = useState(false);

  if (revealed) {
    return (
      <a
        href={"mailto:" + email}
        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold no-underline transition-all duration-300"
        style={{ background: btnBg, border: "1px solid " + btnBorder, color: textColor }}
      >
        <EmailIcon />
        {email}
      </a>
    );
  }

  return (
    <button
      onClick={() => setRevealed(true)}
      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold cursor-pointer transition-all duration-300"
      style={{ background: "transparent", border: "1px solid " + btnBorder, color: textColor }}
    >
      <EmailIcon />
      Contact
    </button>
  );
}

export default function Home() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [submittedTopic, setSubmittedTopic] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasResult, setHasResult] = useState(false);
  const [activeSection, setActiveSection] = useState<"about" | "how" | null>(null);

  const bgColor = hasResult ? "#f5f0e8" : "#2c3a2e";
  const textColor = hasResult ? "#2c2c2a" : "#ffffff";
  const mutedColor = hasResult ? "rgba(44,44,42,0.55)" : "rgba(255,255,255,0.55)";
  const cardBg = hasResult ? "rgba(44,44,42,0.07)" : "rgba(255,255,255,0.08)";
  const cardBorder = hasResult ? "rgba(44,44,42,0.15)" : "rgba(255,255,255,0.12)";
  const inputBg = hasResult ? "rgba(44,44,42,0.06)" : "rgba(255,255,255,0.07)";
  const btnBg = hasResult ? "#2c3a2e" : "#ffffff";
  const btnText = hasResult ? "#ffffff" : "#2c3a2e";
  const dropdownBg = hasResult ? "#ede8df" : "#1e2b20";
  const dropdownBorder = hasResult ? "rgba(44,44,42,0.12)" : "rgba(255,255,255,0.1)";

  const handleExplain = async () => {
    if (!topic.trim()) { setError("Please enter a topic to continue."); return; }
    setLoading(true); setError(""); setExplanation(""); setSubmittedTopic(topic);
    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Something went wrong."); setHasResult(false); }
      else { setExplanation(data.explanation); setHasResult(true); }
    } catch { setError("Network error. Please try again."); setHasResult(false); }
    finally { setLoading(false); }
  };

  const handleTopicChange = (val: string) => {
    setTopic(val);
    if (val.trim() === "") { setHasResult(false); setExplanation(""); setError(""); }
  };

  const toggleSection = (key: "about" | "how") => {
    setActiveSection(activeSection === key ? null : key);
  };

  return (
    <div
      className="min-h-screen transition-colors duration-700"
      style={{ backgroundColor: bgColor, fontFamily: "Geist, sans-serif" }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.closest("[data-section]")) setActiveSection(null);
      }}
    >

      {/* Navbar */}
      <nav
        data-section
        className="flex items-center justify-between px-8 py-5 relative z-10"
      >
        <span
          className="font-bold text-lg tracking-tight transition-colors duration-700"
          style={{ color: textColor }}
        >
          studyai
        </span>

        <div
          className="flex gap-1 rounded-full px-2 py-1.5 transition-all duration-700"
          style={{ background: cardBg, border: "1px solid " + cardBorder }}
        >
          {(["about", "how"] as const).map((key) => (
            <button
              key={key}
              onClick={() => toggleSection(key)}
              className="rounded-full px-4 py-1.5 text-sm cursor-pointer border-none transition-all duration-300"
              style={{
                background: activeSection === key
                  ? (hasResult ? "rgba(44,44,42,0.12)" : "rgba(255,255,255,0.15)")
                  : "transparent",
                color: activeSection === key ? textColor : mutedColor,
                fontWeight: activeSection === key ? 600 : 400,
              }}
            >
              {key === "about" ? "About" : "How it works"}
            </button>
          ))}
        </div>

        {/* Share button */}
        <a
          href="https://your-project.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          title="Share this app"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full no-underline cursor-pointer transition-all duration-700"
          style={{ background: cardBg, border: "1px solid " + cardBorder }}
        >
          <ShareIcon color={textColor} />
        </a>
      </nav>

      {/* Expanding sections wrapper */}
      <div data-section className="mx-8">

        {/* About Section */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: dropdownBg,
            border: "1px solid " + dropdownBorder,
            padding: activeSection === "about" ? "2rem" : "0 2rem",
            maxHeight: activeSection === "about" ? "600px" : "0px",
            opacity: activeSection === "about" ? 1 : 0,
            marginBottom: activeSection === "about" ? "1rem" : "0",
          }}
        >
          <div className="grid grid-cols-2 gap-8">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: mutedColor }}
              >
                Our Vision
              </p>
              <h2
                className="text-2xl font-bold leading-tight tracking-tight mb-4"
                style={{ color: textColor }}
              >
                AI-powered learning, simplified.
              </h2>
              <p className="text-sm leading-relaxed m-0" style={{ color: mutedColor }}>
                Students no longer need to sift through multiple websites to understand a concept.
                This tool uses advanced AI to instantly generate clear, concise, student-friendly
                explanations — making learning faster, smarter, and more accessible. It demonstrates
                the practical integration of AI into modern educational software.
              </p>
            </div>
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: mutedColor }}
              >
                The creator
              </p>
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center text-base font-bold shrink-0 transition-all duration-700"
                  style={{ background: hasResult ? "#c8d8c0" : "#3d5c40", color: textColor }}
                >
                  AL
                </div>
                <div>
                  <p className="m-0 font-bold text-base transition-colors duration-700" style={{ color: textColor }}>
                    Aditya Lenka
                  </p>
                  <p className="m-0 text-xs transition-colors duration-700" style={{ color: mutedColor }}>
                    AI / ML Enthusiast
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed mb-5" style={{ color: mutedColor }}>
                An aficionado who believes in learning things in the most unorthodox way —
                breaking conventions, experimenting boldly, and building tools that make knowledge
                genuinely accessible to everyone.
              </p>
              <div className="flex gap-2 flex-wrap">
                <a
                  href="https://www.linkedin.com/in/lenkaaditya/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold no-underline transition-all duration-700"
                  style={{ background: btnBg, color: btnText }}
                >
                  <LinkedInIcon />
                  LinkedIn
                </a>
                <ContactButton
                  email="adityalenka779@gmail.com"
                  btnBg={cardBg}
                  btnBorder={cardBorder}
                  textColor={textColor}
                />
              </div>
            </div>
          </div>
        </div>

        {/* How it Works Section */}
        <div
          className="rounded-2xl overflow-hidden transition-all duration-500"
          style={{
            background: dropdownBg,
            border: "1px solid " + dropdownBorder,
            padding: activeSection === "how" ? "2rem" : "0 2rem",
            maxHeight: activeSection === "how" ? "600px" : "0px",
            opacity: activeSection === "how" ? 1 : 0,
          }}
        >
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-6"
            style={{ color: mutedColor }}
          >
            Three simple steps
          </p>
          <div className="grid grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Enter a topic",
                desc: "Type any study topic into the input field — from Photosynthesis to Newton's Laws to Binary Search.",
              },
              {
                step: "02",
                title: "Click explain",
                desc: "Hit the Explain topic button or press Enter. The AI immediately processes your request.",
              },
              {
                step: "03",
                title: "Get your explanation",
                desc: "Receive a clear, student-friendly explanation instantly. Example — Photosynthesis: the process by which plants convert sunlight, water, and CO₂ into glucose and oxygen, fuelling their growth.",
              },
            ].map(({ step, title, desc }) => (
              <div
                key={step}
                className="pt-4"
                style={{ borderTop: "1px solid " + cardBorder }}
              >
                <p className="text-xs font-bold tracking-wide mb-2" style={{ color: mutedColor }}>{step}</p>
                <p className="text-base font-bold mb-2" style={{ color: textColor }}>{title}</p>
                <p className="text-sm leading-relaxed m-0" style={{ color: mutedColor }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Hero */}
      <div className="max-w-2xl mx-auto mt-16 px-6 text-center">
        <h1
          className="font-bold leading-tight tracking-tight mb-5 transition-colors duration-700"
          style={{ fontSize: "clamp(2.2rem, 5.5vw, 3.75rem)", color: textColor }}
        >
          {hasResult ? "Here's what you need to know." : "Get your study topics off your mind."}
        </h1>
        <p
          className="text-base leading-relaxed mb-10 transition-colors duration-700"
          style={{ color: mutedColor }}
        >
          {hasResult
            ? "A clear, simple explanation — generated just for you."
            : "Enter any topic and instantly get a clear, simple explanation — no more searching across multiple websites."}
        </p>

        {/* Input card */}
        <div
          className="rounded-2xl p-6 transition-all duration-700"
          style={{ background: cardBg, border: "1px solid " + cardBorder }}
        >
          <input
            type="text"
            placeholder="e.g. Photosynthesis, Newton's Laws, Binary Search..."
            value={topic}
            onChange={(e) => handleTopicChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleExplain()}
            className="w-full rounded-xl px-4 py-3.5 text-base outline-none transition-all duration-700 box-border"
            style={{
              background: inputBg,
              border: "1px solid " + cardBorder,
              color: textColor,
            }}
          />
          <button
            onClick={handleExplain}
            disabled={loading}
            className="mt-3 w-full rounded-xl py-3.5 text-base font-bold border-none transition-all duration-700"
            style={{
              background: loading ? cardBg : btnBg,
              color: loading ? mutedColor : btnText,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Generating explanation..." : "Explain topic →"}
          </button>
        </div>

        {error && (
          <p className="mt-4 text-sm text-red-500">{error}</p>
        )}

        {/* Explanation bubble */}
        {explanation && (
          <div className="mt-6 text-left">
            <div
              className="p-6 transition-all duration-700"
              style={{
                background: cardBg,
                borderRadius: "20px 20px 20px 4px",
                border: "1px solid " + cardBorder,
              }}
            >
              <span
                className="inline-block mb-3 px-3 py-0.5 rounded-full text-xs font-semibold"
                style={{
                  background: hasResult ? "rgba(44,44,42,0.1)" : "rgba(255,255,255,0.15)",
                  color: mutedColor,
                }}
              >
                {submittedTopic}
              </span>
              <p
                className="text-base leading-loose m-0 transition-colors duration-700"
                style={{ color: textColor }}
              >
                {explanation}
              </p>
            </div>
          </div>
        )}

        <p
          className="mt-12 pb-12 text-xs transition-colors duration-700"
          style={{ color: mutedColor }}
        >
          © 2025 studyai · Powered by Groq & LLaMA 3.3 70B
        </p>
      </div>
    </div>
  );
}
