const express = require("express");
const axios = require("axios");
const dotenv = require("dotenv");
const { Configuration, OpenAI } = require("openai");

const app = express();
const PORT = 4000;
const config = require('./config');

dotenv.config()
// OpenAI API configuration
const openai = new OpenAI({
    apiKey: process.env.OpenAIKey,
});

// Middleware to parse JSON
app.use(express.json());

// API endpoint to get a random ChatGPT response
app.get("/chatgpt", async (req, res) => {
    try {
        const prompts = [
            "Tell me a fun fact.",
            "Give me an interesting riddle.",
            "Share a piece of random wisdom.",
            "Tell me a short joke.",
            "Describe a futuristic technology idea."
        ];

        // Select a random prompt
        const randomPrompt = prompts[Math.floor(Math.random() * prompts.length)];

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",  // Change to "gpt-3.5-turbo" if needed
            messages: [{ role: "user", content: randomPrompt }],
            max_tokens: 50,
        });
        console.log("response :",response)
        res.json({
            prompt: randomPrompt,
            response: response.choices[0].message.content
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch response from ChatGPT" });
    }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
