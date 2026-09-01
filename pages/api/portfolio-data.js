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

  if (req.method === "POST") {
    const { pin, data } = req.body;

    // Default admin PIN is 2004 (can be configured or changed)
    const validPin = process.env.ADMIN_PIN || "2004";

    if (!pin || pin !== validPin) {
      return res.status(401).json({ error: "Invalid Admin Passcode/PIN." });
    }

    if (!data) {
      return res.status(400).json({ error: "No data payload provided." });
    }

    try {
      fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), "utf8");
      return res.status(200).json({ success: true, message: "Portfolio data successfully saved!" });
    } catch (error) {
      console.error("Failed to write portfolio data:", error);
      return res.status(500).json({ error: "Failed to persist data to server disk." });
    }
  }

  return res.status(455).json({ error: `Method ${req.method} not allowed` });
}
