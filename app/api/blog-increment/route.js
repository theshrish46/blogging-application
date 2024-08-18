import { getAuthSession } from "./../../../utils/auth";
import prisma from "./../../../utils/connect";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { id } = await req.json();

  const user = getAuthSession();
  const post = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json({
      msg: "No User found",
      blog: post,
    });
  }

  const updatedPost = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  return NextResponse.json({
    msg: "View incremented",
    blog: updatedPost,
  });
}
