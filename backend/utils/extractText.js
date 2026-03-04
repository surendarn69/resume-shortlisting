const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const path = require("path");

async function extractText(filePath) {

  try {
    // ✅ Normal PDF text extraction
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(buffer);

    if (parsed.text && parsed.text.trim().length > 50) {
      return parsed.text;
    }

    // ⚠️ If PDF has very little text
    // return whatever is extracted
    return parsed.text || "";

  } catch (error) {
    console.error("PDF extraction error:", error);
    return "";
  }

}

module.exports = extractText;