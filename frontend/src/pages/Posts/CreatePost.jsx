import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL; // ✅ env variable
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}/api/posts`,
        { description, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/posts"); // redirect to posts page after posting
    } catch (err) {
      console.error("❌ Failed to create post:", err);
      alert("Error creating post!");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-28 bg-white shadow-md p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Create a Post
      </h2>
      <form onSubmit={handleSubmit}>
        <textarea
          className="w-full border p-2 rounded mb-3"
          placeholder="What's on your mind?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <input
          type="text"
          className="w-full border p-2 rounded mb-3"
          placeholder="Image URL (optional)"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white w-full py-2 rounded hover:bg-blue-700 transition"
        >
          Post
        </button>
      </form>
    </div>
  );
}
