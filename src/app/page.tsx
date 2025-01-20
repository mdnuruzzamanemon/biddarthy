import Image from "next/image";
import Banner from '@/components/Banner'
import TrendingCourses from '@/components/TrendingCourses'

export default function Home() {
  return (
    <main>
      <Banner />
      <TrendingCourses />
      {/* Other sections will go here */}
    </main>
  );
}
