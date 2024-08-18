import { NextResponse } from "next/server";
import prisma from "./../../../../../utils/connect";

export async function GET(request, { params }) {
  const { authorId } = params;


  const blogs = await prisma.post.findMany({
    where: { authorId: authorId },
    include: {
      author: true,
      category: true,
    },
  });

  return NextResponse.json(blogs);
}
