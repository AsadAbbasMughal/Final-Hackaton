import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function PatientReports() {
  const { id } = useParams(); // patient ID
  const [reports, setReports] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(""); // URL input
  const [uploading, setUploading] = useState(false);

  const API = "http://localhost:8000"; // backend URL
  const token = localStorage.getItem("token");

  // Fetch patient reports
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

  // Add new report
  const handleAddReport = async () => {
    if (!title) return alert("Title is required");

    try {
      const res = await axios.post(
        `${API}/api/reports`,
        { title, description, patient: id, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setReports((prev) => [...prev, res.data]);
      setTitle("");
      setDescription("");
      setImage("");
    } catch (err) {
      console.error(err);
      alert("Failed to add report");
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

        {/* Image URL input (CreatePost style) */}
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
            <p className="text-gray-400 text-sm">
              {new Date(r.date).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}
