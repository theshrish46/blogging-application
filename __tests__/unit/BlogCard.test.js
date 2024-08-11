import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import BlogCard from "./../../components/BlogCard";

describe("BlogCard", () => {
  it("renders the blog title", () => {
    const blog = {
      title: "Test Blog",
      content: "This is a test.",
      author: { name: "Test Author" },
    };
    render(<BlogCard blog={blog} />);
    expect(screen.getByText("Test Blog")).toBeInTheDocument(); // Now this should work
  });
});
