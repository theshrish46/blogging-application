// app/admin/Modal.js

import React from "react";

const Modal = ({ open, onClose, onChange, onSubmit }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm mx-auto">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          Enter Admin Key
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter admin key"
            className="border p-2 rounded"
            onChange={(e) => onChange(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
        <button onClick={onClose} className="mt-4 text-red-500">
          Close
        </button>
      </div>
    </div>
  );
};

export default Modal;
