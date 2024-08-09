import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { blogId } = await request.json();

  try {
    const comment = await prisma.comment.findMany({
      where: {
        postId: blogId,
      },
    });

    if (!comment) {
      return NextResponse.json({
        msg: "No Comments",
      });
    }
    return NextResponse.json({
      msg: "Comments Found",
      comment,
    });
    
  } catch (error) {
    console.log("[GET REQUEST COMMENT ERROR]");
    return NextResponse.json({
      msg: "Couldn't get comments",
    });
  }
}

export async function POST(request) {
  const { blogId, comment } = await request.json();

  const session = await getAuthSession();

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        post: {
          connect: {
            id: blogId,
          },
        },
        author: {
          connect: {
            id: session.id,
          },
        },
      },
    });

    console.log("Comment POST", newComment);

    return NextResponse.json({ comment: newComment.content }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to post comment" },
      { status: 500 }
    );
  }
}
