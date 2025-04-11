"use client";

import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
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

type ResetMethod = "email" | "phone";
type VerificationStatus = "pending" | "sent" | "verified" | "failed";
type ResetStep = 1 | 2 | 3;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [resetMethod, setResetMethod] = useState<ResetMethod>("email");
  const [step, setStep] = useState<ResetStep>(1);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    newPassword: "",
    confirmPassword: "",
    verification: "",
  });
  const [verificationStatus, setVerificationStatus] =
    useState<VerificationStatus>("pending");
  const [verificationCode, setVerificationCode] = useState("");
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (resetMethod === "email") {
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

  const validateStep3 = () => {
    let valid = true;
    const newErrors = { ...errors };

    // Password validation
    if (!formData.newPassword) {
      newErrors.newPassword = "Password is required";
      valid = false;
    } else if (formData.newPassword.length < 6) {
      newErrors.newPassword = "Password must be at least 6 characters";
      valid = false;
    } else {
      newErrors.newPassword = "";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      valid = false;
    } else if (formData.confirmPassword !== formData.newPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!validateStep1()) return;
      await sendVerificationCode();
      setStep(2);
    } else if (step === 2) {
      if (verificationStatus !== "verified") {
        setErrors((prev) => ({
          ...prev,
          verification: "Please verify your contact information",
        }));
        return;
      }
      setStep(3);
    }
  };

  const sendVerificationCode = async () => {
    if (
      resetMethod === "email" &&
      (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
    ) {
      toast.error("Please enter a valid email address");
      return;
    }

    if (
      resetMethod === "phone" &&
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
      toast.success(`Verification code sent to your ${resetMethod}`);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (step === 1 || step === 2) {
      handleNextStep();
      return;
    }

    if (!validateStep3()) return;

    setLoading(true);

    try {
      // In a real app, you would call your API to reset the password
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          [resetMethod]:
            resetMethod === "email" ? formData.email : formData.phone,
          newPassword: formData.newPassword,
          verificationCode: verificationCode,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Password reset failed");
      }

      // Success
      toast.success(
        "Password reset successful! Please sign in with your new password."
      );
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message || "Password reset failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071527] py-2 sm:py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8"
      >
        <div className="bg-[#0F2A4A] rounded-xl shadow-xl overflow-hidden p-6 sm:p-8 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Reset Password</h2>
            <p className="mt-2 text-sm text-gray-400">
              {step === 1
                ? "Enter your email or phone to reset your password"
                : step === 2
                ? "Verify your identity"
                : "Create a new password"}
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                {/* Reset Method Selector */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <button
                    type="button"
                    onClick={() => setResetMethod("email")}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      resetMethod === "email"
                        ? "bg-[#f4bc45] text-[#13284D] font-medium"
                        : "bg-[#0A192F] text-gray-300 hover:bg-[#172F50]"
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    onClick={() => setResetMethod("phone")}
                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg transition-colors ${
                      resetMethod === "phone"
                        ? "bg-[#f4bc45] text-[#13284D] font-medium"
                        : "bg-[#0A192F] text-gray-300 hover:bg-[#172F50]"
                    }`}
                  >
                    <Phone className="h-4 w-4" />
                    Phone
                  </button>
                </div>

                {resetMethod === "email" ? (
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
                        className={`block w-full pl-10 py-3 bg-[#0A192F] border ${
                          errors.email ? "border-red-500" : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                ) : (
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
                        className={`block w-full pl-10 py-3 bg-[#0A192F] border ${
                          errors.phone ? "border-red-500" : "border-gray-600"
                        } rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-[#f4bc45] transition-colors`}
                        placeholder="+1 (555) 123-4567"
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
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </button>

                {/* Verification Section */}
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-[#0A192F] border border-gray-700">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-gray-300 text-sm truncate max-w-[60%]">
                        {resetMethod === "email"
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

                <button
                  type="submit"
                  disabled={verificationStatus !== "verified"}
                  className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] ${
                    verificationStatus === "verified"
                      ? "bg-[#f4bc45] hover:bg-[#f4bc45]/90"
                      : "bg-[#f4bc45]/50 cursor-not-allowed"
                  } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors`}
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Continue"
                  )}
                </button>
              </>
            )}

            {step === 3 && (
              <>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center text-gray-400 hover:text-[#f4bc45] transition-colors mb-4"
                >
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Back
                </button>

                <div className="space-y-4">
                  {/* New Password Field */}
                  <div className="space-y-2">
                    <label
                      htmlFor="newPassword"
                      className="text-sm font-medium text-gray-300"
                    >
                      New Password
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={formData.newPassword}
                        onChange={handleChange}
                        className={`block w-full pl-10 pr-10 py-3 bg-[#0A192F] border ${
                          errors.newPassword
                            ? "border-red-500"
                            : "border-gray-600"
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
                    {errors.newPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.newPassword}
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

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-[#13284D] bg-[#f4bc45] hover:bg-[#f4bc45]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f4bc45] font-medium transition-colors"
                >
                  {loading ? (
                    <Loader2 className="animate-spin h-5 w-5" />
                  ) : (
                    "Reset Password"
                  )}
                </button>
              </>
            )}
          </form>

          <div className="mt-4 text-center">
            <Link
              href="/login"
              className="text-sm text-[#f4bc45] hover:text-[#f4bc45]/80"
            >
              Back to login
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
