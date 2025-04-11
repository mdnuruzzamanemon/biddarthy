"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import logo from "../../app/client/images/logo.svg";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Check if current path matches the nav item path
  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
  };

  useEffect(() => {
    // Handle click outside of menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Handle scroll event
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // In a real app, you would get this from your cart state
    // This is just for demonstration
    const getCartCount = () => {
      // Only run on client side
      if (typeof window !== "undefined") {
        const count = localStorage.getItem("cartCount");
        setCartCount(count ? parseInt(count) : 0);
      }
    };

    // Only add event listeners on client side
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll);
      getCartCount();
    }

    return () => {
      // Only remove event listeners on client side
      if (typeof window !== "undefined") {
        document.removeEventListener("mousedown", handleClickOutside);
        window.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: "Material", path: "/material" },
    { name: "Shop", path: "/shop" },
    { name: "Demos", path: "/demos" },
    { name: "Instructors", path: "/instructor" },
    { name: "About", path: "/about" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A192F]/95 backdrop-blur-sm shadow-lg py-2"
          : "bg-[#13284D] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src={logo}
                alt="Biddarthi Logo"
                width={100}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="flex items-center space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors relative group ${
                    isActive(item.path)
                      ? "text-[#f4bc45]"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f4bc45]"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#f4bc45] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                </Link>
              ))}
            </div>

            {/* Cart Icon */}
            <Link href="/cart">
              <div className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <FaShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f4bc45] text-[#0A192F] text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </div>
                )}
              </div>
            </Link>

            {/* Login Button */}
            <Link
              href="/login"
              className="ml-4 bg-[#f4bc45] text-[#13284D] px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors flex items-center"
            >
              <FaUser className="mr-2" />
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Cart Icon for Mobile */}
            <Link href="/cart">
              <div className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <FaShoppingCart className="text-lg" />
                {cartCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#f4bc45] text-[#0A192F] text-xs flex items-center justify-center font-bold">
                    {cartCount}
                  </div>
                )}
              </div>
            </Link>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0A192F] border-t border-gray-800"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? "bg-[#f4bc45]/10 text-[#f4bc45]"
                      : "text-gray-300 hover:bg-gray-800 hover:text-white"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/login"
                className="block w-full mt-4 bg-[#f4bc45] text-[#13284D] px-3 py-2 rounded-md text-base font-medium hover:bg-opacity-90 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
