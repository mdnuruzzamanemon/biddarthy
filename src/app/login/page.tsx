"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  Phone,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

type LoginMethod = "email" | "phone";
type VerificationStatus = "pending" | "sent" | "verified" | "failed";

export default function LoginPage() {
  const router = useRouter();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>("email");
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    verification: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("pending");
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);
  const [rememberMe, setRememberMe] = useState(false);

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

    if (loginMethod === "email") {
      // Email validation
      if (!formData.email) {
        newErrors.email = "Email is required";
        valid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email is invalid";
        valid = false;
      } else {
        newErrors.email = "";
      }
    } else {
      // Phone validation
      if (!formData.phone) {
        newErrors.phone = "Phone number is required";
        valid = false;
      } else if (
        !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, ""))
      ) {
        newErrors.phone = "Phone number is invalid";
        valid = false;
      } else {
        newErrors.phone = "";
      }
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

    // Verification code validation
    if (verificationStatus !== "verified") {
      newErrors.verification = "Please verify your contact information";
      valid = false;
    } else {
      newErrors.verification = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = async () => {
    if (!validateStep1()) return;

    // Send verification code
    await sendVerificationCode();
    setStep(2);
  };

  const sendVerificationCode = async () => {
    if (
      loginMethod === "email" &&
      (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
    ) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (
      loginMethod === "phone" &&
      (!formData.phone ||
        !/^\+?[0-9]{10,15}$/.test(formData.phone.replace(/\s+/g, "")))
    ) {
      toast.error("Please enter a valid phone number");
      return;
    }

    setVerifyLoading(true);

    try {
      // In a real app, you would call your API to send a verification code
      // For demo purposes, we'll simulate a successful API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setVerificationStatus("sent");
      toast.success(`Verification code sent to your ${loginMethod}`);
    } catch (error) {
      toast.error("Failed to send verification code");
      setVerificationStatus("failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const verifyCode = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast.error("Please enter a valid 6-digit code");
      return;
    }

    setVerifyLoading(true);

    try {
      // In a real app, you would verify the code with your API
      // For demo purposes, we'll accept "123456" as valid
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (verificationCode === "123456") {
        setVerificationStatus("verified");
        toast.success("Verification successful");
      } else {
        toast.error("Invalid verification code");
      }
    } catch (error) {
      toast.error("Verification failed");
    } finally {
      setVerifyLoading(false);
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1) {
      handleNextStep();
      return;
    }

    if (!validateStep2()) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [loginMethod]:
            loginMethod === "email" ? formData.email : formData.phone,
          password: formData.password,
          rememberMe: rememberMe,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Success
      toast.success("Login successful!");
      router.push("/"); // Redirect to home page or dashboard
    } catch (error: any) {
      toast.error(error.message || "Login failed. Please try again.");
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
        className="w-full max-w-md"
      >
        <div className="bg-[#13284D] rounded-xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-gray-400 mt-2">
              Sign in to continue your learning journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {step === 1 ? (
              <>
                {/* Login Method Selector */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setLoginMethod("email")}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      loginMethod === "email"
                        ? "bg-[#f4bc45] text-[#13284D] font-medium"
                        : "bg-[#0A192F] text-gray-300 hover:bg-[#172F50]"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setLoginMethod("phone")}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      loginMethod === "phone"
                        ? "bg-[#f4bc45] text-[#13284D] font-medium"
                        : "bg-[#0A192F] text-gray-300 hover:bg-[#172F50]"
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </button>
                </div>

                {/* Email Field */}
                {loginMethod === "email" && (
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
                )}

                {/* Phone Field */}
                {loginMethod === "phone" && (
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
                        placeholder="+1234567890"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] bg-[#f4bc45] hover:bg-[#f4bc45]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors"
                >
                  {verifyLoading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </>
            ) : (
              <>
                {/* Verification Section */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#0A192F] border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 text-sm truncate max-w-[60%]">
                        {loginMethod === "email"
                          ? `Verify ${formData.email}`
                          : `Verify ${formData.phone}`}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                          verificationStatus === "verified"
                            ? "bg-green-900/30 text-green-400"
                            : verificationStatus === "sent"
                            ? "bg-yellow-900/30 text-yellow-400"
                            : verificationStatus === "failed"
                            ? "bg-red-900/30 text-red-400"
                            : "bg-gray-900/30 text-gray-400"
                        }`}
                      >
                        {verificationStatus === "verified"
                          ? "Verified"
                          : verificationStatus === "sent"
                          ? "Code Sent"
                          : verificationStatus === "failed"
                          ? "Failed"
                          : "Pending"}
                      </span>
                    </div>

                    {verificationStatus === "sent" && (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            maxLength={6}
                            value={verificationCode}
                            onChange={(e) =>
                              setVerificationCode(
                                e.target.value.replace(/\D/g, "")
                              )
                            }
                            placeholder="Enter 6-digit code"
                            className="w-full sm:flex-1 py-2 px-3 bg-[#13284D] border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors"
                          />
                          <button
                            type="button"
                            onClick={verifyCode}
                            disabled={verifyLoading}
                            className="mt-2 sm:mt-0 py-2 px-3 rounded-lg bg-[#f4bc45] text-[#13284D] font-medium hover:bg-[#f4bc45]/90 transition-colors w-full sm:w-auto"
                          >
                            {verifyLoading ? (
                              <Loader2 className="animate-spin h-5 w-5 mx-auto" />
                            ) : (
                              "Verify"
                            )}
                          </button>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs gap-2">
                          <button
                            type="button"
                            onClick={sendVerificationCode}
                            disabled={verifyLoading}
                            className="text-[#f4bc45] hover:underline"
                          >
                            Resend Code
                          </button>
                          <span className="text-gray-400">
                            Use code 123456 for demo
                          </span>
                        </div>
                      </div>
                    )}

                    {verificationStatus === "verified" && (
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle2 className="h-5 w-5" />
                        <span>Verification successful</span>
                      </div>
                    )}

                    {(verificationStatus === "pending" ||
                      verificationStatus === "failed") && (
                      <button
                        type="button"
                        onClick={sendVerificationCode}
                        className="w-full flex justify-center items-center py-2 px-3 rounded-lg bg-[#13284D] text-[#f4bc45] border border-[#f4bc45] hover:bg-[#172F50] transition-colors text-sm"
                      >
                        {verifyLoading ? (
                          <Loader2 className="animate-spin h-4 w-4" />
                        ) : (
                          "Send Verification Code"
                        )}
                      </button>
                    )}
                  </div>

                  {errors.verification && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.verification}</span>
                    </div>
                  )}
                </div>

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
                      autoComplete="current-password"
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

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="relative inline-flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        checked={rememberMe}
                        onChange={handleRememberMeChange}
                        className="h-4 w-4 opacity-0 absolute cursor-pointer"
                      />
                      <div
                        className={`bg-[#0A192F] border border-gray-600 rounded w-4 h-4 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-[#f4bc45] ${
                          rememberMe ? "border-[#f4bc45]" : ""
                        }`}
                      >
                        <svg
                          className={`fill-current w-3 h-3 text-[#f4bc45] pointer-events-none ${
                            rememberMe ? "block" : "hidden"
                          }`}
                          version="1.1"
                          viewBox="0 0 17 12"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g fill="none" fillRule="evenodd">
                            <g
                              transform="translate(-9 -11)"
                              fill="#f4bc45"
                              fillRule="nonzero"
                            >
                              <path d="m25.576 11.414c0.56558 0.55188 0.56558 1.4439 0 1.9961l-9.404 9.176c-0.28213 0.27529-0.65247 0.41385-1.0228 0.41385-0.37034 0-0.74068-0.13855-1.0228-0.41385l-4.7019-4.588c-0.56584-0.55188-0.56584-1.4442 0-1.9961 0.56558-0.55214 1.4798-0.55214 2.0456 0l3.679 3.5899 8.3812-8.1779c0.56558-0.55214 1.4798-0.55214 2.0456 0z" />
                            </g>
                          </g>
                        </svg>
                      </div>
                      <label
                        htmlFor="remember-me"
                        className="text-sm text-gray-300 select-none cursor-pointer"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>

                  <div className="text-sm">
                    <Link
                      href="/forgot-password"
                      className="text-[#f4bc45] hover:text-[#f4bc45]/80 transition-colors"
                    >
                      Forgot password?
                    </Link>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || verificationStatus !== "verified"}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] ${
                    verificationStatus === "verified"
                      ? "bg-[#f4bc45] hover:bg-[#f4bc45]/90"
                      : "bg-[#f4bc45]/50 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Sign In"
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full text-center text-sm text-gray-400 hover:text-[#f4bc45] transition-colors"
                >
                  Use a different login method
                </button>
              </>
            )}

            <div className="mt-6 text-center">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  href="/register"
                  className="text-[#f4bc45] hover:text-[#f4bc45]/80 font-medium"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
