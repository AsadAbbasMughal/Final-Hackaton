import { useEffect, useState } from "react";
import axios from "axios";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const API = import.meta.env.VITE_API_URL; // ✅ Env variable

  // fetch posts
  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${API}/api/posts`); // ✅ env use
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-2xl mx-auto mt-24 space-y-4">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Latest Posts
      </h2>

      {posts.length === 0 ? (
        <p className="text-center text-gray-600">No posts yet 😢</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="bg-white shadow-md rounded-lg p-4">
            <div className="flex items-center mb-2">
              <h3 className="font-semibold text-blue-600">{post.user?.name}</h3>
              <span className="text-gray-400 text-sm ml-2">
                {new Date(post.createdAt).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-800 mb-3">{post.description}</p>
            {post.image && (
              <img
                src={post.image}
                alt="Post"
                className="rounded-md max-h-96 object-cover mx-auto"
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}
