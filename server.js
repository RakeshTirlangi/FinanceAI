// server.js
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Load environment variables
dotenv.config();

const FINANCIAL_NARRATIVE_PROMPT = `
Generate a detailed, human-readable JSON narrative that translates complex financial data into an engaging, accessible story across three key financial statement sections.

Input Financial Data:
{input_text}

Output JSON Structure:
{
    "company_overview": {
        "name": "[COMPANY NAME]",
        "storytelling_approach": "Narrative exploration of financial performance"
    },
    "financial_story_sections": {
        "income_statement_narrative": {
            "title": "[CREATIVE TITLE]",
            "key_insights": ["Insight 1", "Insight 2", "Insight 3"],
            "story": "[NARRATIVE PARAGRAPH(S)]"
        },
        "balance_sheet_narrative": {
            "title": "[CREATIVE TITLE]",
            "key_insights": ["Insight 1", "Insight 2", "Insight 3"],
            "story": "[NARRATIVE PARAGRAPH(S)]"
        },
        "cash_flow_narrative": {
            "title": "[CREATIVE TITLE]",
            "key_insights": ["Insight 1", "Insight 2", "Insight 3"],
            "story": "[NARRATIVE PARAGRAPH(S)]"
        }
    },
    "comprehensive_narrative": {
        "title": "[OVERARCHING STORY TITLE]",
        "story": "[COMPREHENSIVE NARRATIVE PARAGRAPH(S)]"
    },
    "key_performance_indicators": {
        "revenue_growth": "[PERCENTAGE]",
        "net_income_growth": "[PERCENTAGE]",
        "asset_growth": "[PERCENTAGE]"
    }
}

Storytelling Guidelines:
- Use conversational and accessible language
- Focus on human elements and strategic decisions
- Avoid financial jargon
- Translate numbers into a compelling story
`;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

app.post('/generate-narrative', async (req, res) => {
  try {
    const { fileContent } = req.body;

    if (!fileContent || typeof fileContent !== 'string') {
      return res.status(400).json({ 
        error: 'Validation Error',
        message: 'Valid file content is required' 
      });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({ 
        error: 'Server Configuration Error',
        message: 'API key not configured' 
      });
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const prompt = FINANCIAL_NARRATIVE_PROMPT.replace('{input_text}', fileContent);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    // Clean up the response to remove markdown or extra characters
    const cleanedText = rawText
      .replace(/```json/g, '')  // Remove ```json
      .replace(/```/g, '')      // Remove ```
      .trim();                  // Remove leading/trailing whitespace
    console.log("cleaned text",cleanedText);
    // Parse the cleaned text as JSON
    const narrativeJSON = JSON.parse(cleanedText);
    console.log("narrativeJSON",narrativeJSON)
    res.json(narrativeJSON);
  } catch (error) {
    console.error('Narrative Generation Error:', error);
    res.status(500).json({ 
      error: 'Server Error',
      message: error.message
    });
  }
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});