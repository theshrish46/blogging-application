import prisma from "./../../../../utils/connect";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const posts = await prisma.post.findMany({
    where: {
      authorId: params.id,
    },
  });
  const postIds = posts.map((post) => post.id);

  const comments = await prisma.comment.findMany({
    where: {
      postId: {
        in: postIds,
      },
    },
  });

  return NextResponse.json(comments);
}

export async function DELETE(request, { params }) {
  const comment = await prisma.comment.delete({
    where: {
      id: params.id,
    },
  });

  console.log("Deleted Comment =======>", comment);
  return NextResponse.json({
    msg: "Comment Deleted",
    comment,
  });
}
