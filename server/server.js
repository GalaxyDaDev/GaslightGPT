const express = require("express");
const axios = require("axios");
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: "http://localhost:3000" } });

app.use(cors());
app.use(express.json());

// Fake AI Roast API (Replace with actual API if needed)
const AI_API_URL = "https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium";
const API_KEY = "your-huggingface-api-key";  // Replace with a real key if needed

async function getRoastResponse(userInput) {
    try {
        const response = await axios.post(
            AI_API_URL,
            { inputs: userInput },
            { headers: { Authorization: `Bearer ${API_KEY}` } }
        );
        return response.data[0]?.generated_text || "Wow, that was a terrible message.";
    } catch (error) {
        return "Sorry, I'm too disappointed to reply.";
    }
}

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("chatMessage", async (message) => {
        const response = await getRoastResponse(message);
        socket.emit("botReply", response);
    });

    socket.on("disconnect", () => console.log("User disconnected"));
});

server.listen(3001, () => console.log("Backend running on port 3001"));
