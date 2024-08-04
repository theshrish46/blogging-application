"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import { useSession } from "next-auth/react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ManagePage = () => {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await axios.get(
            `/api/blog/author/${session.user.id}`
          );
          setBlogs(response.data);

          const titles = response.data.map((blog) => blog.title);
          const views = response.data.map((blog) => blog.views);
          const likes = response.data.map((blog) => blog.likes);

          setChartData({
            labels: titles,
            datasets: [
              {
                label: "Views",
                data: views,
                backgroundColor: "rgba(54, 162, 235, 0.6)",
              },
              {
                label: "Likes",
                data: likes,
                backgroundColor: "rgba(255, 99, 132, 0.6)",
              },
            ],
          });
        } catch (error) {
          console.error(error);
          setError("Failed to load blogs.");
        }
      }
    };

    fetchBlogs();
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    return <p>You need to be logged in to view this page.</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Manage Your Blogs
      </h1>

      {chartData && (
        <div className="mb-8">
          <Bar data={chartData} />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map((blog) => (
          <motion.div
            key={blog.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="p-4 border rounded-lg shadow-sm"
          >
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p>{blog.excerpt}</p>
            <p className="text-sm text-gray-600">{blog.views} views</p>
            <p className="text-sm text-gray-600">{blog.likes} likes</p>
            <div className="mt-4 flex space-x-2">
              <button
                onClick={() => handleEdit(blog.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(blog.id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ManagePage;
