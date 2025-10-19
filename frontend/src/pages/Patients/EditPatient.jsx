import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditPatient() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [condition, setCondition] = useState("");
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPatient = async () => {
      const res = await axios.get(`${API}/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const p = res.data;
      setName(p.name);
      setAge(p.age);
      setCondition(p.condition);
    };
    fetchPatient();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await axios.put(
      `${API}/api/patients/${id}`,
      { name, age, condition },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    navigate("/patients");
  };

  return (
    <div className="max-w-lg mx-auto mt-20 bg-white p-6 shadow rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">Edit Patient</h1>
      <form onSubmit={handleUpdate} className="space-y-3">
        <input
          type="text"
          placeholder="Name"
          className="w-full border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Age"
          className="w-full border p-2 rounded"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
        <input
          type="text"
          placeholder="Condition"
          className="w-full border p-2 rounded"
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
}
    