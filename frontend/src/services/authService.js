// authService.js
const API = import.meta.env.API_URL;
const API_URL = `${API}/api/auth`;

export async function signup(fullName, dob, email, password) {
  const res = await fetch(`{API}/api/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ fullName, dob, email, password }),
  });
  return res.json();
}


export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json(); // returns { token, user } or { error }
}

export function saveToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}
