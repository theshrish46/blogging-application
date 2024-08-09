import React from "react";
import { motion } from "framer-motion";

import {
  fetchBlogById,
  fetchComment,
  getCategory,
  getCategoryById,
} from "@/utils/blog";
import BlogPage from "@/components/BlogPage";
import { getAuthSession } from "@/utils/auth";
import Editor from "@/components/Editor";

const BlogDetailPage = async ({ params }) => {
  const { id } = params;
  const blog = await fetchBlogById(id);
  const category = await getCategoryById(blog.categoryId);
  const categories = await getCategory();
  const comments = await fetchComment(blog.id);

  const session = await getAuthSession();

  if (session?.email == blog?.author?.email) {
    return <Editor categories={categories} value={blog} />;
  }
  return (
    <div>
      <BlogPage
        blog={blog}
        category={category}
        comments={comments}
        key={blog.id}
      />
      ;
    </div>
  );
};

export default BlogDetailPage;
