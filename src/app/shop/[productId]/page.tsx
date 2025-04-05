"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaMinus,
  FaPlus,
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
    longDescription:
      "This comprehensive Chemistry Master Guide is designed specifically for HSC and university admission test preparation. It covers all essential topics with detailed explanations, practice problems, and exam strategies. The guide includes color-coded sections for easy navigation, quick reference formula sheets, and solved examples for better understanding.",
    features: [
      "Complete coverage of HSC and admission test syllabus",
      "Step-by-step problem solving techniques",
      "Practice questions with detailed solutions",
      "Quick reference formula sheets",
      "Exam tips and strategies",
    ],
    specifications: {
      Pages: "450",
      Language: "Bengali & English",
      Author: "Milton Khandokar",
      Publisher: "Biddarthi Publications",
      Edition: "2023",
      ISBN: "BD-12345-67890",
    },
    stock: 45,
    relatedProducts: [3, 6, 7],
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
    longDescription:
      "Show your Biddarthi pride with this premium quality cotton t-shirt featuring an embroidered Biddarthi logo. Made from 100% combed cotton for maximum comfort and durability. The modern fit and soft fabric make it perfect for everyday wear or study sessions.",
    features: [
      "100% premium combed cotton",
      "Embroidered logo for durability",
      "Pre-shrunk fabric",
      "Comfortable modern fit",
      "Machine washable",
    ],
    specifications: {
      Material: "100% Cotton",
      Weight: "180 GSM",
      Sizes: "S, M, L, XL, XXL",
      Colors: "Navy Blue, Black",
      Care: "Machine wash cold, tumble dry low",
    },
    stock: 78,
    relatedProducts: [5, 8],
  },
  // ... other products would be defined here
];

// Sample review data
const reviewsData = [
  {
    id: 1,
    productId: 1,
    user: "Rahul Ahmed",
    avatar: "/images/avatars/user1.jpg",
    rating: 5,
    date: "2023-08-15",
    title: "Excellent resource for chemistry",
    comment:
      "This guide helped me score 95% in my HSC chemistry exam. The explanations are clear and the practice problems really prepare you for the test.",
    helpful: 24,
  },
  {
    id: 2,
    productId: 1,
    user: "Nusrat Jahan",
    avatar: "/images/avatars/user2.jpg",
    rating: 4,
    date: "2023-07-22",
    title: "Very helpful but could use more diagrams",
    comment:
      "The content is excellent and helped me understand difficult concepts. My only suggestion would be to include more visual diagrams for complex reactions.",
    helpful: 16,
  },
  {
    id: 3,
    productId: 1,
    user: "Karim Hossain",
    avatar: "/images/avatars/user3.jpg",
    rating: 5,
    date: "2023-09-05",
    title: "Best chemistry guide available",
    comment:
      "I tried several guides before this one, and this is by far the most comprehensive. The formula sheets alone are worth the price.",
    helpful: 31,
  },
  {
    id: 4,
    productId: 2,
    user: "Tasnim Akter",
    avatar: "/images/avatars/user4.jpg",
    rating: 5,
    date: "2023-08-30",
    title: "Great quality t-shirt",
    comment:
      "The fabric is really soft and comfortable. The logo looks great and hasn't faded after multiple washes. Highly recommend!",
    helpful: 12,
  },
  {
    id: 5,
    productId: 2,
    user: "Imran Khan",
    avatar: "/images/avatars/user5.jpg",
    rating: 4,
    date: "2023-09-10",
    title: "Good fit but runs slightly small",
    comment:
      "Nice quality shirt with good stitching. Just note that it runs a bit small, so consider ordering one size up if you prefer a looser fit.",
    helpful: 8,
  },
  // ... other reviews would be defined here
];

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [reviews, setReviews] = useState<any[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const [showToast, setShowToast] = useState(false);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Find the product based on the ID from the URL
    const id = Number(productId);
    const foundProduct = products.find((p) => p.id === id);

    if (foundProduct) {
      setProduct(foundProduct);

      // Get reviews for this product
      const productReviews = reviewsData.filter((r) => r.productId === id);
      setReviews(productReviews);

      // Get related products
      if (
        foundProduct.relatedProducts &&
        foundProduct.relatedProducts.length > 0
      ) {
        const related = products.filter((p) =>
          foundProduct.relatedProducts.includes(p.id)
        );
        setRelatedProducts(related);
      }
    } else {
      // Product not found, redirect to shop
      router.push("/shop");
    }
  }, [productId, router]);

  const incrementQuantity = () => {
    if (product && quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const addToCart = () => {
    // In a real app, this would update your cart state or localStorage
    setCartCount((prev) => prev + quantity);

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
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  // Calculate average rating
  const calculateAverageRating = () => {
    if (!reviews.length) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return (sum / reviews.length).toFixed(1);
  };

  // Rating distribution
  const getRatingDistribution = () => {
    const distribution = [0, 0, 0, 0, 0]; // 5, 4, 3, 2, 1 stars

    reviews.forEach((review) => {
      distribution[5 - review.rating]++;
    });

    return distribution;
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#f4bc45]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center text-sm text-gray-400">
          <Link href="/shop" className="hover:text-[#f4bc45] transition-colors">
            Shop
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/shop?category=${product.category}`}
            className="hover:text-[#f4bc45] transition-colors"
          >
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-300">{product.name}</span>
        </div>
      </div>

      {/* Back button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors"
        >
          <FaArrowLeft className="mr-2" />
          <span>Back to Shop</span>
        </button>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="bg-[#0A192F] rounded-xl overflow-hidden border border-gray-800 shadow-lg aspect-square relative">
              {product.badge && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 text-sm font-medium rounded-full bg-[#f4bc45] text-[#0A192F]">
                  {product.badge}
                </div>
              )}
              <Image
                src={product.image}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={`${
                      i < Math.floor(product.rating)
                        ? "text-[#f4bc45]"
                        : "text-gray-600"
                    } ${
                      i === Math.floor(product.rating) && product.rating % 1 > 0
                        ? "text-gradient"
                        : ""
                    } text-lg mr-1`}
                  />
                ))}
              </div>
              <span className="ml-2 text-white font-medium">
                {product.rating}
              </span>
              <span className="mx-2 text-gray-500">•</span>
              <span className="text-gray-400">{product.reviews} reviews</span>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-white">
                  ৳{product.discountPrice}
                </span>
                {product.discountPrice < product.price && (
                  <>
                    <span className="ml-3 text-xl text-gray-500 line-through">
                      ৳{product.price}
                    </span>
                    <span className="ml-3 px-2 py-1 text-xs font-medium bg-green-500/10 text-green-500 rounded">
                      {Math.round(
                        ((product.price - product.discountPrice) /
                          product.price) *
                          100
                      )}
                      % OFF
                    </span>
                  </>
                )}
              </div>
              <p className="text-green-500 text-sm mt-2">
                In Stock ({product.stock} available)
              </p>
            </div>

            {/* Short Description */}
            <p className="text-gray-300 mb-8">{product.description}</p>

            {/* Quantity Selector */}
            <div className="flex items-center mb-8">
              <span className="text-gray-400 mr-4">Quantity:</span>
              <div className="flex items-center border border-gray-700 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  disabled={quantity <= 1}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <FaMinus size={12} />
                </button>
                <span className="w-12 text-center text-white">{quantity}</span>
                <button
                  onClick={incrementQuantity}
                  disabled={product && quantity >= product.stock}
                  className="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-50"
                >
                  <FaPlus size={12} />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={addToCart}
                className="flex-1 bg-[#f4bc45] hover:bg-[#f4bc45]/90 text-[#0A192F] font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <FaShoppingCart className="mr-2" />
                Add to Cart
              </button>
              <button
                onClick={toggleWishlist}
                className={`flex items-center justify-center py-3 px-6 rounded-lg border transition-colors ${
                  isWishlisted
                    ? "bg-red-500/10 border-red-500/30 text-red-500"
                    : "border-gray-700 text-gray-300 hover:border-[#f4bc45]/30 hover:text-[#f4bc45]"
                }`}
              >
                <FaHeart className="mr-2" />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </button>
            </div>

            {/* Specifications Preview */}
            <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-4 mb-6">
              <h3 className="text-white font-medium mb-3">
                Quick Specifications
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
                {Object.entries(product.specifications)
                  .slice(0, 4)
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-400">{key}:</span>
                      <span className="text-white">{value as string}</span>
                    </div>
                  ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-800 mb-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm whitespace-nowrap transition-colors ${
                    activeTab === tab
                      ? "text-[#f4bc45] border-b-2 border-[#f4bc45]"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-16">
            {/* Description Tab */}
            {activeTab === "description" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <p className="text-gray-300 leading-relaxed">
                  {product.longDescription}
                </p>

                <h3 className="text-xl font-medium text-white mt-8 mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#f4bc45] mr-2">•</span>
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specifications" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <tbody>
                      {Object.entries(product.specifications).map(
                        ([key, value], index) => (
                          <tr
                            key={key}
                            className={index % 2 === 0 ? "bg-[#0A192F]/30" : ""}
                          >
                            <td className="py-3 px-4 text-gray-400 font-medium w-1/3">
                              {key}
                            </td>
                            <td className="py-3 px-4 text-white">
                              {value as string}
                            </td>
                          </tr>
                        )
                      )}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Rating Summary */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                  {/* Average Rating */}
                  <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-6 flex flex-col items-center justify-center">
                    <div className="text-5xl font-bold text-white mb-2">
                      {calculateAverageRating()}
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`${
                            i < Math.floor(Number(calculateAverageRating()))
                              ? "text-[#f4bc45]"
                              : "text-gray-600"
                          } text-lg mx-0.5`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-400 text-sm">
                      {reviews.length} reviews
                    </p>
                  </div>

                  {/* Rating Distribution */}
                  <div className="md:col-span-2 bg-[#0A192F]/50 border border-gray-800 rounded-lg p-6">
                    <h3 className="text-white font-medium mb-4">
                      Rating Distribution
                    </h3>
                    {getRatingDistribution().map((count, index) => {
                      const starNumber = 5 - index;
                      const percentage = reviews.length
                        ? Math.round((count / reviews.length) * 100)
                        : 0;

                      return (
                        <div
                          key={starNumber}
                          className="flex items-center mb-2"
                        >
                          <div className="flex items-center w-16">
                            <span className="text-gray-400 mr-1">
                              {starNumber}
                            </span>
                            <FaStar className="text-[#f4bc45] text-xs" />
                          </div>
                          <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden mx-3">
                            <div
                              className="h-full bg-[#f4bc45]"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="w-12 text-right text-gray-400 text-sm">
                            {count}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Reviews List */}
                <div className="space-y-6">
                  <h3 className="text-xl font-medium text-white mb-6">
                    Customer Reviews
                  </h3>

                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-6"
                        >
                          <div className="flex items-start">
                            <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-gray-800">
                              <Image
                                src={review.avatar}
                                alt={review.user}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-white font-medium">
                                {review.user}
                              </h4>
                              <div className="flex items-center mt-1 mb-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <FaStar
                                      key={i}
                                      className={`${
                                        i < review.rating
                                          ? "text-[#f4bc45]"
                                          : "text-gray-600"
                                      } text-sm mr-0.5`}
                                    />
                                  ))}
                                </div>
                                <span className="text-gray-400 text-xs ml-2">
                                  {new Date(review.date).toLocaleDateString(
                                    "en-US",
                                    {
                                      year: "numeric",
                                      month: "short",
                                      day: "numeric",
                                    }
                                  )}
                                </span>
                              </div>
                              <h5 className="text-white font-medium mb-2">
                                {review.title}
                              </h5>
                              <p className="text-gray-300 text-sm mb-3">
                                {review.comment}
                              </p>
                              <div className="flex items-center text-xs text-gray-400">
                                <button className="flex items-center hover:text-[#f4bc45] transition-colors">
                                  <span className="mr-1">{review.helpful}</span>{" "}
                                  people found this helpful
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-[#0A192F]/30 border border-gray-800 rounded-lg">
                      <p className="text-gray-400">
                        No reviews yet. Be the first to review this product!
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-white mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <motion.div
                  key={relatedProduct.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="group bg-[#0A192F] rounded-xl overflow-hidden border border-gray-800 hover:border-[#f4bc45]/30 transition-all hover:shadow-[0_0_15px_rgba(244,188,69,0.15)]"
                >
                  <Link href={`/shop/${relatedProduct.id}`}>
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      {relatedProduct.badge && (
                        <div className="absolute top-3 left-3 px-2 py-1 text-xs font-medium rounded bg-[#f4bc45] text-[#0A192F]">
                          {relatedProduct.badge}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-white font-medium group-hover:text-[#f4bc45] transition-colors">
                        {relatedProduct.name}
                      </h3>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center">
                          <span className="text-white font-bold">
                            ৳{relatedProduct.discountPrice}
                          </span>
                          {relatedProduct.discountPrice <
                            relatedProduct.price && (
                            <span className="ml-2 text-sm text-gray-500 line-through">
                              ৳{relatedProduct.price}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center text-[#f4bc45]">
                          <FaStar className="text-xs mr-1" />
                          <span className="text-sm">
                            {relatedProduct.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
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
        {showToast && (
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
              <p className="text-sm text-gray-400">
                {product.name} × {quantity}
              </p>
            </div>
            <Link href="/cart">
              <button className="ml-4 px-3 py-1 bg-[#f4bc45] text-[#0A192F] text-sm font-medium rounded hover:bg-[#f4bc45]/90 transition-colors">
                View Cart
              </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CSS for custom scrollbar and star gradient */}
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .text-gradient {
          background: linear-gradient(90deg, #f4bc45 50%, #4a4a4a 50%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailPage;
