"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { header: "3" }],
      [{ font: [] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["clean"],
    ],
  },
};

const Editor = ({ categories, value }) => {
  const { data } = useSession();

  const router = useRouter();
  const [content, setContent] = useState(value?.content || "");
  const [title, setTitle] = useState(value?.title || "");
  const [category, setCategory] = useState({ id: "", name: "", emoji: "" });
  const [file, setFile] = useState(null);
  const [media, setMedia] = useState(value?.imageUrl || "");

  const handleCategoryChange = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];

    setCategory({
      id: selectedOption.getAttribute("data-id"),
      name: selectedOption.getAttribute("data-name"),
      emoji: selectedOption.getAttribute("data-emoji"),
    });
  };

  useEffect(() => {
    const storage = getStorage(app);
    const upload = () => {
      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {},
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload();
  }, [file]);

  const handleSave = async () => {
    try {
      const response = await axios.post("/api/blog", {
        title,
        content,
        media,
        category,
      });
      console.log("Post response", response.data);
      router.push(`/blog/${response.data.id}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="container mx-auto my-8 py-10  p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Editor Page
          </h1>
          {/* Title Input */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-gray-700 font-semibold mb-2"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              placeholder="Enter the title of your post"
            />
          </div>

          <div className="mb-4">
            <input
              type="file"
              name="name"
              id="image"
              onChange={(e) => setFile(e.target.files[0])}
              style={{
                display: "none",
              }}
            />

            <button>
              <label htmlFor="image">
                <Image
                  src={"/external.png"}
                  alt="image"
                  width={24}
                  height={24}
                />
              </label>
            </button>

            <div>
              {media == "" ? (
                <div>Add a cover image</div>
              ) : (
                <div>
                  <Image src={media} alt="Image" width={750} height={500} />
                </div>
              )}
            </div>
          </div>

          {/* Category Selector */}
          <div className="mb-4">
            <label
              htmlFor="category"
              className="block text-gray-700 font-semibold mb-2"
            >
              Category
            </label>
            <select
              id="category"
              value={category.name}
              onChange={handleCategoryChange}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            >
              <option disabled value="">
                Select a Category
              </option>
              {categories.map((cat) => (
                <option
                  key={cat.name}
                  value={cat.name}
                  data-name={cat.name}
                  data-emoji={cat.emoji}
                  data-id={cat.id}
                >
                  {cat.emoji}
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <ReactQuill
            value={content}
            onChange={setContent}
            theme="bubble"
            modules={modules}
          />
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={handleSave}
        >
          Save
        </motion.button>
      </div>
    </div>
  );
};

export default Editor;
