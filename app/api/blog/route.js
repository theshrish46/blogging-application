import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export async function GET(req) {
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

export async function POST(req) {
  const { title, content, category, media } = await req.json();

  const user = getAuthSession();
  //   console.log(user);
  const author = await prisma.user.findFirst({
    where: {
      name: user.name,
      email: user.email,
    },
  });

  if (!author) {
    return NextResponse.json({
      msg: "There is no such user",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title: title,
        content: content,
        imageUrl: media,
        category: {
          connect: {
            id: category,
          },
        },
        author: {
          connect: {
            id: author.id,
          },
        },
      },
    });

    console.log(post);

    return NextResponse.json({
      msg: "Data Stored Successfully",
      id: post.id,
    });
  } catch (error) {
    console.log("[API POST ERROR BLOG]", error);
    return NextResponse.json({
      msg: "Error While saving the data",
    });
  }
}
