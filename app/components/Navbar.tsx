"use function";
"use client";

import Link from "next/link";
import { FaCompass, FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";

function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scrollY;
}

interface NavbarProps {
  isAuthPage?: boolean;
}

export default function Navbar({ isAuthPage = false }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollY = useScrollPosition();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isPastHero =
    typeof window !== "undefined" && scrollY > window.innerHeight;

  return (
    <header
      className={`w-full p-4 transition-colors duration-300 z-50 ${
        isAuthPage
          ? "absolute top-0 left-0 bg-transparent text-white"
          : `fixed top-0 left-0 ${
              isPastHero
                ? "bg-white text-gray-600 shadow-md"
                : "bg-linear-to-r from-blue-800 via-purple-800 to-indigo-900 text-white"
            }`
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
        <Link
          href={isAuthPage ? "/" : "#hero"}
          className={`flex items-center gap-2 text-xl font-bold ${
            !isAuthPage && isPastHero ? "text-blue-600" : "text-white"
          }`}
        >
          <FaCompass className="size-6" />
          PathlyX
        </Link>

        {!isAuthPage && (
          <>
            <nav className="hidden md:flex space-x-8">
              <Link href="#about" className="hover:text-blue-600">About Us</Link>
              <Link href="#services" className="hover:text-blue-600">Services</Link>
              <Link href="#testimonials" className="hover:text-blue-600">Testimonials</Link>
              <Link href="#contact" className="hover:text-blue-600">Contact</Link>
            </nav>

            <div className="flex items-center justify-center md:hidden">
              <button
                onClick={toggleMenu}
                className="hover:text-blue-600 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
              </button>
            </div>
          </>
        )}
      </div>

      {!isAuthPage && isMenuOpen && (
        <nav className="bg-white md:hidden shadow-md flex flex-col">
          <Link href="#about" onClick={closeMenu} className="block px-4 py-3 text-gray-600 hover:text-blue-600 border-b border-gray-100">About Us</Link>
          <Link href="#services" onClick={closeMenu} className="block px-4 py-3 text-gray-600 hover:text-blue-600 border-b border-gray-100">Services</Link>
          <Link href="#testimonials" onClick={closeMenu} className="block px-4 py-3 text-gray-600 hover:text-blue-600 border-b border-gray-100">Testimonials</Link>
          <Link href="#contact" onClick={closeMenu} className="block px-4 py-3 text-gray-600 hover:text-blue-600">Contact</Link>
        </nav>
      )}
    </header>
  );
}