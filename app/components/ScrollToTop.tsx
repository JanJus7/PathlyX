"use client";

import { FaArrowUp } from "react-icons/fa";
import { useScrollPosition } from "../hooks/useScrollPosition";

export default function ScrollToTop() {
  const scrollY = useScrollPosition();
  const showButton = scrollY > 300;

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!showButton) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300 z-50"
    >
      <FaArrowUp size={20} />
    </button>
  );
}