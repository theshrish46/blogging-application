"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import "chart.js/auto";
import { toast } from "react-toastify";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const AdminPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chartData, setChartData] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsAndCategories = async () => {
      try {
        const [blogsResponse, categoriesResponse] = await Promise.all([
          axios.get("/api/blog"),
          axios.get("/api/categories"),
        ]);

        console.log("Blog response", blogsResponse.data);
        console.log("Category Response", categoriesResponse.data);

        const blogsData = blogsResponse.data;
        const categoriesData = categoriesResponse.data;

        const categoryNames = categoriesData.map((cat) => cat.name);
        const blogsCountPerCategory = categoryNames.map(
          (cat) => blogsData.filter((blog) => blog.category.name === cat).length
        );

        setBlogs(blogsData);
        setCategories(categoriesData);

        setChartData({
          blogsPerCategory: {
            labels: categoryNames,
            datasets: [
              {
                label: "Blogs Per Category",
                data: blogsCountPerCategory,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
              },
            ],
          },
        });
      } catch (error) {
        console.error(error);
        setError("Failed to load blogs and categories.");
      }
    };

    fetchBlogsAndCategories();
  }, []);

  const deleteBlog = async (blogId) => {
    console.log("Blog Id===", blogId);
    try {
      const response = await axios.delete(`/api/blog/${blogId}`);
      setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      toast.warning(response.data.msg);
    } catch (error) {
      console.error("Failed to delete blog:", error);
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
        Admin Dashboard
      </h1>

      {chartData.blogsPerCategory && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Total Blogs Per Category
          </h2>
          <Bar data={chartData.blogsPerCategory} />
        </motion.div>
      )}

      {categories.map((category) => (
        <div key={category.id} className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            {category.name}
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {blogs
              .filter((blog) => blog.category.name === category.name)
              .map((blog) => (
                <div key={blog.id} className="bg-gray-100/55 p-4 rounded mb-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">{blog.title}</h3>
                    <button
                      onClick={() => deleteBlog(blog.id)}
                      className="text-red-500"
                    >
                      Delete
                    </button>
                  </div>
                  <p>Author: {blog.author.name}</p>
                  <p>Views: {blog.views}</p>
                  <p>Likes: {blog.likes}</p>
                </div>
              ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

export default AdminPage;
