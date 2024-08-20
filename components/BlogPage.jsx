"use client";

import axios from "axios";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { AiFillLike } from "react-icons/ai";
import { AiOutlineLike } from "react-icons/ai";
import { toast } from "react-toastify";

const BlogPage = ({ blog, category, comments }) => {
  const { data: user, status } = useSession();

  const [likes, setLikes] = useState(blog.likes || 0);

  const [arrayComments, setArrayComments] = useState(comments || []);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const incrementViews = async () => {
      try {
        await axios.post("/api/blog-increment", { id: blog.id });
      } catch (error) {
        console.error("Failed to increment view count", error);
      }
    };
    incrementViews();
  }, [blog.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const response = await axios.post("/api/blog-comment", {
        blogId: blog.id,
        comment,
      });
      toast.success("Comment Posted");
      setComment("");
      setArrayComments([...arrayComments, response.data]);
    } catch (error) {
      toast.error("Failed to post comment");
      console.error("Failed to post comment", error);
    }
  };

  const handleLike = async () => {
    try {
      const response = await axios.post("/api/blog-like", { id: blog.id });
      setLikes(response.data.likes);
      toast.success("Liked");
    } catch (error) {
      console.error("Failed to like the blog", error);
    }
  };

  const isAuthor = user?.user?.email === blog.authorId;

  return (
    <div className="container mx-auto p-4 sm:p-6 md:px-8 mt-20 py-10 w-full max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        className="mb-6"
      >
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6">
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

      {blog.imageUrl && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2 }}
          className="mb-8"
        >
          <div className="relative w-full">
            <Image
              src={blog.imageUrl}
              alt="Image"
              width={1000}
              height={1000}
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      )}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.4 }}
        className="prose lg:prose-xl mx-auto my-10"
      >
        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
      </motion.div>

      {!isAuthor && (
        <div className="mt-10">
          {/* Like button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className="px-4 py-2 rounded-lg focus:outline-none"
            >
              <div className="flex justify-center items-center gap-x-2">
                <AiOutlineLike size={20} />
                {likes}
              </div>
            </button>
          </div>

          {/* Comment form */}
          {status == "authenticated" ? (
            <>
              <form onSubmit={handleCommentSubmit} className="mt-6">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
                <button
                  type="submit"
                  className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none"
                >
                  Submit Comment
                </button>
              </form>
            </>
          ) : null}

          {/* Display comments */}

          <div className="mt-8">
            <h3 className="text-2xl font-semibold mb-4">Comments</h3>
            {comments.length > 0 ? (
              comments.map((comment, index) => (
                <div
                  key={index}
                  className="border-b border-gray-200 bg-gray-100/100 px-2 py-4 text-gray-700"
                >
                  <div className="font-semibold text-sm mb-2">
                    {comment.author.name}
                  </div>
                  <div className="font-medium">{comment.content}</div>
                </div>
              ))
            ) : (
              <p className="text-gray-600">
                No comments yet. Be the first to comment!
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogPage;
