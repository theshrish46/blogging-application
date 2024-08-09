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
import { toast } from "react-toastify";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ManagePage = () => {
  const { data: session, status } = useSession();
  const [blogs, setBlogs] = useState([]);
  const [chartData, setChartData] = useState({});
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogsAndComments = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const [blogsResponse, commentsResponse, categoriesResponse] =
            await Promise.all([
              axios.get(`/api/blog/author/${session.user.id}`),
              axios.get(`/api/blog-comment/${session.user.id}`),
              axios.get("/api/categories"),
            ]);

          setBlogs(blogsResponse.data);
          setComments(commentsResponse.data);

          const titles = blogsResponse.data.map((blog) => blog.title);
          const views = blogsResponse.data.map((blog) => blog.views);
          const likes = blogsResponse.data.map((blog) => blog.likes);

          const categories = categoriesResponse.data.map(
            (category) => category.name
          );
          const postsPerCategory = categoriesResponse.data.map(
            (category) =>
              blogsResponse.data.filter(
                (blog) => blog.categoryId === category.id
              ).length
          );

          setChartData({
            likesAndViews: {
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
            },
            postsPerCategory: {
              labels: categories,
              datasets: [
                {
                  label: "Posts Per Category",
                  data: postsPerCategory,
                  backgroundColor: "rgba(75, 192, 192, 0.6)",
                },
              ],
            },
          });
        } catch (error) {
          console.error(error);
          setError("Failed to load blogs and comments.");
        }
      }
    };

    fetchBlogsAndComments();
  }, [session, status]);

  const deleteComment = async (commentId) => {
    try {
      const response = await axios.delete(`/api/blog-comment/${commentId}`);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
      toast.success(response.data.msg);
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

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

      {chartData.likesAndViews && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Likes and Views on Each Blog
          </h2>
          <Bar data={chartData.likesAndViews} />
        </motion.div>
      )}

      {chartData.postsPerCategory && (
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-bold text-gray-700 mb-4">
            Total Posts Per Category
          </h2>
          <Bar data={chartData.postsPerCategory} />
        </motion.div>
      )}

      <h2 className="text-xl font-bold text-gray-700 mb-4">Comments</h2>
      <motion.ul
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {blogs.map((blog) => (
          <div className="bg-gray-100/10 p-2 my-2" key={blog.id}>
            <div className="text-xl font-bold">{blog.title}</div>
            {comments.map((comment) =>
              comment.postId === blog.id ? (
                <li
                  key={comment.id}
                  className="flex justify-between items-center py-2 border-b"
                >
                  <div>
                    <span>{comment.content}</span>
                  </div>
                  <button
                    onClick={() => deleteComment(comment.id)}
                    className="text-red-500"
                  >
                    Delete
                  </button>
                </li>
              ) : null
            )}
          </div>
        ))}
      </motion.ul>
    </div>
  );
};

export default ManagePage;
