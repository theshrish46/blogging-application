"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ blog }) => {
  const cleanContent = (html) => {

    const regex = /<p[^>]*>(.*?)<\/p>/gi;
    let result;
    let cleanedContent = "";

    while ((result = regex.exec(html)) !== null) {
      cleanedContent += `<p>${result[1]}</p>`;
    }

    const sliceLength = 100;
    if (cleanedContent.length > sliceLength) {
      cleanedContent = cleanedContent.slice(0, sliceLength) + "...";
    }

    return cleanedContent;
  };

  const capitalizeAuthor = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const sanitizedContent = cleanContent(blog.content);

  return (
    <div className="w-full max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden mb-6"
      >
        <Link href={`/blog/${blog.id}`} className="sm:flex sm:items-center">
          <div className="sm:flex-shrink-0">
            {blog.imageUrl ? (
              <Image
                width={400}
                height={400}
                className="h-16 w-16 sm:h-48 sm:w-72 object-cover rounded-l-lg"
                src={blog.imageUrl}
                alt={blog.title}
              />
            ) : (
              <div className="h-16 w-16 sm:h-48 sm:w-72 bg-gray-200"></div>
            )}
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-4 sm:flex-grow-1 text-center sm:text-left px-3 py-4">
            <motion.p
              initial={{ y: 10 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl md:text-3xl mb-2 leading-tight font-semibold text-gray-900"
            >
              {blog.title}
            </motion.p>
            <div className="w-full flex gap-x-3 items-center">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="text-sm leading-tight text-gray-600"
              >
                Views: {blog.views}
              </motion.p>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                className="text-sm leading-tight text-gray-600"
              >
                Likes: {blog.likes}
              </motion.p>
            </div>
            <div className="mt-4 text-lg font-semibold">
              {capitalizeAuthor(blog.author.name)}
            </div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.6 }}
              className="text-sm text-gray-600 mt-2"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
          </div>
        </Link>
      </motion.div>
    </div>
  );
};

export default BlogCard;
