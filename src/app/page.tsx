import Header from '@/components/Header'
import Banner from '@/components/Banner'
import TrendingCourses from '@/components/TrendingCourses'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'

export default function Home() {
  return (
    <main >
      <Header />
      <Banner />
      <TrendingCourses />
      <Testimonials />
      <FAQ />
      {/* Other sections will go here */}
    </main>
  );
}
