'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import bannerImg from "../app/client/images/bannerimg.jpg"


type Banner = {
  _id: string;
  image: string;
  createdAt: string;
};

const Banner = () => {
  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanner = async () => {
      try {
        const res = await fetch('/api/homebanner'); 
        const data = await res.json();
        if (data?.image) {
          setBanner({ ...data, image: `http://localhost:5000/${data.image}` });
        }
      } catch (error) {
        console.error('Error fetching banner image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanner();
  }, []);
  return (
    <>
    {loading ? (<div className="flex justify-center items-center h-40 bg-[#0A192F]">
            <Loader2 className="animate-spin w-8 h-8 text-white" />
          </div>) :
           (
    <div className="relative w-full">
      
            <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="relative w-full"
      >
        <div className="relative w-full" style={{ paddingTop: 'auto' }}>
          <Image
            src={banner?.image || bannerImg}
            alt="Biddarthy Banner"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto"
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-transparent to-transparent" />
      </motion.div>
           
      
    </div>)}
    </>
  )
}

export default Banner
