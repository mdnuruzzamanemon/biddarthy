"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaCheck, FaLock, FaMoneyBill } from "react-icons/fa";

// Sample cart data - in a real app, this would come from state management or localStorage
const cartItems = [
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

const CheckoutPage = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    orderNotes: "",
    paymentMethod: "bkash",
  });

  // Validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Order summary calculations
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const shipping = 60; // Standard shipping
  const discount = Math.round(subtotal * 0.1); // Sample 10% discount
  const total = subtotal + shipping - discount;

  // Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.postalCode.trim())
      newErrors.postalCode = "Postal code is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        setOrderComplete(true);

        // In a real app, you would submit the order to your backend here
        console.log("Order submitted:", {
          ...formData,
          items: cartItems,
          total,
        });
      }, 1500);
    }
  };

  // Format price in BDT
  const formatPrice = (price: number) => {
    return `৳${price.toLocaleString()}`;
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D] py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0A192F] rounded-xl border border-gray-800 p-8 text-center"
          >
            <div className="w-20 h-20 bg-[#f4bc45]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="text-[#f4bc45] text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-4">
              Order Confirmed!
            </h1>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Thank you for your purchase. Your order has been received and is
              being processed. You will receive a confirmation email shortly.
            </p>
            <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-4 mb-8 inline-block">
              <p className="text-gray-400">
                Order Reference:{" "}
                <span className="text-white font-medium">
                  BID-{Math.floor(100000 + Math.random() * 900000)}
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/shop">
                <button className="px-6 py-3 bg-[#0A192F] border border-[#f4bc45] text-[#f4bc45] rounded-lg hover:bg-[#f4bc45]/10 transition-colors">
                  Continue Shopping
                </button>
              </Link>
              <Link href="/account/orders">
                <button className="px-6 py-3 bg-[#f4bc45] text-[#0A192F] rounded-lg hover:bg-[#f4bc45]/90 transition-colors">
                  View Order Status
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A192F] to-[#13284D] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Checkout</h1>
          <Link
            href="/cart"
            className="inline-flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            <span>Back to Cart</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-[#0A192F] rounded-xl border border-gray-800 overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold text-white mb-6">
                  Shipping Information
                </h2>

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* First Name */}
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.lastName ? "border-red-500" : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.email ? "border-red-500" : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your email"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.phone ? "border-red-500" : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your phone number"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="mb-6">
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Address *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                        errors.address ? "border-red-500" : "border-gray-700"
                      } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                      placeholder="Enter your street address"
                    />
                    {errors.address && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    {/* City */}
                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        City *
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.city ? "border-red-500" : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your city"
                      />
                      {errors.city && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.city}
                        </p>
                      )}
                    </div>

                    {/* Postal Code */}
                    <div>
                      <label
                        htmlFor="postalCode"
                        className="block text-sm font-medium text-gray-400 mb-2"
                      >
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 bg-[#0A192F]/50 border ${
                          errors.postalCode
                            ? "border-red-500"
                            : "border-gray-700"
                        } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]`}
                        placeholder="Enter your postal code"
                      />
                      {errors.postalCode && (
                        <p className="mt-1 text-sm text-red-500">
                          {errors.postalCode}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Notes */}
                  <div className="mb-8">
                    <label
                      htmlFor="orderNotes"
                      className="block text-sm font-medium text-gray-400 mb-2"
                    >
                      Order Notes (Optional)
                    </label>
                    <textarea
                      id="orderNotes"
                      name="orderNotes"
                      value={formData.orderNotes}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-2 bg-[#0A192F]/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#f4bc45]"
                      placeholder="Add any special instructions or notes about your order here..."
                    ></textarea>
                  </div>

                  {/* Payment Methods */}
                  <div className="mb-8">
                    <h3 className="text-lg font-medium text-white mb-4">
                      Payment Method
                    </h3>

                    <div className="space-y-3">
                      <label className="flex items-center p-4 border border-gray-800 rounded-lg cursor-pointer hover:border-[#f4bc45]/30 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="bkash"
                          checked={formData.paymentMethod === "bkash"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#f4bc45] focus:ring-[#f4bc45]/50 border-gray-700 bg-[#0A192F]"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div>
                            <span className="text-white font-medium">
                              bKash
                            </span>
                            <p className="text-sm text-gray-400">
                              Pay using bKash mobile banking
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-pink-600 rounded-md flex items-center justify-center text-white font-bold">
                            b
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-800 rounded-lg cursor-pointer hover:border-[#f4bc45]/30 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="nagad"
                          checked={formData.paymentMethod === "nagad"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#f4bc45] focus:ring-[#f4bc45]/50 border-gray-700 bg-[#0A192F]"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div>
                            <span className="text-white font-medium">
                              Nagad
                            </span>
                            <p className="text-sm text-gray-400">
                              Pay using Nagad mobile banking
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-orange-600 rounded-md flex items-center justify-center text-white font-bold">
                            N
                          </div>
                        </div>
                      </label>

                      <label className="flex items-center p-4 border border-gray-800 rounded-lg cursor-pointer hover:border-[#f4bc45]/30 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleChange}
                          className="h-4 w-4 text-[#f4bc45] focus:ring-[#f4bc45]/50 border-gray-700 bg-[#0A192F]"
                        />
                        <div className="ml-3 flex items-center justify-between w-full">
                          <div>
                            <span className="text-white font-medium">
                              Cash on Delivery
                            </span>
                            <p className="text-sm text-gray-400">
                              Pay when you receive your order
                            </p>
                          </div>
                          <div className="w-12 h-12 bg-green-600 rounded-md flex items-center justify-center text-white">
                            <FaMoneyBill />
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-8">
                    <Link href="/cart">
                      <button
                        type="button"
                        className="px-6 py-3 bg-[#0A192F] border border-gray-700 text-white rounded-lg hover:border-[#f4bc45]/30 transition-colors"
                      >
                        Back to Cart
                      </button>
                    </Link>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-8 py-3 bg-[#f4bc45] text-[#0A192F] font-medium rounded-lg flex items-center ${
                        isSubmitting
                          ? "opacity-70 cursor-not-allowed"
                          : "hover:bg-[#f4bc45]/90"
                      } transition-colors`}
                    >
                      {isSubmitting ? "Processing..." : "Place Order"}
                      {!isSubmitting && <FaLock className="ml-2 text-sm" />}
                    </button>
                  </div>
                </form>
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

                {/* Order Items */}
                <div className="mb-6">
                  <div className="max-h-80 overflow-y-auto scrollbar-hide pr-2">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-start py-3 first:pt-0 border-b border-gray-800 last:border-0"
                      >
                        <div className="w-16 h-16 bg-gray-900 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4 flex-grow">
                          <h4 className="text-sm font-medium text-white">
                            {item.name}
                          </h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-gray-400">
                              Qty: {item.quantity}
                            </span>
                            <span className="text-sm text-[#f4bc45]">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
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
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Discount</span>
                    <span className="text-green-500">
                      -{formatPrice(discount)}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-white">{formatPrice(shipping)}</span>
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

                {/* Secure Checkout Notice */}
                <div className="bg-[#0A192F]/50 border border-gray-800 rounded-lg p-4 flex items-center">
                  <FaLock className="text-[#f4bc45] mr-3" />
                  <p className="text-sm text-gray-300">
                    Your payment information is processed securely. We do not
                    store credit card details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

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

export default CheckoutPage;
