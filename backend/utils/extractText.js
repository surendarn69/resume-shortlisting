const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const poppler = require("pdf-poppler");
const path = require("path");

async function extractText(filePath) {

  // ✅ Try normal PDF extraction first
  try {
    const buffer = fs.readFileSync(filePath);
    const parsed = await pdfParse(buffer);

    if (parsed.text && parsed.text.trim().length > 50) {
      return parsed.text;
    }
  } catch (err) {
    console.log("PDF PARSE ERROR:", err.message);
  }

  // ✅ OCR fallback
  const outputDir = path.join(__dirname, "images");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  try {
    await poppler.convert(filePath, {
      format: "png",
      out_dir: outputDir,
      out_prefix: "page"
    });
  } catch (err) {
    console.log("POPPLER ERROR:", err.message);
    return "";
  }

  let ocrText = "";

  let images = [];
  try {
    images = fs.readdirSync(outputDir);
  } catch (err) {
    console.log("READ DIR ERROR:", err.message);
    return "";
  }

  for (const img of images) {
    const imgPath = path.join(outputDir, img);

    try {
      const result = await Tesseract.recognize(imgPath, "eng");
      ocrText += result.data.text + " ";
    } catch (err) {
      console.log("OCR ERROR:", err.message);
    }
  }

  return ocrText;
}

module.exports = extractText;