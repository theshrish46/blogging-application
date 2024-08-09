import prisma from "@/utils/connect"; // Ensure the path is correct
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  // If authentication is required, uncomment and implement session check
  // const session = await getServerSession(authOptions);
  // if (!session || !session.user) {
  //   return new Response(JSON.stringify({ message: "Unauthorized" }), {
  //     status: 401,
  //   });
  // }

  console.log("inside the put function");

  const { blogId } = params;
  const { title, content, media, category } = await req.json();

  try {
    console.log("inside the try block");
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
  console.log(params.blogId);
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
