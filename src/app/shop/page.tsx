"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  FaFilter,
  FaHeart,
  FaSearch,
  FaShoppingCart,
  FaStar,
} from "react-icons/fa";

// Sample product data - in a real app, this would come from an API or database
const products = [
  {
    id: 1,
    name: "Chemistry Master Guide",
    category: "books",
    price: 450,
    discountPrice: 380,
    rating: 4.8,
    reviews: 124,
    image: "/images/shop/chemistry-book.jpg",
    badge: "Bestseller",
    description:
      "Comprehensive guide for HSC and admission chemistry preparation",
  },
  {
    id: 2,
    name: "Biddarthi Logo T-shirt",
    category: "apparel",
    price: 650,
    discountPrice: 550,
    rating: 4.5,
    reviews: 87,
    image: "/images/shop/tshirt.jpg",
    badge: "New",
    description: "Premium cotton t-shirt with embroidered Biddarthi logo",
  },
  {
    id: 3,
    name: "Physics Formula Handbook",
    category: "books",
    price: 320,
    discountPrice: 280,
    rating: 4.7,
    reviews: 93,
    image: "/images/shop/physics-book.jpg",
    badge: null,
    description: "Complete collection of physics formulas for quick reference",
  },
  {
    id: 4,
    name: "Study Planner 2023",
    category: "stationery",
    price: 220,
    discountPrice: 180,
    rating: 4.6,
    reviews: 56,
    image: "/images/shop/planner.jpg",
    badge: "Limited",
    description: "Structured daily planner designed for students",
  },
  {
    id: 5,
    name: "Biddarthi Hoodie",
    category: "apparel",
    price: 1200,
    discountPrice: 950,
    rating: 4.9,
    reviews: 42,
    image: "/images/shop/hoodie.jpg",
    badge: "New",
    description: "Warm and comfortable hoodie with Biddarthi design",
  },
  {
    id: 6,
    name: "Math Problem Solving Guide",
    category: "books",
    price: 380,
    discountPrice: 320,
    rating: 4.7,
    reviews: 78,
    image: "/images/shop/math-book.jpg",
    badge: null,
    description: "Advanced techniques for solving complex math problems",
  },
  {
    id: 7,
    name: "Scientific Calculator",
    category: "tools",
    price: 1500,
    discountPrice: 1350,
    rating: 4.8,
    reviews: 112,
    image: "/images/shop/calculator.jpg",
    badge: null,
    description: "Professional calculator for science and engineering students",
  },
  {
    id: 8,
    name: "Biddarthi Notebook Set",
    category: "stationery",
    price: 280,
    discountPrice: 240,
    rating: 4.6,
    reviews: 64,
    image: "/images/shop/notebook.jpg",
    badge: "Value Pack",
    description: "Set of 3 premium notebooks with subject dividers",
  },
];

// Categories for filtering
const categories = [
  { id: "all", name: "All Products" },
  { id: "books", name: "Books & Guides" },
  { id: "apparel", name: "Apparel" },
  { id: "stationery", name: "Stationery" },
  { id: "tools", name: "Study Tools" },
];

const ShopPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [cartCount, setCartCount] = useState(0);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastProduct, setToastProduct] = useState<{
    name: string;
    id: number;
  } | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const shopRef = useRef<HTMLDivElement>(null);

  // Filter products based on category and search query
  useEffect(() => {
    let filtered = products;

    // Apply category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, searchQuery]);

  // Add to cart function
  const addToCart = (productId: number) => {
    setCartCount((prev) => prev + 1);

    // Find the product for the toast
    const product = products.find((p) => p.id === productId);
    if (product) {
      setToastProduct({
        name: product.name,
        id: product.id,
      });

      // Show toast notification
      setShowToast(true);

      // Clear any existing timeout
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current);
      }

      // Hide toast after 3 seconds
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  // Toggle wishlist function
  const toggleWishlist = (productId: number) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  // Calculate discount percentage
  const calculateDiscount = (price: number, discountPrice: number) => {
    return Math.round(((price - discountPrice) / price) * 100);
  };

  return (
    <div
      ref={shopRef}
      className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D]"
    >
      {/* Hero Banner */}
      <div className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-[#0A192F]">
          <div className="absolute inset-0 bg-[url('/images/shop/pattern.png')] opacity-10"></div>
        </div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Biddarthi <span className="text-[#f4bc45]">Shop</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl"
          >
            Quality learning materials and merchandise to support your academic
            journey
          </motion.p>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="w-full h-16 md:h-24"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
              fill="#13284D"
            ></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          {/* Search */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-[#0A192F]/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#f4bc45]/50"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
            <div className="flex items-center text-gray-400 mr-2">
              <FaFilter className="mr-2" />
              <span>Filter:</span>
            </div>

            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? "bg-[#f4bc45] text-[#0A192F] font-medium"
                    : "bg-[#0A192F]/50 text-gray-300 border border-gray-700 hover:border-[#f4bc45]/50"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="group bg-[#0A192F] rounded-xl overflow-hidden border border-gray-800 hover:border-[#f4bc45]/30 transition-all hover:shadow-[0_0_15px_rgba(244,188,69,0.15)] relative"
              >
                {/* Wishlist Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-sm transition-all hover:bg-black/50"
                >
                  <FaHeart
                    className={`text-sm ${
                      wishlist.includes(product.id)
                        ? "text-red-500"
                        : "text-white"
                    }`}
                  />
                </button>

                {/* Product Badge */}
                {product.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2 py-1 text-xs font-medium rounded bg-[#f4bc45] text-[#0A192F]">
                    {product.badge}
                  </div>
                )}

                {/* Clickable area that navigates to product detail */}
                <Link href={`/shop/${product.id}`} className="block">
                  {/* Product Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-900">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-full h-full bg-gradient-to-t from-[#0A192F] to-transparent absolute bottom-0 opacity-50"></div>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <div className="flex items-center mb-2">
                      <div className="flex items-center text-[#f4bc45]">
                        <FaStar className="text-xs" />
                        <span className="ml-1 text-sm font-medium">
                          {product.rating}
                        </span>
                      </div>
                      <span className="mx-2 text-gray-500">•</span>
                      <span className="text-xs text-gray-400">
                        {product.reviews} reviews
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#f4bc45] transition-colors">
                      {product.name}
                    </h3>

                    <p className="text-sm text-gray-400 mb-4 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="text-lg font-bold text-white">
                          ৳{product.discountPrice}
                        </span>
                        {product.discountPrice < product.price && (
                          <>
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ৳{product.price}
                            </span>
                            <span className="ml-2 text-xs font-medium text-green-500">
                              {calculateDiscount(
                                product.price,
                                product.discountPrice
                              )}
                              % off
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>

                {/* Add to cart button - outside the Link to prevent navigation when clicked */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  className="absolute bottom-5 right-5 w-10 h-10 rounded-full bg-[#f4bc45]/10 hover:bg-[#f4bc45] text-[#f4bc45] hover:text-[#0A192F] flex items-center justify-center transition-colors"
                >
                  <FaShoppingCart />
                </button>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-4xl text-gray-600 mb-4">😕</div>
            <h3 className="text-xl font-medium text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter to find what you&apos;re
              looking for.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
              }}
              className="mt-4 px-4 py-2 bg-[#f4bc45] text-[#0A192F] rounded-lg font-medium"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* Floating Cart Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link href="/cart">
          <div className="relative w-14 h-14 rounded-full bg-[#f4bc45] text-[#0A192F] flex items-center justify-center shadow-lg hover:bg-[#f4bc45]/90 transition-colors">
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white text-xs flex items-center justify-center font-bold">
                {cartCount}
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && toastProduct && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-24 right-6 z-50 bg-[#0A192F] border border-[#f4bc45]/30 rounded-lg shadow-lg p-4 flex items-center"
          >
            <div className="bg-[#f4bc45]/10 rounded-full p-2 mr-3">
              <FaShoppingCart className="text-[#f4bc45]" />
            </div>
            <div>
              <p className="text-white font-medium">Added to cart!</p>
              <p className="text-sm text-gray-400">{toastProduct.name} × 1</p>
            </div>
            <Link href="/cart">
              <button className="ml-4 px-3 py-1 bg-[#f4bc45] text-[#0A192F] text-sm font-medium rounded hover:bg-[#f4bc45]/90 transition-colors">
                View Cart
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for custom scrollbar */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ShopPage;
