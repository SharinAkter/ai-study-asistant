import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config({ path: "./.env" });

// 👉 DEBUG (এটা এখানে top এ থাকবে)
console.log("KEY CHECK:", process.env.OPENAI_API_KEY);

const app = express();

app.use(cors());
app.use(express.json());

// 👉 OpenAI client (এটার আগে env check হচ্ছে)
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: message,
    });

    res.json({ reply: response.output_text });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});