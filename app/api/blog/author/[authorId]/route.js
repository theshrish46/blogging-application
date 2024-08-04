import { NextResponse } from "next/server";
import prisma from "@/utils/connect";

export async function GET(request, { params }) {
  const { authorId } = params;

  console.log(authorId);

  const blogs = await prisma.post.findMany({
    where: { authorId: authorId },
    select: {
      id: true,
      title: true,
      views: true,
      likes: true,
    },
  });

  return NextResponse.json(blogs);
}
