import React from "react";
import { motion } from "framer-motion";

const Modal = ({ open, onClose, onChange, onSubmit }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="bg-white p-6 rounded-xl shadow-lg max-w-md mx-auto"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Enter Admin Key
        </h2>
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            placeholder="Enter admin key"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            onChange={(e) => onChange(e.target.value)}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-all"
          >
            Submit
          </motion.button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-red-500 hover:text-red-600 transition-all"
        >
          Close
        </button>
      </motion.div>
    </div>
  );
};

export default Modal;
