// services/scoreService.js
export async function submitScore(word, attempts) {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:4000/api/leaderboard", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ word, attempts}),
  });
  return res.json();
}

export async function fetchLeaderboard(word) {
  const res = await fetch(`http://localhost:4000/api/leaderboard/${word}`);
  return res.json();
}
