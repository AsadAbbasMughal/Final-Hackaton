import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ViewPatient() {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const res = await axios.get(`${API}/api/patients/${id}`);
        setPatient(res.data);
      } catch (err) {
        console.error("❌ Error fetching patient:", err);
      }
    };
    fetchPatient();
  }, [id]);

  if (!patient)
    return <p className="text-center mt-10 text-gray-500">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-20 bg-white p-8 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-bold text-blue-700 mb-8 text-center">
        🧑‍⚕️ Patient Details
      </h2>

      <div className="flex flex-col items-center">
        {patient.imageUrl && (
          <img
            src={patient.imageUrl}
            alt={patient.name}
            className="w-48 h-48 object-cover rounded-full mb-6 shadow-md"
          />
        )}

        <div className="grid grid-cols-2 gap-4 text-lg w-full">
          <div>
            <p className="font-semibold text-gray-700">Name:</p>
            <p className="text-gray-800">{patient.name}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Age:</p>
            <p className="text-gray-800">{patient.age}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Blood Pressure:</p>
            <p className="text-gray-800">{patient.bloodPressure}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Temperature:</p>
            <p className="text-gray-800">{patient.temperature}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Weight:</p>
            <p className="text-gray-800">{patient.weight}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700">Added By:</p>
            <p className="text-gray-800">
              {patient.createdBy?.name || "Unknown"}
            </p>
          </div>
        </div>

        <button
          onClick={() => window.history.back()}
          className="mt-8 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
        >
          🔙 Back
        </button>
      </div>
    </div>
  );
}
