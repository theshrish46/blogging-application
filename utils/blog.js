import prisma from "@/utils/connect";

export const getCategoryById = async (id) => {
  const category = await prisma.category.findFirst({
    where: {
      id: id,
    },
  });

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
