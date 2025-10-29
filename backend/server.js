require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');

const authMiddleware = require("./src/middleware/auth.js");
const authRoutes = require('./src/routes/auth.js');
const userRoutes = require('./src/routes/user.js');
const messageRoutes = require('./src/routes/message.js');
const scoreRoutes = require("./src/routes/score");

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/messages', messageRoutes);
app.use("/api/leaderboard", scoreRoutes);

// Server setup
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "http://localhost:5173" } });

// Socket.IO logic
io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  socket.on("joinAlbum", (album) => {
    socket.join(album);
    console.log(`User joined album room: ${album}`);
  });

  socket.on("sendMessage", (data) => {
    io.to(data.album).emit("newMessage", data); // broadcast to album room
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB connected");
  server.listen(process.env.PORT || 4000, () => {
    console.log("Server running");
  });
}).catch(err => console.error(err));
