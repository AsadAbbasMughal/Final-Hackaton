import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import { fetchImageBinary, convertToBase64, sendReportToGemini } from "../Patients";

export default function PatientReports() {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // URL input
  const [uploading, setUploading] = useState(false);

  const API = "http://localhost:8000";
  const token = localStorage.getItem("token");

  // --- Convert image URL to Base64 ---
  const fetchImageBinary = async (imageUrl) => {
    try {
      const res = await axios.get(imageUrl, {
        responseType: "arraybuffer",
        headers: { Authorization: `Bearer ${token}` },
      });
      const base64 = btoa(
        new Uint8Array(res.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ""
        )
      );
      return `data:image/jpeg;base64,${base64}`;
    } catch (err) {
      console.error("Failed to fetch image:", err);
      return null;
    }
  };

  // --- Send report + Base64 image + username to Gemini ---
  const sendToGemini = async (report) => {
    const imageBinary = report.image ? await fetchImageBinary(report.image) : null;

    const payload = {
      patientId: report.patient,
      username: "example_username", // dynamic username if available
      title: report.title,
      description: report.description,
      imageBinary,
      file: report.file || null,
    };

    try {
      const res = await axios.post(`${API}/api/gemini`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update report with Gemini response
      setReports((prev) =>
        prev.map((r) =>
          r._id === report._id ? { ...r, geminiAnalysis: res.data.analysis } : r
        )
      );
    } catch (err) {
      console.error("Failed to send to Gemini:", err);
    }
  };

  // --- Fetch patient reports ---
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(`${API}/api/reports/patient/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setReports(res.data.reports || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchReports();
  }, [id]);

  // --- Add new report ---
  const handleAddReport = async () => {
    if (!title) return alert("Title is required");

    try {
      setUploading(true);
      const res = await axios.post(
        `${API}/api/reports`,
        { title, description, patient: id, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports((prev) => [...prev, res.data]);

      // Send to Gemini
      await sendToGemini(res.data);

      setTitle("");
      setDescription("");
      setImage("");
      setUploading(false);
    } catch (err) {
      console.error(err);
      alert("Failed to add report");
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">📝 Patient Reports</h1>

      {/* Add new report */}
      <div className="mb-6 p-4 bg-white rounded shadow">
        <h2 className="text-xl font-semibold mb-2">➕ Add New Report</h2>
        <input
          type="text"
          placeholder="Report Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <textarea
          placeholder="Report Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={handleAddReport}
          disabled={uploading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {uploading ? "Adding..." : "Add Report"}
        </button>
      </div>

      {/* List of reports */}
      {reports.length === 0 ? (
        <p>No reports found for this patient.</p>
      ) : (
        reports.map((r) => (
          <div key={r._id} className="bg-white shadow rounded p-4 mb-4">
            <h2 className="text-xl font-semibold">{r.title}</h2>
            <p className="text-gray-600">{r.description}</p>
            {r.image && (
              <img
                src={r.image}
                alt={r.title}
                className="w-full max-h-64 object-cover mt-2 rounded"
              />
            )}
            {r.geminiAnalysis && (
              <p className="mt-2 p-2 bg-gray-100 rounded">
                <strong>Gemini says:</strong> {r.geminiAnalysis}
              </p>
            )}
            <p className="text-gray-400 text-sm">
              {new Date(r.date).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
