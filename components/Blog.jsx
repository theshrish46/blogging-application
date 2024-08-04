"use client";

import axios from "axios";
import { motion } from "framer-motion";
import Image from "next/image";

import React, { useEffect } from "react";

const BlogPage = ({ blog, category }) => {
  useEffect(() => {
    // Increment view count when the page is loaded
    const incrementViews = async () => {
      try {
        await axios.post("/api/blog-increment", { id: blog.id });
      } catch (error) {
        console.error("Failed to increment view count", error);
      }
    };
    incrementViews();
  }, [blog.id]);

  return (
    <div className="container mx-auto p-6 mt-20 py-10">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
          {blog.title}
        </h1>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.75, delay: 0.2 }}
        className="mb-4"
      >
        <p className="text-lg text-gray-600 mb-4">
          Category: {category.name} {category.emoji}
        </p>
      </motion.div>

      {blog.imageUrl ? (
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.75, delay: 0.2 }}
            className="mb-4"
          >
            <Image src={blog.imageUrl} alt="Image" width={750} height={500} />
          </motion.div>
        </div>
      ) : (
        <div></div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.4 }}
        className="prose lg:prose-xl"
      >
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </motion.div>
    </div>
  );
};

export default BlogPage;
