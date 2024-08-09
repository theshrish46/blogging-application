import prisma from "@/utils/connect";

export const getCategoryById = async (id) => {
  const category = await prisma.category.findFirst({
    where: {
      id: id,
    },
  });

  return category;
};

export const getCategory = async () => {
  const category = await prisma.category.findMany();

  return category;
};

export const fetchBlogById = async (id) => {
  const blog = await prisma.post.findFirst({
    where: {
      id: id,
    },
    include: {
      author: true,
    },
  });

  return blog;
};

export const fetchComment = async (id) => {
  const comment = await prisma.comment.findMany({
    where: {
      postId: id,
    },
    include: {
      author: true,
    },
  });

  return comment;
};
