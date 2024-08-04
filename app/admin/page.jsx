"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const AdminPanel = () => {
  const [blogs, setBlogs] = useState([]);
  const { data: session, status } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (status === "loading") return;
  //   if (!session || session.user.role !== "ADMIN") {
  //     router.push("/"); // Redirect if not an admin
  //   } else {
  //     fetchBlogs();
  //   }
  // }, [session, status]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/admin/blogs");
      console.log(response.data);
      console.log('inside try');
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  };

  const handleDelete = async (blogId) => {
    try {
      await axios.delete(`/api/admin/blogs/${blogId}`);
      fetchBlogs(); // Refresh blog list
    } catch (error) {
      console.error("Error deleting blog", error);
    }
  };

  return (
    <div className="container mx-auto p-6 my-10 py-10">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Admin Panel
      </h1>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        {blogs.length === 0 ? (
          <p>No blogs available.</p>
        ) : (
          <ul className="space-y-4">
            {blogs.map((blog) => (
              <li key={blog.id} className="p-4 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
                <p className="text-gray-600 mb-2">Views: {blog.views}</p>
                <button
                  onClick={() => handleDelete(blog.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </motion.div>
    </div>
  );
};

export default AdminPanel;
