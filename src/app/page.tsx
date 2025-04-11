import Banner from "@/components/landing/Banner";
import FAQ from "@/components/landing/FAQ";
import Header from "@/components/landing/Header";
import Testimonials from "@/components/landing/Testimonials";
import TrendingCourses from "@/components/landing/TrendingCourses";

export default function Home() {
  return (
    <main>
      <Header />
      <Banner />
      <TrendingCourses />
      <Testimonials />
      <FAQ />
      {/* Other sections will go here */}
    </main>
  );
}
