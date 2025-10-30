// services/scoreService.js
const API = import.meta.env.API_URL;
export async function submitScore(word, attempts) {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API}/api/leaderboard`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ word, attempts}),
  });
  return res.json();
}

export async function fetchLeaderboard(word) {
  const res = await fetch(`${API}/api/leaderboard/${word}`);
  return res.json();
}
