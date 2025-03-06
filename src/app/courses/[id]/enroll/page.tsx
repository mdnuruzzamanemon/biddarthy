"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Modal from "@/components/modal";
import { Loader2 } from "lucide-react";
import bkash from "@/app/client/images/bkash.png"
import nagad from "@/app/client/images/nagad.png"
import rocket from "@/app/client/images/rocket.png"

const EnrollmentPage = ({ params }: { params: Promise<{ id: string }> }) => {
  const router = useRouter();

  // State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    transactionId: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [courseData, setCourseData] = useState({
    price: 0,
    discountPrice: 0,
    discountEndsAt: "",
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Store unwrapped params
  const [courseId, setCourseId] = useState<string | null>(null);

  // Fetch params.id
  useEffect(() => {
    (async () => {
      const { id } = await params;
      setCourseId(id);
    })();
  }, [params]);

  // Fetch course details
  useEffect(() => {
    if (!courseId) return;

    const fetchCourseData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/courses/${courseId}`);
        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch course details");

        setCourseData({
          price: data.price,
          discountPrice: data.discountPrice,
          discountEndsAt: data.discountEndsAt,
        });
      } catch (error) {
        console.error("Error fetching course data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseData();
  }, [courseId]);

  // Determine the active price
  const getCoursePrice = () => {
    const discountEndDate = new Date(courseData.discountEndsAt);
    const currentDate = new Date();
    return discountEndDate > currentDate && courseData.discountPrice ? courseData.discountPrice : courseData.price;
  };

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseId) return;

    try {
      setSubmitting(true);
      const res = await fetch("/api/enrollments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId, ...formData }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to enroll");

      setIsModalOpen(true);
    } catch (error) {
      console.error("Enrollment failed:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Close modal and redirect
  const closeModal = () => {
    setIsModalOpen(false);
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F] px-4 py-8">
      <div className="bg-[#13284D] p-6 rounded-lg shadow-md w-full max-w-[90%] sm:max-w-[90%] md:max-w-[80%] mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-white text-center">Enroll in Course</h3>

        {loading ? (
          <div className="flex justify-center items-center">
            <Loader2 className="animate-spin text-gray-300" size={24} />
          </div>
        ) : (
          <>
            <p className="text-gray-300 mb-3 text-center">
              Please send <strong>৳{getCoursePrice()}</strong> to any of the following payment methods:
            </p>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gradient-to-br from-[#1A2E50] to-[#0A192F] p-4 rounded-lg border border-gray-700 hover:shadow-md hover:border-gray-500 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-1.5 rounded-lg flex items-center justify-center w-10 h-10">
                    <Image src={bkash} alt="bKash" width={28} height={28} className="object-contain" />
                  </div>
                  <p className="text-gray-200 font-medium">bKash</p>
                </div>
                <div className="mt-2 bg-[#0A192F] p-2 rounded border border-gray-700 text-center">
                  <p className="text-pink-300 font-medium tracking-wide">01989244327</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1A2E50] to-[#0A192F] p-4 rounded-lg border border-gray-700 hover:shadow-md hover:border-gray-500 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-1.5 rounded-lg flex items-center justify-center w-10 h-10">
                    <Image src={nagad} alt="Nagad" width={28} height={28} className="object-contain" />
                  </div>
                  <p className="text-gray-200 font-medium">Nagad</p>
                </div>
                <div className="mt-2 bg-[#0A192F] p-2 rounded border border-gray-700 text-center">
                  <p className="text-orange-300 font-medium tracking-wide">01989244327</p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-[#1A2E50] to-[#0A192F] p-4 rounded-lg border border-gray-700 hover:shadow-md hover:border-gray-500 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="bg-white p-1.5 rounded-lg flex items-center justify-center w-10 h-10">
                    <Image src={rocket} alt="Rocket" width={28} height={28} className="object-contain" />
                  </div>
                  <p className="text-gray-200 font-medium">Rocket</p>
                </div>
                <div className="mt-2 bg-[#0A192F] p-2 rounded border border-gray-700 text-center">
                  <p className="text-purple-300 font-medium tracking-wide">01854454978</p>
                </div>
              </div>
            </div>

            <p className="text-gray-300 mb-6 text-center">
              After payment, please fill out the form below with your transaction details.
            </p>
          </>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2">
              <label className="block text-gray-300">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600 focus:border-[#f4bc45] focus:outline-none transition-colors"
                placeholder="Your full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600 focus:border-[#f4bc45] focus:outline-none transition-colors"
                placeholder="Your phone number"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600 focus:border-[#f4bc45] focus:outline-none transition-colors"
                placeholder="Your email address"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-gray-300">Transaction ID</label>
              <input
                type="text"
                name="transactionId"
                value={formData.transactionId}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600 focus:border-[#f4bc45] focus:outline-none transition-colors"
                placeholder="Payment transaction ID"
              />
            </div>
          </div>

          <div className="flex justify-center md:justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-300 hover:text-white border border-gray-600 rounded-lg hover:border-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#f4bc45] text-[#13284D] rounded-lg hover:bg-opacity-90 flex items-center justify-center font-medium"
              disabled={submitting}
            >
              {submitting ? <Loader2 className="animate-spin mr-2" size={18} /> : "Submit"}
            </button>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4 text-white">Enrollment Successful!</h2>
          <p className="text-gray-300 mb-4">Thank you for enrolling. Please join our telegram group using the link below for further instructions. You will get a confirmation mail soon.</p>
          <a href="https://t.me/+P7eho8F8mSM1NzU1" target="_blank" rel="noopener noreferrer" className="text-[#f4bc45] hover:underline">
            Join the Group
          </a>
        </Modal>
      )}
    </div>
  );
};

export default EnrollmentPage;