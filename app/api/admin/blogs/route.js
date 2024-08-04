import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const blogs = await prisma.post.findMany({
      include: {
        author: true,
      },
    });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.error(error);
  }
}

export async function DELETE(request) {
  try {
    const { id } = request.nextUrl.query;
    if (!id) return NextResponse.error(new Error("Blog ID is required"));
    await prisma.blog.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Blog deleted" });
  } catch (error) {
    return NextResponse.error(error);
  }
}
