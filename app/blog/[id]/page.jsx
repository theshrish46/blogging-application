import React from "react";
import { motion } from "framer-motion";

import { fetchBlogById, getCategory, getCategoryById } from "@/utils/blog";
import BlogPage from "@/components/Blog";
import { getAuthSession } from "@/utils/auth";
import Editor from "@/components/Editor";

const BlogDetailPage = async ({ params }) => {
  const { id } = params;
  const blog = await fetchBlogById(id);
  const category = await getCategoryById(blog.categoryId);
  const categories = await getCategory();

  const session = await getAuthSession();
  const { user } = session;

  if (user.email == blog.author.email) {
    return <Editor categories={categories} value={blog} />;
  }
  return (
    <div>
      <BlogPage blog={blog} category={category} key={blog.id} />;
    </div>
  );
};

export default BlogDetailPage;
