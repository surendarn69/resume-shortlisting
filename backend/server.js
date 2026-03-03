// server.js
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");

const extractText = require("./utils/extractText");



const app = express();
app.use(cors());
app.use(express.json());

// ================= MongoDB =================
mongoose
  .connect(
    "mongodb+srv://nsurendar483_db_user:yR9UpymdANRM1oAL@cluster0.pveeswg.mongodb.net/mydatabase?retryWrites=true&w=majority"
  )
  .then(() => console.log("MongoDB Atlas Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// ================= User Schema =================
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);


// ================= Analysis History Schema =================
const analysisHistorySchema = new mongoose.Schema({
  email: { type: String, required: true },
  jobTitle: String,
  status: String,
  requiredSkills: String,
  matchedSkills: [String],
  matchPercentage: Number,
  date: String
});

const AnalysisHistory = mongoose.model(
  "AnalysisHistory",
  analysisHistorySchema
);

// ================= OTP Store =================
const otpStore = {};

// ================= Nodemailer =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nsurendar483@gmail.com",
    pass: "xpidzhqmqsrolmuq",
  },
});

// ================= SEND OTP =================
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email is required" });

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email] = otp;

  try {
    await transporter.sendMail({
      from: "Resume AI <nsurendar483@gmail.com>",
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    console.log(`OTP for ${email}: ${otp}`);
    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { email, password, otp } = req.body;

  if (otpStore[email] !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return res.status(400).json({ message: "Email already registered" });

  const hashedPassword = await bcrypt.hash(password, 10);
  await new User({ email, password: hashedPassword }).save();

  delete otpStore[email];
  res.json({ message: "Account created successfully" });
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(400).json({ message: "Invalid credentials" });

  res.json({ message: "Login successful" });
});


// =================================================================
// ================= RESUME ANALYSIS SECTION ========================
// =================================================================
app.post("/analyze", upload.array("resume", 20), async (req, res) => {
  try {

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No resumes uploaded" });
    }

    const results = [];

    for (const file of req.files) {

      const resumeText = await extractText(file.path);

      const payload = {
  file_name: file.originalname,
  skills: req.body.skills
    ? req.body.skills.split(",").map(s => s.trim().toLowerCase())
    : [],
  resume_text: resumeText,
  job_description: req.body.jobDescription || "",
  cutoff: req.body.cutOffMark ? Number(req.body.cutOffMark) : 0,
  cgpa: req.body.cgpa ? Number(req.body.cgpa) : 0,
tenth: req.body.tenth ? Number(req.body.tenth) : 0,
twelfth: req.body.twelfth ? Number(req.body.twelfth) : 0
};

      const pythonExe = path.join(__dirname, "../venv/Scripts/python.exe");
      const scriptPath = path.join(__dirname, "python/resume_analyzer.py");

      const output = await new Promise((resolve, reject) => {

  const py = spawn(pythonExe, [scriptPath]);

  let result = "";
  let error = "";

  py.stdout.on("data", (data) => {
    result += data.toString();
  });

  py.stderr.on("data", (data) => {
    error += data.toString();
  });

  py.on("close", (code) => {

    fs.unlinkSync(file.path); // delete uploaded file

    if (error) {
      console.error("PYTHON ERROR:", error);
      return reject(error);
    }

    try {
      resolve(result);
    } catch (e) {
      reject("Invalid JSON from Python");
    }
  });

  // ⭐ SEND DATA TO PYTHON
  py.stdin.write(JSON.stringify(payload));
  py.stdin.end();

});


      results.push(JSON.parse(output));
    }

    res.json(results);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Multi resume analysis failed" });
  }
});



// ================= SAVE ANALYSIS HISTORY =================
app.post("/save-history", async (req, res) => {
  try {
    const {
      email,
      jobTitle,
      status,
      requiredSkills,
      matchedSkills,
      matchPercentage,
      date
    } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const record = new AnalysisHistory({
      email,
      jobTitle,
      status,
      requiredSkills,
      matchedSkills,
      matchPercentage,
      date
    });

    await record.save();

    res.json({ message: "History saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to save history" });
  }
});


// ================= SERVER =================
const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
