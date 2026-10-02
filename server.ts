import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type, ThinkingLevel } from '@google/genai';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(express.json({ limit: '20mb' }));

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// API Routes
app.post('/api/analyze-sentiment', async (req, res) => {
  try {
    const { reviewsText, useHighThinking } = req.body;
    if (!reviewsText || typeof reviewsText !== 'string') {
      return res.status(400).json({ error: 'reviewsText is required' });
    }

    const modelName = useHighThinking ? 'gemini-3.1-pro-preview' : 'gemini-3.8-flash';
    const thinkingConfig = useHighThinking ? { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } } : undefined;

    const prompt = `You are an expert customer sentiment analytics engine. Analyze the following raw customer reviews and produce a rigorous, structured JSON report.

Raw Reviews Batch:
"""
${reviewsText.slice(0, 40000)}
"""

You must return a valid JSON object matching this exact schema:
{
  "overallScore": number (0 to 100 representing overall customer satisfaction score),
  "npsEstimate": number (-100 to 100 estimated Net Promoter Score),
  "sentimentCounts": {
    "positive": number,
    "neutral": number,
    "negative": number
  },
  "trendData": [
    {
      "date": string (e.g. "Week 1", "Week 2", "Week 3", "Week 4" or dates),
      "positive": number,
      "neutral": number,
      "negative": number,
      "avgScore": number
    }
  ],
  "wordCloud": [
    {
      "text": string (keyword or phrase),
      "value": number (frequency count),
      "sentiment": "positive" | "negative" | "neutral",
      "category": string
    }
  ],
  "executiveSummary": {
    "overview": string (Concise paragraph summarizing the overall customer sentiment climate and key themes.),
    "actionableAreas": [
      {
        "rank": number,
        "title": string,
        "impact": "High" | "Medium" | "Low",
        "description": string,
        "sampleQuotes": [string, string]
      }
    ]
  },
  "processedReviews": [
    {
      "id": string,
      "date": string,
      "author": string,
      "text": string,
      "sentiment": "positive" | "neutral" | "negative",
      "confidence": number (0 to 1),
      "category": string,
      "summary": string
    }
  ]
}

Ensure the output is strictly valid JSON without markdown wrapping or comments.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        ...thinkingConfig,
        systemInstruction: 'You are an advanced customer intelligence and sentiment analysis system that outputs strictly valid JSON.'
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('No response generated from Gemini');
    }

    let cleaned = text.trim();
    if (cleaned.startsWith('```json')) {
      cleaned = cleaned.replace(/^```json/, '').replace(/```$/, '').trim();
    } else if (cleaned.startsWith('```')) {
      cleaned = cleaned.replace(/^```/, '').replace(/```$/, '').trim();
    }

    const data = JSON.parse(cleaned);
    res.json(data);
  } catch (err: any) {
    console.error('Sentiment analysis error:', err);
    res.status(500).json({ error: err.message || 'Failed to analyze sentiment' });
  }
});

// Chat endpoint for Sentiment InsightBot
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextData } = req.body;
    
    const formattedHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));

    const lastMessage = messages[messages.length - 1]?.text || '';

    const systemInstruction = `You are InsightBot, an expert Customer Sentiment Analyst AI assistant. You help product managers, customer success leads, and executives interpret sentiment data, investigate root causes, and brainstorm mitigation strategies. You have access to the current dashboard context summary: ${contextData ? JSON.stringify(contextData).slice(0, 2000) : 'No active dataset loaded yet.'}. Be professional, insightful, and actionable.`;

    const chat = ai.chats.create({
      model: 'gemini-3.8-flash',
      config: {
        systemInstruction,
      },
      history: formattedHistory
    });

    const result = await chat.sendMessage({
      message: lastMessage
    });

    res.json({ reply: result.text });
  } catch (err: any) {
    console.error('Chat error:', err);
    res.status(500).json({ error: err.message || 'Failed to generate chat response' });
  }
});

// Deep Reasoning endpoint
app.post('/api/deep-reasoning', async (req, res) => {
  try {
    const { summaryData, query } = req.body;
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: `Perform a rigorous root-cause analysis based on this sentiment summary data: ${JSON.stringify(summaryData)}. User specific query: ${query || 'Provide deep strategic recommendations for executive leadership.'}`,
      config: {
        thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH },
        systemInstruction: 'You are a Chief Customer Officer and expert management consultant performing deep causal analysis.'
      }
    });

    res.json({ analysis: response.text });
  } catch (err: any) {
    console.error('Deep reasoning error:', err);
    res.status(500).json({ error: err.message || 'Deep reasoning failed' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

startServer();
