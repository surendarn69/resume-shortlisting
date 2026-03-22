import spacy
import sys
import json
import re


# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# ----------------------------
# Skill normalization map
# ----------------------------
SKILL_MAP = {
    "python": ["python", "python programming", "programming in python"],
    "java": ["java", "core java", "java programming", "j2se"],
    "mysql": ["mysql", "my sql", "sql"],
    "javascript": ["javascript", "js"],
    "node.js": ["node.js", "nodejs"],
    "mongodb": ["mongodb", "mongo db"]
}

# ----------------------------
# Extract Candidate Name
# ----------------------------
def extract_name(text):
    lines = text.split("\n")

    for line in lines[:5]:
        clean = line.strip()
        if 3 < len(clean) < 40:
            if not any(x in clean.lower() for x in ["about", "email", "phone", "education", "skills"]):
                return clean.title()

    doc = nlp(text)
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text

    return "Unknown Candidate"


# ----------------------------
# Normalize skills input
# ----------------------------
def normalize_skills(skills):
    if isinstance(skills, list):
        return [s.strip().lower() for s in skills if s.strip()]
    if isinstance(skills, str):
        return [s.strip().lower() for s in skills.split(",") if s.strip()]
    return []


# ----------------------------
# Clean resume text
# ----------------------------
def clean_resume_text(text):
    if not text:
        return ""
    doc = nlp(text.lower())
    return " ".join(token.text for token in doc if not token.is_space)


# ----------------------------
# Match required skills
# ----------------------------
def match_skills(required_skills, resume_text):
    matched = set()

    for skill in required_skills:
        variants = SKILL_MAP.get(skill, [skill])
        for variant in variants:
            pattern = r"\b" + re.escape(variant) + r"\b"
            if re.search(pattern, resume_text):
                matched.add(skill)
                break

    return matched


# ----------------------------
# Extract Academic Scores
# ----------------------------
def extract_academic_scores(text):
    text = text.lower()

    cgpa = None
    tenth = None
    twelfth = None

    # CGPA / GPA
    cgpa_match = re.search(r'(cgpa|gpa)[^\d]{0,15}(\d+\.?\d*)', text)
    if cgpa_match:
        cgpa = float(cgpa_match.group(2))

    # 10th / SSLC
    tenth_match = re.search(r'(10th|sslc)[\s\S]{0,50}?(\d{2,3}\.?\d*)', text)
    if tenth_match:
        tenth = float(tenth_match.group(2))

    # 12th / HSC
    twelfth_match = re.search(r'(12th|hsc)[\s\S]{0,50}?(\d{2,3}\.?\d*)', text)
    if twelfth_match:
        twelfth = float(twelfth_match.group(2))

    return cgpa, tenth, twelfth


# ----------------------------
# Extract keywords from JD
# ----------------------------
def extract_keywords(text):
    doc = nlp(text.lower())
    keywords = []

    for token in doc:
        if token.pos_ in ["NOUN", "PROPN"]:
            if not token.is_stop and len(token.text) > 2:
                keywords.append(token.text)

    return list(set(keywords))


# ----------------------------
# Match Job Description
# ----------------------------
def match_job_description(jd_text, resume_text):
    if not jd_text:
        return 0

    jd_keywords = extract_keywords(jd_text)
    resume_text = resume_text.lower()

    matched = 0
    for word in jd_keywords:
        if word in resume_text:
            matched += 1

    if len(jd_keywords) == 0:
        return 0

    return int((matched / len(jd_keywords)) * 100)


# ----------------------------
# MAIN FUNCTION
# ----------------------------
def analyze_resume(data):

    required_skills = normalize_skills(data.get("skills"))
    raw_text = data.get("resume_text", "")
    resume_text = clean_resume_text(raw_text)
    jd_text = data.get("job_description", "")
    cutoff = int(data.get("cutoff") or 0)

    # ===============================
    # Academic Extraction
    # ===============================
    res_cgpa, res_tenth, res_twelfth = extract_academic_scores(raw_text)

    hr_cgpa = float(data.get("cgpa") or 0)
    hr_tenth = float(data.get("tenth") or 0)
    hr_twelfth = float(data.get("twelfth") or 0)

    academic_status = "satisfied"

    if hr_cgpa or hr_tenth or hr_twelfth:

        # Not detected case
        if (hr_cgpa and res_cgpa is None) or \
           (hr_tenth and res_tenth is None) or \
           (hr_twelfth and res_twelfth is None):

            academic_status = "not_detected"

        # Detected but below requirement
        elif (hr_cgpa and res_cgpa < hr_cgpa) or \
             (hr_tenth and res_tenth < hr_tenth) or \
             (hr_twelfth and res_twelfth < hr_twelfth):

            academic_status = "not_satisfied"

        else:
            academic_status = "satisfied"

    # ===============================
    # Skill Matching
    # ===============================
    matched_skills = match_skills(required_skills, resume_text)
    total_required = len(required_skills)
    matched_count = len(matched_skills)

    skill_percentage = (
        int((matched_count / total_required) * 100)
        if total_required > 0
        else 0
    )

    # ===============================
    # JD Matching
    # ===============================
    jd_score = match_job_description(jd_text, raw_text)

    # ===============================
    # Final Score
    # ===============================
    final_score = int((skill_percentage * 0.5) + (jd_score * 0.5))

    # ===============================
    # Final Shortlist Logic
    # ===============================
    # ✅ Academic check only if values provided
    if academic_status != "satisfied":
        shortlisted = False
    else:
        if final_score >= cutoff:
            shortlisted = True
        else:
            shortlisted = False
    
    # ===============================
    # Candidate Name
    # ===============================
    file_name = data.get("file_name", "")

    if file_name:
        candidate_name = file_name.rsplit(".", 1)[0]
        candidate_name = re.sub(r'\bresume\b', '', candidate_name, flags=re.I)
        candidate_name = re.sub(r'\d+', '', candidate_name)
        candidate_name = candidate_name.replace("_", " ").replace("-", " ")
        candidate_name = candidate_name.strip().title()
    else:
        candidate_name = extract_name(raw_text)

    return {
        "candidate_name": candidate_name,
        "skill_match": skill_percentage,
        "jd_match": jd_score,
        "final_score": final_score,
        "shortlisted": shortlisted,
        "matched_skills": [skill.capitalize() for skill in matched_skills],
        "academic_status": academic_status
    }


# ----------------------------
# Entry Point
# ----------------------------
if __name__ == "__main__":
    raw_input = sys.stdin.read()
    data = json.loads(raw_input)
    result = analyze_resume(data)
    print(json.dumps(result))