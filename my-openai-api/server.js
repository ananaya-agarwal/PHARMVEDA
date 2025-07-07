const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const OpenAI = require("openai");

// Load .env file
dotenv.config();

// ✅ Initialize Express
const app = express();
app.use(cors());
app.use(express.json());

// ✅ Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Route for chatbot
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  console.log("📩 Received message:", userMessage);

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are an expert Ayurvedic advisor." },
        { role: "user", content: userMessage },
      ],
    });

    console.log("🤖 AI reply:", response.choices[0].message.content);
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ reply: "⚠️ AI failed to respond." });
  }
});

// ✅ Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API running at http://localhost:${PORT}`);
});
