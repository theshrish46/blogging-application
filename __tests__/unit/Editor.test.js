import Editor from "./../../components/Editor"; // Adjust the path based on your app structure
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// Mock necessary modules
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    prefetch: jest.fn().mockResolvedValue(undefined),
    query: {},
    asPath: "",
  }),
}));

jest.mock("next-auth/react", () => ({
  useSession: jest
    .fn()
    .mockReturnValue({ data: { user: { email: "test@example.com" } } }),
}));

jest.mock("axios");

describe("Editor Page", () => {
  const mockCategories = [
    { id: "1", name: "Tech", emoji: "💻" },
    { id: "2", name: "Lifestyle", emoji: "🌿" },
  ];

  const mockValue = {
    title: "Initial Title",
    content: "<p>Initial content</p>",
    category: "1", // Assuming the category ID is "1" for "Tech"
  };

  it("renders the editor page with all elements", () => {
    render(<Editor categories={mockCategories} value={mockValue} />);

    // Check if title input, category selector, and save button are rendered
    expect(
      screen.getByPlaceholderText("Enter the title of your post")
    ).toBeInTheDocument();
    expect(screen.getByLabelText("Category")).toBeInTheDocument();
    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  it("updates the title input value", () => {
    render(<Editor categories={mockCategories} value={mockValue} />);

    const titleInput = screen.getByPlaceholderText(
      "Enter the title of your post"
    );

    // Check initial value
    expect(titleInput.value).toBe("Initial Title");

    // Simulate user input
    fireEvent.change(titleInput, { target: { value: "My New Post" } });

    // Verify the input value has been updated
    expect(titleInput.value).toBe("My New Post");
  });

  it("updates the category when selected", () => {
    render(<Editor categories={mockCategories} value={mockValue} />);

    const categorySelect = screen.getByLabelText("Category");

    // Simulate category selection
    fireEvent.change(categorySelect, { target: { value: "Tech" } });

    expect(categorySelect.value).toBe("Tech");
  });

  it("calls the handleSave function on save button click", async () => {
    axios.post.mockResolvedValue({ data: {} });

    render(<Editor categories={mockCategories} value={mockValue} />);

    const saveButton = screen.getByText("Save");

    // Simulate save button click
    fireEvent.click(saveButton);

    // Check that axios.post was called
    expect(axios.post).toHaveBeenCalled();
  });
});
