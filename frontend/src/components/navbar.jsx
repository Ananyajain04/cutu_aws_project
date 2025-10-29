import { useNavigate } from "react-router-dom";
import { themes } from "../assets/themes";
import { useEffect, useState } from "react";

const Navbar = ({
  theme,
  selectTheme,
  setOpenHome,
  setOpenAlbum,
  setOpenGame,
  setOpenQuiz
}) => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    async function fetchName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await fetch("http://localhost:4000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          console.error("Failed to fetch user data");
          return;
        }

        const data = await res.json();
        setFullName(data.fullName || "Unknown User");
      } catch (err) {
        console.error("Error fetching name:", err);
      }
    }

    fetchName();
  }, []);

  return (
    <nav
      className="navbar w-full flex flex-row items-center justify-between h-[8vh]"
      style={{ backgroundColor: theme.light_bg_colour }}
    >
      <button
        className="m-[20px] text-[24px] font-extrabold"
        style={{ color: theme.darker_bg_colour }}
        onClick={() => logout()}
      >
        Swiftie Society
      </button>

      <div className="nav-links flex flex-row gap-[20px]">
        <button
          className="nav-item text-[20px] font-bold hover:text-[#d63384]"
          style={{ color: theme.darker_bg_colour }}
          onClick={() => {
            setOpenGame(false);
            setOpenAlbum(false);
            setOpenQuiz(false);
            setOpenHome(true);
          }}
        >
          Home
        </button>
        <button
          className="nav-item text-[20px] font-bold hover:text-[#d63384]"
          style={{ color: theme.darker_bg_colour }}
          onClick={() => {
            setOpenHome(false);
            setOpenGame(false);
            setOpenQuiz(false);
            setOpenAlbum(true);
          }}
        >
          Albums
        </button>
        <button
          className="nav-item text-[20px] font-bold hover:text-[#d63384]"
          style={{ color: theme.darker_bg_colour }}
          onClick={() => {
            setOpenHome(false);
            setOpenAlbum(false);
            setOpenQuiz(false);
            setOpenGame(true);
          }}
        >
          Games
        </button>
        <button
          className="nav-item text-[20px] font-bold hover:text-[#d63384]"
          style={{ color: theme.darker_bg_colour }}
          onClick={() => {
            setOpenHome(false);
            setOpenAlbum(false);
            setOpenGame(false);
            setOpenQuiz(true);
          }}
        >
          Quiz
        </button>
      </div>

      <div className="flex flex-row items-center">
        <select
          className="theme-selector px-[16px] py-[8px] border-none rounded-[5px]"
          style={{
            color: theme.light_bg_colour,
            backgroundColor: theme.darker_bg_colour,
          }}
          onChange={(e) => {
            selectTheme(themes[e.target.value]);
          }}
        >
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>

        <p className="mx-4 font-semibold" style={{ color: theme.darker_bg_colour }}>
          {fullName || "Loading..."}
        </p>

        <button
          className="logout-btn px-[16px] py-[8px] m-[20px] border-none rounded-[5px]"
          style={{
            color: theme.light_bg_colour,
            backgroundColor: theme.darker_bg_colour,
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
