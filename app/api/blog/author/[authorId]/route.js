// app/api/blogs/author/[authorId]/route.js

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request, { params }) {
  const { authorId } = params;

  console.log(authorId);
  
  const blogs = await prisma.post.findMany({
    where: { authorId: parseInt(authorId) },
    select: {
      id: true,
      title: true,
      views: true,
      likes: true,
    },
  });

  return NextResponse.json(blogs);
}
