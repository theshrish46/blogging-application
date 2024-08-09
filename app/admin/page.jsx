"use client";

// app/admin/page.js

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import AdminPage from "@/components/AdminPage";

const Admin = () => {
  const [open, setOpen] = useState(true);
  const [key, setKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  const handleClose = () => setOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const correctKey = process.env.NEXT_PUBLIC_ADMIN_KEY;

    console.log("Correct Key", correctKey);
    console.log("Key from user", key);
    // Your key from .env

    if (key === correctKey) {
      setAuthenticated(true);
      localStorage.setItem("adminKey", key); // Store the key for session persistence
    } else {
      router.push("/"); // Redirect to home page if the key is incorrect
    }
  };

  if (authenticated) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-6">
          Welcome to the Admin Page
        </h1>
        <AdminPage />
      </div>
    );
  }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      onChange={setKey}
      onSubmit={handleSubmit}
    />
  );
};

export default Admin;
