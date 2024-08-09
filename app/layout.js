import Navbar from "@/components/Navbar";
import "./globals.css";
import { Inter } from "next/font/google";
import AuthProvider from "@/providers/AuthProvider";
import "./custom-quill.css";
import "react-quill/dist/quill.bubble.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Blog App",
  description: "The best blog app!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <div>{children}</div>
          <ToastContainer
            position="bottom-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            draggable
          />
        </AuthProvider>
      </body>
    </html>
  );
}
