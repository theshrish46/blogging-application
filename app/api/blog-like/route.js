import prisma from "./../../../utils/connect";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { id } = await request.json();

  try {
    const blog = await prisma.post.update({
      where: { id: id },
      data: {
        likes: {
          increment: 1,
        },
      },
    });

    return NextResponse.json({ likes: blog.likes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to like the blog" },
      { status: 500 }
    );
  }
}
