import React, { useEffect, useState } from "react";
import axios from "axios";

function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [songs, setSongs] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [audio, setAudio] = useState(null);

  // Taylor Swift albums
  const albums = [
    "Taylor Swift",
    "Fearless Taylor Swift ",
    "Speak Now",
    "Red",
    "1989",
    "Reputation",
    "Lover",
    "Folklore",
    "Evermore Taylor Swift",
    "Midnights",
    "The Tortured Poets Department",
  ];

  // 🔍 Fetch songs from your backend
  const fetchSongs = async (albumName) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/spotify/album-tracks?album=${encodeURIComponent(
          albumName
        )}`
      );

      const mappedSongs = response.data.map((track) => ({
        name: track.name,
        artist: track.artists.map((a) => a.name).join(", "),
        image: track.album?.images?.[0]?.url || "", // fallback if no image
        preview_url: track.preview_url || null,
      }));

      setSongs(mappedSongs);
    } catch (error) {
      console.error("Error fetching songs:", error);
    }
  };

  // 🚀 Fetch songs when album is selected
  const handleAlbumChange = (albumName) => {
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsPlaying(false);

    setSelectedAlbum(albumName);
    if (albumName) {
      fetchSongs(albumName);
      setCurrentTrack(0); // Reset to first track
    }
  };

  // 🚀 Fetch songs on mount with default album
  useEffect(() => {
    handleAlbumChange("Taylor Swift"); // Default to first album
  }, []);

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [audio]);

  const togglePlay = () => {
    if (!songs[currentTrack]?.preview_url) {
      alert("No preview available for this track");
      return;
    }

    if (isPlaying) {
      // Stop current audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
        setAudio(null);
      }
      setIsPlaying(false);
    } else {
      // Play new audio
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const newAudio = new Audio(songs[currentTrack].preview_url);
      newAudio.addEventListener("ended", () => {
        setIsPlaying(false);
        setAudio(null);
      });

      newAudio.play().catch((error) => {
        console.error("Error playing audio:", error);
        alert("Error playing preview");
      });

      setAudio(newAudio);
      setIsPlaying(true);
    }
  };

  const nextTrack = () => {
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev + 1) % songs.length);
  };

  const prevTrack = () => {
    // Stop current audio if playing
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      setAudio(null);
    }
    setIsPlaying(false);
    setCurrentTrack((prev) => (prev - 1 + songs.length) % songs.length);
  };

  if (songs.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-gray-900 text-white">
        Loading songs...
      </div>
    );
  }

  return (
    <div className="h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          {/* MP3 Player Design */}
          <div className="bg-black rounded-2xl p-6 shadow-xl w-96 h-96 flex flex-col items-center">
            {/* Screen */}
            <div
              className="rounded-lg p-4 w-full h-64 mb-6 text-white text-center relative overflow-hidden"
              style={{
                backgroundImage: `url(${songs[currentTrack].image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-50"></div>

              <div className="relative z-10 h-full flex flex-col justify-between">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs">◀</span>
                  <span className="text-xs">▶</span>
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <div className="text-3xl mb-2">♪</div>
                  <div className="text-lg font-bold mb-1">
                    {songs[currentTrack].name}
                  </div>
                  <div className="text-sm opacity-90">
                    {songs[currentTrack].artist}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="w-full bg-white bg-opacity-30 rounded-full h-2 mb-2">
                    <div className="bg-white h-2 rounded-full w-1/3"></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span>1:23</span>
                    <span>3:45</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Control Wheel */}
            <div className="relative w-30 h-40 mb-6">
              <div className="absolute inset-0 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center">
                <button
                  onClick={togglePlay}
                  className="w-12 h-12 bg-black rounded-full flex items-center justify-center text-white hover:bg-gray-800 transition-colors"
                >
                  {isPlaying ? (
                    <span className="text-lg">⏸</span>
                  ) : (
                    <span className="text-lg ml-1">▶</span>
                  )}
                </button>
              </div>

              <button
                onClick={prevTrack}
                className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300"
              >
                ◀◀
              </button>
              <button
                onClick={nextTrack}
                className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300"
              >
                ▶▶
              </button>
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300">
                VOL
              </button>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs hover:bg-gray-300">
                M
              </button>
            </div>
          </div>

          {/* Playlist */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Music Player
              </h1>

              {/* Album Selection Dropdown */}
              <div className="mb-6">
                <label
                  htmlFor="album-select"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Album:
                </label>
                <select
                  id="album-select"
                  value={selectedAlbum}
                  onChange={(e) => handleAlbumChange(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                >
                  <option value="">Choose an album...</option>
                  {albums.map((album, index) => (
                    <option key={index} value={album}>
                      {album}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Playlist
              </h3>
              <div className="space-y-2">
                {songs.map((song, index) => (
                  <div
                    key={index}
                    onClick={() => setCurrentTrack(index)}
                    className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                      index === currentTrack
                        ? "bg-blue-100 border-l-4 border-blue-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
                  >
                    <img
                      src={song.image}
                      alt={song.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div className="flex-1 text-left">
                      <p
                        className={`font-medium ${
                          index === currentTrack
                            ? "text-blue-600"
                            : "text-gray-800"
                        }`}
                      >
                        {song.name}
                      </p>
                      <p className="text-sm text-gray-600">{song.artist}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MusicPlayer;
