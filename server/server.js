const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Root route (Fixes "Cannot GET /" issue)
app.get("/", (req, res) => {
  res.send("Welcome to GaslightGPT Backend!");
});

// Mock API for roasting responses
app.post("/roast", (req, res) => {
  const { userMessage } = req.body;
  const insults = [
    "That's the best you got? Try harder. 😂",
    "Wow, your brain is working overtime just to be wrong. 🤡",
    "Did ChatGPT write that for you? Because it's awful. 🤖",
  ];
  const roast = insults[Math.floor(Math.random() * insults.length)];
  res.json({ response: roast });
});

app.listen(PORT, () => console.log(`🔥 Server running on http://localhost:${PORT}`));
