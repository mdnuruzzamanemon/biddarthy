// app/your-route/loading.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import loaderLogo from "@/app/client/images/loaderLogo.png"

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0A192F]">
      <motion.div
        className="flex items-center justify-center w-32 h-32"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Image
          src={loaderLogo}
          alt="Loading..."
          width={128}
          height={128}
          className="object-contain"
        />
      </motion.div>
    </div>
  );
};

export default Loading;
