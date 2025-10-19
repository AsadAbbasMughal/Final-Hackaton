import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function PatientsList() {
  const [patients, setPatients] = useState([]);
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await axios.get(`${API}/api/patients`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data);
      } catch (err) {
        console.error("❌ Error fetching patients:", err);
      }
    };
    fetchPatients();
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-700">👩‍⚕️ My Patients</h1>
        <Link
          to="/patients/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          ➕ Add New
        </Link>
      </div>

      {patients.length === 0 ? (
        <p>No patients found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {patients.map((p) => (
            <div key={p._id} className="bg-white p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{p.name}</h2>
              <p>Age: {p.age}</p>
              <p>Condition: {p.condition}</p>

              <div className="flex gap-2 mt-3">
           <Link
  to={`/patients/${p._id}/reports`}
  className="bg-green-500 text-white px-3 py-1 rounded"
>
  View Reports
</Link>

                <Link
                  to={`/patients/${p._id}/edit`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={async () => {
                    if (confirm("Delete this patient?")) {
                      await axios.delete(`${API}/api/patients/${p._id}`, {
                        headers: { Authorization: `Bearer ${token}` },
                      });
                      setPatients(patients.filter((x) => x._id !== p._id));
                    }
                  }}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
