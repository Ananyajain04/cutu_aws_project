import { useState } from "react";
import { login, saveToken } from "../services/authService"; // 👈 import your login API

export default function LoginModal({ onClose, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      if (data.token) {
        saveToken(data.token);
        onSuccess?.(data.user); // optional callback if you want parent to know user info
        onClose();
      } else {
        setError(data.error || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div
      className="absolute inset-0 bg-opacity-10 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#1F2E43] text-white p-8 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold mb-4 text-center text-white">Login</h2>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#E0EDFD] text-[#1F2E43] placeholder-[#1F2E43] focus:outline-none focus:ring-2 focus:ring-[#E0EDFD]"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#E0EDFD] text-[#1F2E43] placeholder-[#1F2E43] focus:outline-none focus:ring-2 focus:ring-[#E0EDFD]"
          />

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <button
            type="submit"
            className="bg-white text-[#1F2E43] font-semibold py-2 rounded-md hover:bg-gray-100"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
