import { useEffect, useState } from "react";

export default function Leaderboard({ word, onClose, theme }) {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/leaderboard/${word}`)
      .then((res) => res.json())
      .then(setScores);
  }, [word]);

  const darker = theme?.darker_bg_colour ?? "#1F2E43";
  const light = theme?.light_bg_colour ?? "#F7F7F7";
  const textCol = theme?.text_colour ?? "#1F2E43";
  const accent = theme?.accent ?? "#A9CCE3";

  return (
    <div
      className="fixed inset-0 z-50 flex justify-center items-center"
      style={{
        backgroundColor: "rgba(0,0,0,0.45)", // ✅ translucent overlay
        backdropFilter: "blur(3px)",
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="rounded-2xl shadow-2xl p-6 w-[90%] max-w-md"
        style={{
          backgroundColor: light, // ✅ solid card background
          color: textCol,
          border: `1px solid ${accent}55`,
        }}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">{word} — Leaderboard</h2>

        {scores.length === 0 ? (
          <p className="text-center opacity-70 text-sm">No scores yet — be the first!</p>
        ) : (
          <ul className="space-y-2">
            {scores.map((s, i) => (
              <li
                key={i}
                className="flex justify-between items-center px-4 py-2 rounded-lg shadow-sm"
                style={{
                  backgroundColor: i === 0 ? darker : `${accent}15`,
                  color: i === 0 ? "#fff" : textCol,
                  border: `1px solid ${accent}35`,
                }}
              >
                <span className="font-medium">{i + 1}. {s.user?.fullName ?? "Unknown"}</span>
                <span className="text-sm">{s.attempts} attempts</span>
              </li>
            ))}
          </ul>
        )}

        <button
          className="mt-6 w-full py-2 rounded-lg font-semibold transition hover:opacity-90"
          onClick={onClose}
          style={{
            backgroundColor: darker,
            color: "#fff",
            boxShadow: "0 6px 14px rgba(0,0,0,0.15)",
          }}
        >
          Close
        </button>
      </div>
    </div>
  );
}
