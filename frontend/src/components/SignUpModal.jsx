import { useState } from "react";
import { signup } from "../services/authService"; // your API call file

export default function SignUpModal({ onClose, onSuccess }) {
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await signup(fullName, dob, email, password);
      if (data.token) {
        localStorage.setItem("token", data.token); // ✅ save token
        onSuccess?.(data.user); // optional callback to notify parent
        onClose();
      } else {
        setError(data.error || "Signup failed");
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
        <h2 className="text-xl font-bold mb-4 text-center text-white">Sign Up</h2>
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#E0EDFD] text-[#1F2E43] placeholder-[#1F2E43] focus:outline-none focus:ring-2 focus:ring-[#E0EDFD]"
          />
          <input
            type="date"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            className="px-3 py-2 rounded-md bg-[#E0EDFD] text-[#1F2E43] focus:outline-none focus:ring-2 focus:ring-[#E0EDFD]"
          />
          <input
            type="text"
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
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-white text-[#1F2E43] font-semibold py-2 rounded-md hover:bg-gray-100"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
