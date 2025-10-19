import axios from "axios";

// --- Config ---
const API = "http://localhost:8000"; // backend URL
const token = localStorage.getItem("token");

/**
 * Fetch image binary from URL
 * @param {string} imageUrl
 * @returns binary data
 */
export const fetchImageBinary = async (imageUrl) => {
  try {
    const res = await axios.get(imageUrl, {
      responseType: "arraybuffer",
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  } catch (err) {
    console.error("Failed to fetch image:", err);
    return null;
  }
};

/**
 * Convert binary data to Base64
 * @param {ArrayBuffer} binaryData
 * @returns Base64 string
 */
export const convertToBase64 = (binaryData) => {
  return Buffer.from(binaryData, "binary").toString("base64");
};

/**
 * Send report + image to Gemini
 * @param {Object} report
 * @param {string} username
 * @returns Gemini analysis
 */
export const sendReportToGemini = async (report, username) => {
  // 1️⃣ Fetch image binary
  const binaryData = await fetchImageBinary(report.image);
  if (!binaryData) return null;

  // 2️⃣ Convert to Base64
  const imageBase64 = convertToBase64(binaryData);

  // 3️⃣ Prepare payload
  const payload = {
    patientId: report.patient,
    username,
    title: report.title,
    description: report.description,
    imageBinary: imageBase64,
    file: report.file || null,
  };

  // 4️⃣ Send to Gemini
  try {
    const res = await axios.post(`${API}/api/gemini`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log("Gemini response:", res.data);
    return res.data.analysis;
  } catch (err) {
    console.error("Failed to send to Gemini:", err);
    return null;
  }
};
