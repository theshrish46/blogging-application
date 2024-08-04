import BlogCard from "@/components/BlogCard";
import prisma from "@/utils/connect";

export default async function HomePage() {
  const blogs = await prisma.post.findMany();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="pt-16 py-20">
        {" "}
        {/* Adjusted top padding */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center my-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
              Welcome to My Blog
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover the ease of creating and managing your own blog with our
              user-friendly platform. Write, publish, and share your stories
              effortlessly.
            </p>

            <div className="bg-white shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Features
              </h2>
              <ul className="list-disc list-inside text-left text-gray-600">
                <li className="mb-2">🎨 Beautiful, customizable blogs.</li>
                <li className="mb-2">
                  ✍️ Easy-to-use editor for crafting your posts.
                </li>
                <li className="mb-2">
                  🔄 Seamless integration with Editor.js for rich text editing.
                </li>
                <li className="mb-2">
                  💬 Enable comments on your posts to engage with readers.
                </li>
                <li className="mb-2">
                  📂 Categorize your posts for better organization.
                </li>
                <li className="mb-2">
                  👍 Track and manage likes on your posts.
                </li>
              </ul>
            </div>

            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Get Started
              </h2>
              <p className="text-gray-600 mb-4">
                It's simple to start sharing your thoughts and ideas. Our
                platform provides everything you need to get started with
                blogging.
              </p>
              <p className="text-gray-600 mb-6">
                Our rich text editor, Editor.js, offers a clean and intuitive
                interface for writing and formatting your posts with ease. You
                can include rich media, organize content, and more—all in a
                user-friendly environment.
              </p>
              <a
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 text-xs md:text-base rounded-md hover:bg-blue-600"
              >
                Sign In to Start Blogging
              </a>
            </div>

            <div className="container mx-auto py-6">
              {blogs.map((blog) => (
                <BlogCard blog={blog} key={blog.id} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
