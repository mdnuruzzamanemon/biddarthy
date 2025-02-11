'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Modal from '@/components/modal';

const EnrollmentPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    transactionId: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., send data to backend)
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    router.push(`/courses/${params.id}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0A192F]">
      <div className="bg-[#13284D] p-6 rounded-lg shadow-md max-w-md w-full">
        <h3 className="text-xl font-semibold mb-4 text-white">Enroll in Course</h3>
        <p className="text-gray-300 mb-4">
          Please send <strong>৳[Course Price]</strong> to the bKash number{' '}
          <strong>01846838507</strong> and fill out the form below with your payment details.
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Transaction ID</label>
            <input
              type="text"
              name="transactionId"
              value={formData.transactionId}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border rounded-lg bg-[#0A192F] text-white border-gray-600"
            />
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-4 py-2 text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#f4bc45] text-[#13284D] rounded-lg hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <h2 className="text-2xl font-semibold mb-4 text-white">Enrollment Successful!</h2>
          <p className="text-gray-300 mb-4">
            Thank you for enrolling. Please join our group using the link below for further instructions.
          </p>
          <a
            href="https://example.com/group-link"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#f4bc45] hover:underline"
          >
            Join the Group
          </a>
        </Modal>
      )}
    </div>
  );
};

export default EnrollmentPage;
