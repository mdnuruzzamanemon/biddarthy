"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
  User,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type VerificationStatus = "pending" | "sent" | "verified" | "failed";

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailVerification, setEmailVerification] =
    useState<VerificationStatus>("pending");
  const [phoneVerification, setPhoneVerification] =
    useState<VerificationStatus>("pending");
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState({
    email: false,
    phone: false,
  });

  // Check if at least one verification is complete
  const isVerified =
    emailVerification === "verified" || phoneVerification === "verified";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep1 = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    } else {
      newErrors.name = "";
    }

    // Email validation
    if (!formData.email && !formData.phone) {
      newErrors.email = "Email or phone number is required";
      valid = false;
    } else if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    } else {
      newErrors.email = "";
    }

    // Phone validation
    if (
      formData.phone &&
      !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      newErrors.phone = "Phone number is invalid";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const validateStep2 = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.password = "";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    // Verification validation
    if (!isVerified) {
      toast.error("Please verify your email or phone number");
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const sendEmailVerification = async () => {
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    setVerifyLoading((prev) => ({ ...prev, email: true }));
    setEmailVerification("sent");

    try {
      // This would be your actual API call
      // const response = await fetch('/api/auth/send-email-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Verification code sent to your email");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
      setEmailVerification("failed");
    } finally {
      setVerifyLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const sendPhoneVerification = async () => {
    if (
      !formData.phone ||
      !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))
    ) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setVerifyLoading((prev) => ({ ...prev, phone: true }));
    setPhoneVerification("sent");

    try {
      // This would be your actual API call
      // const response = await fetch('/api/auth/send-phone-verification', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone: formData.phone }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success("Verification code sent to your phone");
    } catch (error: any) {
      toast.error(error.message || "Failed to send verification code");
      setPhoneVerification("failed");
    } finally {
      setVerifyLoading((prev) => ({ ...prev, phone: false }));
    }
  };

  const verifyEmailCode = async () => {
    if (!emailCode || emailCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setVerifyLoading((prev) => ({ ...prev, email: true }));

    try {
      // This would be your actual API call
      // const response = await fetch('/api/auth/verify-email-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formData.email, code: emailCode }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, let's say code "123456" is valid
      if (emailCode === "123456") {
        setEmailVerification("verified");
        toast.success("Email verified successfully");
      } else {
        toast.error("Invalid verification code");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify code");
    } finally {
      setVerifyLoading((prev) => ({ ...prev, email: false }));
    }
  };

  const verifyPhoneCode = async () => {
    if (!phoneCode || phoneCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setVerifyLoading((prev) => ({ ...prev, phone: true }));

    try {
      // This would be your actual API call
      // const response = await fetch('/api/auth/verify-phone-code', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ phone: formData.phone, code: phoneCode }),
      // });
      // const data = await response.json();
      // if (!response.ok) throw new Error(data.message);

      // Simulating API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, let's say code "123456" is valid
      if (phoneCode === "123456") {
        setPhoneVerification("verified");
        toast.success("Phone verified successfully");
      } else {
        toast.error("Invalid verification code");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to verify code");
    } finally {
      setVerifyLoading((prev) => ({ ...prev, phone: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep2()) return;

    setLoading(true);

    try {
      // This would be your actual API call
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          emailVerified: emailVerification === "verified",
          phoneVerified: phoneVerification === "verified",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      // Success
      toast.success("Registration successful! Please sign in.");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A192F] flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl"
      >
        <div className="bg-[#13284D] rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Create Account</h1>
            <p className="text-gray-400 mt-2">
              Join Biddarthi and start your learning journey
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1
                    ? "bg-[#f4bc45] text-[#13284D]"
                    : "bg-gray-700 text-gray-300"
                } font-medium`}
              >
                1
              </div>
              <div
                className={`w-16 h-1 ${
                  step >= 2 ? "bg-[#f4bc45]" : "bg-gray-700"
                }`}
              ></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2
                    ? "bg-[#f4bc45] text-[#13284D]"
                    : "bg-gray-700 text-gray-300"
                } font-medium`}
              >
                2
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {step === 1 ? (
              <>
                {/* Step 1: Personal Information */}
                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-medium text-gray-300"
                  >
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`block w-full pl-10 pr-3 py-3 bg-[#0A192F] border ${
                        errors.name ? "border-red-500" : "border-gray-600"
                      } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-300"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-[#0A192F] border ${
                          errors.email ? "border-red-500" : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="your.email@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-300"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        autoComplete="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-3 py-3 bg-[#0A192F] border ${
                          errors.phone ? "border-red-500" : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="+880 1XXX-XXXXXX"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] bg-[#f4bc45] hover:bg-[#f4bc45]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors"
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Verification and Password */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-white mb-2">
                    Verify Your Contact Information
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Please verify at least one contact method to continue
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email Verification */}
                  {formData.email && (
                    <div className="bg-[#0A192F] p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300 text-sm truncate max-w-[65%]">
                          Verify {formData.email}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            emailVerification === "verified"
                              ? "bg-green-900/30 text-green-400"
                              : emailVerification === "sent"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : emailVerification === "failed"
                              ? "bg-red-900/30 text-red-400"
                              : "bg-gray-900/30 text-gray-400"
                          }`}
                        >
                          {emailVerification === "verified"
                            ? "Verified"
                            : emailVerification === "sent"
                            ? "Code Sent"
                            : emailVerification === "failed"
                            ? "Failed"
                            : "Pending"}
                        </span>
                      </div>

                      {emailVerification === "pending" ? (
                        <button
                          type="button"
                          onClick={sendEmailVerification}
                          disabled={verifyLoading.email}
                          className="w-full flex justify-center items-center py-2 px-3 rounded-lg bg-[#13284D] text-[#f4bc45] border border-[#f4bc45] hover:bg-[#172F50] transition-colors text-sm"
                        >
                          {verifyLoading.email ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            "Send Verification Code"
                          )}
                        </button>
                      ) : emailVerification === "sent" ? (
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={emailCode}
                              onChange={(e) =>
                                setEmailCode(e.target.value.replace(/\D/g, ""))
                              }
                              placeholder="Enter 6-digit code"
                              className="flex-1 px-3 py-2 bg-[#13284D] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4bc45]"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={verifyEmailCode}
                              disabled={verifyLoading.email}
                              className="px-3 py-2 rounded-lg bg-[#f4bc45] text-[#13284D] font-medium hover:bg-opacity-90 transition-colors text-sm flex-shrink-0"
                            >
                              {verifyLoading.email ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <button
                              type="button"
                              onClick={sendEmailVerification}
                              disabled={verifyLoading.email}
                              className="text-[#f4bc45] hover:underline"
                            >
                              Resend Code
                            </button>
                            <span className="text-gray-400">
                              Use code 123456 for demo
                            </span>
                          </div>
                        </div>
                      ) : emailVerification === "verified" ? (
                        <div className="text-center py-2 text-green-400 text-sm">
                          Your email has been verified
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={sendEmailVerification}
                          className="w-full flex justify-center items-center py-2 px-3 rounded-lg bg-[#13284D] text-[#f4bc45] border border-[#f4bc45] hover:bg-[#172F50] transition-colors text-sm"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  )}

                  {/* Phone Verification */}
                  {formData.phone && (
                    <div className="bg-[#0A192F] p-4 rounded-lg border border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-gray-300 text-sm truncate max-w-[65%]">
                          Verify {formData.phone}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                            phoneVerification === "verified"
                              ? "bg-green-900/30 text-green-400"
                              : phoneVerification === "sent"
                              ? "bg-yellow-900/30 text-yellow-400"
                              : phoneVerification === "failed"
                              ? "bg-red-900/30 text-red-400"
                              : "bg-gray-900/30 text-gray-400"
                          }`}
                        >
                          {phoneVerification === "verified"
                            ? "Verified"
                            : phoneVerification === "sent"
                            ? "Code Sent"
                            : phoneVerification === "failed"
                            ? "Failed"
                            : "Pending"}
                        </span>
                      </div>

                      {phoneVerification === "pending" ? (
                        <button
                          type="button"
                          onClick={sendPhoneVerification}
                          disabled={verifyLoading.phone}
                          className="w-full flex justify-center items-center py-2 px-3 rounded-lg bg-[#13284D] text-[#f4bc45] border border-[#f4bc45] hover:bg-[#172F50] transition-colors text-sm"
                        >
                          {verifyLoading.phone ? (
                            <Loader2 className="animate-spin h-4 w-4" />
                          ) : (
                            "Send Verification Code"
                          )}
                        </button>
                      ) : phoneVerification === "sent" ? (
                        <div className="space-y-2">
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={phoneCode}
                              onChange={(e) => setPhoneCode(e.target.value)}
                              placeholder="Enter 6-digit code"
                              className="flex-1 px-3 py-2 bg-[#13284D] border border-gray-600 rounded-lg text-white text-sm focus:outline-none focus:border-[#f4bc45]"
                              maxLength={6}
                            />
                            <button
                              type="button"
                              onClick={verifyPhoneCode}
                              disabled={verifyLoading.phone}
                              className="px-3 py-2 rounded-lg bg-[#f4bc45] text-[#13284D] font-medium hover:bg-opacity-90 transition-colors text-sm"
                            >
                              {verifyLoading.phone ? (
                                <Loader2 className="animate-spin h-4 w-4" />
                              ) : (
                                "Verify"
                              )}
                            </button>
                          </div>
                          <div className="flex justify-between items-center text-xs">
                            <button
                              type="button"
                              onClick={sendPhoneVerification}
                              disabled={verifyLoading.phone}
                              className="text-[#f4bc45] hover:underline"
                            >
                              Resend Code
                            </button>
                            <span className="text-gray-400">
                              Use code 123456 for demo
                            </span>
                          </div>
                        </div>
                      ) : phoneVerification === "verified" ? (
                        <div className="text-center py-2 text-green-400 text-sm">
                          Your phone has been verified
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={sendPhoneVerification}
                          className="w-full flex justify-center items-center py-2 px-3 rounded-lg bg-[#13284D] text-[#f4bc45] border border-[#f4bc45] hover:bg-[#172F50] transition-colors text-sm"
                        >
                          Try Again
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Verification Status */}
                <div
                  className={`p-3 rounded-lg flex items-center ${
                    isVerified
                      ? "bg-green-900/20 text-green-400"
                      : "bg-yellow-900/20 text-yellow-400"
                  }`}
                >
                  {isVerified ? (
                    <CheckCircle2 className="h-5 w-5 mr-2" />
                  ) : (
                    <AlertCircle className="h-5 w-5 mr-2" />
                  )}
                  <span className="text-sm">
                    {isVerified
                      ? "Verification complete! You can now set your password."
                      : "Please verify at least one contact method to continue."}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm font-medium text-gray-300"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 bg-[#0A192F] border ${
                          errors.password ? "border-red-500" : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  {/* Confirm Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="confirmPassword"
                      className="text-sm font-medium text-gray-300"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 bg-[#0A192F] border ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading || !isVerified}
                    className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] ${
                      isVerified
                        ? "bg-[#f4bc45] hover:bg-[#f4bc45]/90"
                        : "bg-[#f4bc45]/50 cursor-not-allowed"
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors`}
                  >
                    {loading ? (
                      <Loader2 className="animate-spin h-5 w-5" />
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="text-[#f4bc45] hover:text-[#f4bc45]/80 font-medium"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
