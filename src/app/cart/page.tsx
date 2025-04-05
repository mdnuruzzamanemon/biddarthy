"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FaArrowLeft,
  FaArrowRight,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaTrash,
} from "react-icons/fa";

// Sample cart data - in a real app, this would come from state management or localStorage
const initialCartItems = [
  {
    id: 1,
    name: "Chemistry Master Guide",
    price: 380,
    image: "/images/shop/chemistry-book.jpg",
    quantity: 2,
  },
  {
    id: 5,
    name: "Biddarthi Hoodie",
    price: 950,
    image: "/images/shop/hoodie.jpg",
    quantity: 1,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");
  const [shippingMethod, setShippingMethod] = useState("standard");

  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate shipping cost
  const getShippingCost = () => {
    if (shippingMethod === "express") return 120;
    if (shippingMethod === "standard") return 60;
    return 0;
  };

  // Calculate total
  const total = subtotal - discount + getShippingCost();

  // Update item quantity
  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Remove item from cart
  const removeItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Apply coupon code
  const applyCoupon = () => {
    setCouponError("");
    setCouponSuccess("");

    // Sample coupon logic - in a real app, this would validate against a database
    if (couponCode.toUpperCase() === "BIDDARTHI10") {
      const discountAmount = Math.round(subtotal * 0.1); // 10% discount
      setDiscount(discountAmount);
      setCouponSuccess("10% discount applied successfully!");
    } else if (couponCode.toUpperCase() === "WELCOME20") {
      const discountAmount = Math.round(subtotal * 0.2); // 20% discount
      setDiscount(discountAmount);
      setCouponSuccess("20% discount applied successfully!");
    } else {
      setDiscount(0);
      setCouponError("Invalid coupon code");
    }
  };

  // Format price in BDT
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Your Cart</h1>
          <Link
            href="/shop"
            className="inline-flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Continue Shopping</span>
          </Link>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-[#0A192F] rounded-xl border border-gray-800 overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Cart Items ({cartItems.length})
                  </h2>

                  <div className="divide-y divide-gray-800">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="py-6 first:pt-0 last:pb-0"
                      >
                        <div className="flex flex-col sm:flex-row items-start sm:items-center">
                          {/* Product Image */}
                          <div className="w-24 h-24 bg-gray-900 rounded-lg overflow-hidden flex-shrink-0 mb-4 sm:mb-0">
                            <Image
                              src={item.image}
                              alt={item.name}
                              width={96}
                              height={96}
                              className="w-full h-full object-cover"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="sm:ml-6 flex-grow">
                            <h3 className="text-lg font-medium text-white mb-1">
                              {item.name}
                            </h3>
                            <p className="text-[#f4bc45] font-medium">
                              {formatPrice(item.price)}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="mt-4 sm:mt-0 flex items-center">
                            <div className="flex items-center border border-gray-700 rounded-lg mr-4">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity - 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <FaMinus size={10} />
                              </button>
                              <span className="w-8 text-center text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, item.quantity + 1)
                                }
                                className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white"
                              >
                                <FaPlus size={10} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                              aria-label="Remove item"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-[#0A192F] rounded-xl border border-gray-800 overflow-hidden sticky top-6">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-white mb-6">
                    Order Summary
                  </h2>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <label
                      htmlFor="coupon"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Coupon Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="coupon"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Enter coupon code"
                        className="flex-grow px-4 py-2 bg-[#0A192F]/50 border border-gray-700 rounded-l-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]"
                      />
                      <button
                        onClick={applyCoupon}
                        className="px-4 py-2 bg-[#f4bc45]/10 text-[#f4bc45] border border-[#f4bc45]/30 rounded-r-lg hover:bg-[#f4bc45]/20 transition-colors"
                      >
                        Apply
                      </button>
                    </div>
                    {couponError && (
                      <p className="mt-2 text-sm text-red-500">{couponError}</p>
                    )}
                    {couponSuccess && (
                      <p className="mt-2 text-sm text-green-500">
                        {couponSuccess}
                      </p>
                    )}
                  </div>

                  {/* Shipping Method */}
                  <div className="mb-6">
                    <h3 className="text-sm font-medium text-gray-400 mb-3">
                      Shipping Method
                    </h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value="standard"
                          checked={shippingMethod === "standard"}
                          onChange={() => setShippingMethod("standard")}
                          className="h-4 w-4 text-[#f4bc45] focus:ring-[#f4bc45]/50 border-gray-700 bg-[#0A192F]"
                        />
                        <span className="ml-3 flex justify-between w-full">
                          <span className="text-white">Standard Delivery</span>
                          <span className="text-gray-400">৳60</span>
                        </span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="shipping"
                          value="express"
                          checked={shippingMethod === "express"}
                          onChange={() => setShippingMethod("express")}
                          className="h-4 w-4 text-[#f4bc45] focus:ring-[#f4bc45]/50 border-gray-700 bg-[#0A192F]"
                        />
                        <span className="ml-3 flex justify-between w-full">
                          <span className="text-white">Express Delivery</span>
                          <span className="text-gray-400">৳120</span>
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Price Summary */}
                  <div className="border-t border-gray-800 pt-4 mb-6">
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="text-white font-medium">
                        {formatPrice(subtotal)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between py-2">
                        <span className="text-gray-400">Discount</span>
                        <span className="text-green-500">
                          -{formatPrice(discount)}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between py-2">
                      <span className="text-gray-400">Shipping</span>
                      <span className="text-white">
                        {formatPrice(getShippingCost())}
                      </span>
                    </div>
                    <div className="flex justify-between py-3 border-t border-gray-800 mt-2">
                      <span className="text-lg text-white font-medium">
                        Total
                      </span>
                      <span className="text-lg text-[#f4bc45] font-bold">
                        {formatPrice(total)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link href="/checkout">
                    <button className="w-full bg-[#f4bc45] hover:bg-[#f4bc45]/90 text-[#0A192F] font-medium py-3 px-6 rounded-lg flex items-center justify-center transition-colors">
                      Proceed to Checkout
                      <FaArrowRight className="ml-2" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#0A192F] rounded-xl border border-gray-800 p-12 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#0A192F]/50 border border-gray-700 mb-6">
              <FaShoppingCart className="text-3xl text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-white mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. Browse
              our collection to find something you'll love!
            </p>
            <Link href="/shop">
              <button className="bg-[#f4bc45] hover:bg-[#f4bc45]/90 text-[#0A192F] font-medium py-3 px-8 rounded-lg transition-colors">
                Browse Products
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
