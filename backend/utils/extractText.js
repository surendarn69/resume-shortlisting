const fs = require("fs");
const pdfParse = require("pdf-parse");
const Tesseract = require("tesseract.js");
const poppler = require("pdf-poppler");
const path = require("path");

async function extractText(filePath) {

  // ✅ Try normal PDF extraction first
  const buffer = fs.readFileSync(filePath);
  const parsed = await pdfParse(buffer);

  if (parsed.text && parsed.text.trim().length > 50) {
    return parsed.text;
  }

  // ✅ OCR fallback
  const outputDir = path.join(__dirname, "images");

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  await poppler.convert(filePath, {
    format: "png",
    out_dir: outputDir,
    out_prefix: "page"
  });

  let ocrText = "";

  const images = fs.readdirSync(outputDir);

  for (const img of images) {
    const result = await Tesseract.recognize(
      path.join(outputDir, img),
      "eng"
    );

    ocrText += result.data.text + " ";
  }

  return ocrText;
}

module.exports = extractText;
