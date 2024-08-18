import { getAuthSession } from "./../../../utils/auth";
import prisma from "./../../../utils/connect";
import { NextResponse } from "next/server";

export async function GET(request) {
  const post = await prisma.post.findMany({
    include: {
      category: true,
      author: true,
    },
  });

  return NextResponse.json(post);
}

export async function POST(req) {
  const { title, content, category, media } = await req.json();

  const user = await getAuthSession();
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
