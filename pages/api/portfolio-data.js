import fs from "fs";
import path from "path";
import { portfolioData as defaultData } from "../../data/portfolioData";

const dataFilePath = path.join(process.cwd(), "data", "portfolioData.json");

function getStoredData() {
  try {
    if (fs.existsSync(dataFilePath)) {
      const fileContents = fs.readFileSync(dataFilePath, "utf8");
      return JSON.parse(fileContents);
    }
  } catch (error) {
    console.error("Error reading portfolioData.json:", error);
  }
  return defaultData;
}

export default function handler(req, res) {
  if (req.method === "GET") {
    const data = getStoredData();
    return res.status(200).json(data);
  }

  // All modifications are handled directly through Supabase Auth & PostgreSQL
  res.setHeader("Allow", ["GET"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
