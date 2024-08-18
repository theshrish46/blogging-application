import prisma from "./../../../../utils/connect";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {


  console.log("inside the put function");

  const { blogId } = params;
  const { title, content, media, category } = await req.json();

  try {
    const updatedPost = await prisma.post.update({
      where: { id: blogId }, // Adjust if `blogId` is not of type `id`
      data: {
        title,
        content,
        imageUrl: media,
        categoryId: category, // Ensure `categoryId` is correct in your Prisma schema
      },
    });

    return new Response(JSON.stringify(updatedPost), { status: 200 });
  } catch (error) {
    console.error("Error updating post:", error); // Improved error logging
    return new Response(JSON.stringify({ message: "Failed to update post" }), {
      status: 500,
    });
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletePost = await prisma.post.delete({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json({
      msg: "Post Deleted",
      deletePost,
    });
  } catch (error) {
    console.log("error ===>", error);
    return NextResponse.json(error);
  }
}
