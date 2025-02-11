'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  onClose: () => void;
  children: ReactNode;
}

const Modal = ({ onClose, children }: ModalProps) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-[#13284D] p-6 rounded-lg shadow-lg z-10 max-w-md w-full"
      >
        {children}
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#f4bc45] text-[#13284D] rounded-lg hover:bg-opacity-90"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
