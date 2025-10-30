// src/components/AlbumChat.jsx
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
const API = import.meta.env.API_URL;

const socket = io(`${API}`);

export default function AlbumChat({ album, onClose, theme }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [fullName,setFullName]=useState("");
  const listRef = useRef(null);
  const endRef = useRef(null);

  // scroll to bottom when messages change
  const scrollToBottom = (behavior = "smooth") => {
    try {
      endRef.current?.scrollIntoView({ behavior });
    } catch (e) {
      /* ignore */
    }
  };
  useEffect(() => scrollToBottom("auto"), []); // on mount
  useEffect(() => scrollToBottom(), [messages]);

  // fetch current user full name
  useEffect(() => {
    async function fetchName() {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
  
        const res = await fetch(`${API}/api/user/me`, {
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

  // fetch history
  useEffect(() => {
    async function fetchMessages() {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetch(`${API}/api/messages/${album}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) return;
        const data = await res.json();
        setMessages(data || []);
      } catch (err) {
        console.error("fetch messages error", err);
      }
    }
    fetchMessages();
  }, [album]);

  // socket join + receive
  useEffect(() => {
    socket.emit("joinAlbum", album);
    const handler = (msg) => {
      if (msg?.album === album) setMessages((p) => [...p, msg]);
    };
    socket.on("newMessage", handler);
    return () => {
      socket.off("newMessage", handler);
      socket.emit("leaveAlbum", album);
    };
  }, [album]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const token = localStorage.getItem("token");
    if (!token) return;
    try {
      const res = await fetch(`${API}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ album, text: input }),
      });
      const data = await res.json();
      socket.emit("sendMessage", data);
      setInput("");
    } catch (err) {
      console.error("send message error", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Styles fallbacks if theme key names differ slightly:
  const darker = theme?.darker_bg_colour ?? theme?.darkerBgColour ?? "#1F2E43";
  const light = theme?.light_bg_colour ?? theme?.lightBgColour ?? "#EDEDED";
  const textCol = theme?.text_colour ?? theme?.textColour ?? "#1F2E43";
  const accent = theme?.accent ?? "#A9CCE3";

  // small helper: always use white for text on dark bubbles
  const lightTextForDark = "#ffffff";

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ backgroundColor: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className="flex flex-col w-full max-w-3xl rounded-2xl shadow-2xl p-4"
        style={{
          background: `linear-gradient(180deg, ${light} 0%, ${accent}10 100%)`,
          minHeight: "70vh",
          maxHeight: "85vh",
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold" style={{ color: textCol }}>
            {album} Chat
          </h3>
          <button
            onClick={onClose}
            className="text-sm px-3 py-1 rounded"
            style={{ color: textCol, border: `1px solid ${accent}55` }}
          >
            Close
          </button>
        </div>

        {/* messages area */}
        <div
          ref={listRef}
          className="flex-1 overflow-auto p-4 space-y-3 rounded-lg"
          style={{
            backgroundColor: `${accent}11`,
            minHeight: "40vh",
            maxHeight: "60vh",
          }}
        >
          {messages.length === 0 && (
            <div className="text-center text-sm opacity-70" style={{ color: textCol }}>
              No messages yet — say hi 👋
            </div>
          )}

          {messages.map((msg) => {
            const mine = Boolean(msg.sender?.fullName === fullName);

            // choose bubble bg and text color
            const bubbleBg = mine ? darker : light;
            const bubbleText = mine ? lightTextForDark : textCol;

            return (
              <div
                key={msg._id ?? Math.random()}
                className={`flex ${mine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl shadow-md`}
                  style={{
                    maxWidth: "70%",
                    width: "auto",
                    wordBreak: "break-word",
                    whiteSpace: "normal",
                    backgroundColor: bubbleBg,
                    color: bubbleText,
                    borderRadius: mine ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    boxShadow: "0 6px 14px rgba(0,0,0,0.06)",
                  }}
                >
                  {!mine && (
                    <div
                      className="text-xs font-semibold mb-1"
                      style={{ opacity: 0.9, color: bubbleText }}
                    >
                      {msg.sender?.fullName ?? msg.sender?.fullname ?? "Anonymous"}
                    </div>
                  )}
                  <div className="text-sm leading-[1.45]">{msg.text}</div>
                </div>
              </div>
            );
          })}

          <div ref={endRef} />
        </div>

        {/* input area */}
        <div className="mt-4 flex items-center gap-3">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="flex-1 rounded-full px-4 py-3 focus:outline-none shadow-inner"
            style={{
              backgroundColor: "#fff",
              border: `1px solid ${accent}55`,
              color: textCol,
            }}
          />
          <button
            onClick={sendMessage}
            className="w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:scale-105 transition"
            style={{ backgroundColor: darker }}
            aria-label="send"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 transform rotate-45"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              style={{ color: "#fff" }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
