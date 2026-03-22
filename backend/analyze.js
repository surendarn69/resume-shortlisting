const { spawn } = require("child_process");
const path = require("path");

function analyzeWithPython(data) {
  return new Promise((resolve, reject) => {
    const pythonPath = path.join(__dirname, "../venv/Scripts/python.exe");
    const scriptPath = path.join(__dirname, "python/resume_analyzer.py");

    const py = spawn(pythonPath, [scriptPath]);

    let output = "";
    let error = "";

    py.stdout.on("data", (data) => {
      output += data.toString();
    });

    py.stderr.on("data", (data) => {
      error += data.toString();
    });

    py.on("close", (code) => {
      if (code !== 0 || error) {
        reject(error);
      } else {
        resolve(JSON.parse(output));
      }
    });

    // ✅ Send JSON via stdin
    py.stdin.write(JSON.stringify(data));
    py.stdin.end();
  });
}

module.exports = analyzeWithPython;
