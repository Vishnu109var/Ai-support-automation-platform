const OpenAI = require("openai");
require("dotenv").config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function analyzeTicket({ subject, message }) {
  // MOCK MODE: free, instant, no API call — lets us test the whole app for $0
  if (process.env.USE_MOCK_AI === "true") {
    return {
      category: pickMockCategory(subject, message),
      urgency: "medium",
      draft_reply: "Thanks for reaching out. We've received your request and a member of our support team will follow up shortly."
    };
  }

  // REAL MODE: actual OpenAI API call — only runs when USE_MOCK_AI is not "true"
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: `You are a customer support triage assistant. Respond ONLY with strict JSON, no markdown:
{"category": "billing|technical|account|feature_request|other", "urgency": "low|medium|high", "draft_reply": "a short, polite draft reply, 2-4 sentences"}`
      },
      { role: "user", content: `Subject: ${subject}\nMessage: ${message}` }
    ],
    temperature: 0.3,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

// A tiny rule-based helper just for mock mode, so it's not always the same category
function pickMockCategory(subject, message) {
  const text = (subject + " " + message).toLowerCase();
  if (text.includes("pay") || text.includes("bill") || text.includes("charge")) return "billing";
  if (text.includes("login") || text.includes("password") || text.includes("access")) return "account";
  if (text.includes("bug") || text.includes("error") || text.includes("crash")) return "technical";
  return "other";
}

module.exports = { analyzeTicket };