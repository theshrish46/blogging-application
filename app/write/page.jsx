import Editor from "./../../components/Editor";
import prisma from "./../../utils/connect";
import React from "react";

const EditorPage = async () => {
  const categories = await prisma.category.findMany();

  const post = await prisma.post.findMany();


  return (
    <div className="container mt-10">
      <Editor categories={categories} />
    </div>
  );
};

export default EditorPage;
