"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const BlogCard = ({ blog }) => {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto bg-white shadow-lg rounded-r-lg overflow-hidden mb-6"
      >
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-shrink-0">
            {}
            <Image
              width={400}
              height={400}
              className="h-16 w-16 sm:h-48 sm:w-72"
              src={blog.imageUrl}
              alt={blog.title}
            />
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left px-3 py-4">
            <p className="text-xl leading-tight font-semibold text-gray-900">
              {blog.title}
            </p>
            <p className="text-sm leading-tight text-gray-600">{blog.views}</p>
            <div className="mt-4">
              <a
                href={`/blog/${blog.id}`}
                className="text-indigo-500 hover:text-indigo-600 font-semibold text-sm"
              >
                Read more
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogCard;
