import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import InstructorContent from "./InstructorContent";
import { Instructor } from "./types";

// Sample instructor data - replace with API call
const sampleInstructors: Record<string, Instructor> = {
  "1": {
    _id: "1",
    name: "Dr. Rajesh Sharma",
    designation: "Senior Professor of Computer Science",
    image: "images/instructors/instructor1.jpg",
    bio: "Dr. Sharma has over 15 years of experience in computer science education and research.",
    fullBio:
      "Dr. Rajesh Sharma is a distinguished professor in Computer Science with a Ph.D. from Stanford University. With over 15 years of experience in academia and industry, he has contributed significantly to the fields of machine learning and algorithms. Dr. Sharma has published numerous research papers in international journals and has been a keynote speaker at various conferences worldwide. His teaching methodology combines theoretical concepts with practical applications, helping students gain hands-on experience that prepares them for real-world challenges.",
    expertise: [
      "Machine Learning",
      "Data Structures",
      "Algorithms",
      "Artificial Intelligence",
      "Python Programming",
    ],
    education: [
      "Ph.D. in Computer Science, Stanford University",
      "M.S. in Computer Engineering, MIT",
      "B.Tech in Computer Science, IIT Bombay",
    ],
    experience: [
      {
        title: "Senior Professor",
        company: "National Institute of Technology",
        period: "2015 - Present",
        description:
          "Teaching advanced courses in machine learning and algorithms.",
      },
      {
        title: "Research Scientist",
        company: "Google AI",
        period: "2010 - 2015",
        description:
          "Worked on developing machine learning algorithms for search optimization.",
      },
      {
        title: "Assistant Professor",
        company: "Indian Institute of Technology",
        period: "2008 - 2010",
        description:
          "Taught data structures and algorithms to undergraduate students.",
      },
    ],
    courses: [
      {
        id: "101",
        title: "Advanced Machine Learning",
        image: "images/courses/ml-course.jpg",
        level: "Advanced",
        duration: "12 weeks",
        students: 1245,
        rating: 4.8,
      },
      {
        id: "102",
        title: "Data Structures & Algorithms",
        image: "images/courses/dsa-course.jpg",
        level: "Intermediate",
        duration: "10 weeks",
        students: 3210,
        rating: 4.9,
      },
      {
        id: "103",
        title: "Python for Data Science",
        image: "images/courses/python-course.jpg",
        level: "Beginner",
        duration: "8 weeks",
        students: 5430,
        rating: 4.7,
      },
      {
        id: "104",
        title: "Neural Networks and Deep Learning",
        image: "images/courses/neural-networks.jpg",
        level: "Advanced",
        duration: "14 weeks",
        students: 985,
        rating: 4.6,
      },
    ],
    demoClasses: [
      {
        id: "d101",
        title: "Introduction to Machine Learning Algorithms",
        image: "images/demos/machine-learning.jpg",
        duration: "45 minutes",
        date: "2023-11-15",
        description:
          "Learn the fundamentals of machine learning algorithms and how they work in real-world applications.",
      },
      {
        id: "d102",
        title: "Optimizing Data Structures for Performance",
        image: "images/demos/data-structures.jpg",
        duration: "60 minutes",
        date: "2023-12-05",
        description:
          "Discover how to select and optimize data structures to improve application performance.",
      },
      {
        id: "d103",
        title: "Python Libraries for Data Analysis",
        image: "images/demos/python-libraries.jpg",
        duration: "50 minutes",
        date: "2024-01-20",
        description:
          "Explore the most powerful Python libraries for data analysis including Pandas, NumPy, and Matplotlib.",
      },
    ],
    publications: [
      {
        title: "Efficient Algorithms for Large-Scale Data Processing",
        journal: "Journal of Computer Science",
        year: "2021",
        link: "https://example.com/publication1",
      },
      {
        title: "Machine Learning Approaches for Predictive Analytics",
        journal: "IEEE Transactions on Knowledge and Data Engineering",
        year: "2019",
        link: "https://example.com/publication2",
      },
      {
        title: "Optimizing Neural Networks for Edge Computing",
        journal: "International Conference on Machine Learning",
        year: "2018",
        link: "https://example.com/publication3",
      },
    ],
    awards: [
      {
        title: "Outstanding Educator Award",
        year: "2022",
        organization: "National Education Society",
      },
      {
        title: "Best Research Paper",
        year: "2020",
        organization: "International Conference on AI and Machine Learning",
      },
      {
        title: "Excellence in Teaching",
        year: "2018",
        organization: "National Institute of Technology",
      },
    ],
    certifications: [
      {
        title: "Advanced AI and Deep Learning",
        organization: "DeepLearning.AI",
        year: "2021",
      },
      {
        title: "TensorFlow Developer Certification",
        organization: "Google",
        year: "2019",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/rajesh-sharma",
      twitter: "https://twitter.com/rajeshsharma",
      website: "https://rajeshsharma.edu",
      youtube: "https://youtube.com/c/rajeshsharma",
      researchGate: "https://researchgate.net/profile/rajesh-sharma",
    },
  },
  "2": {
    _id: "2",
    name: "Prof. Meena Gupta",
    designation: "Associate Professor of Data Science",
    image: "images/instructors/instructor2.jpg",
    bio: "Prof. Gupta specializes in data science and has worked with leading tech companies.",
    fullBio:
      "Professor Meena Gupta is an accomplished data scientist with expertise in statistical modeling and machine learning techniques. She has worked extensively with several Fortune 500 companies as a consultant, helping them leverage data for strategic decision-making. Her research focuses on developing novel approaches to data analysis that can be applied across various domains. She is passionate about making complex statistical concepts accessible to students of all levels.",
    expertise: [
      "Data Science",
      "Python",
      "Statistics",
      "R Programming",
      "Big Data Analytics",
    ],
    education: [
      "Ph.D. in Statistics, University of California, Berkeley",
      "M.S. in Applied Mathematics, Harvard University",
      "B.Sc. in Mathematics, Delhi University",
    ],
    experience: [
      {
        title: "Associate Professor",
        company: "Indian Statistical Institute",
        period: "2018 - Present",
        description: "Teaching data science courses and conducting research.",
      },
      {
        title: "Data Science Consultant",
        company: "Microsoft Research",
        period: "2014 - 2018",
        description:
          "Led a team of data scientists working on cloud computing analytics.",
      },
      {
        title: "Statistician",
        company: "IBM Research Labs",
        period: "2010 - 2014",
        description:
          "Developed statistical models for business intelligence applications.",
      },
    ],
    courses: [
      {
        id: "201",
        title: "Introduction to Data Science",
        image: "images/courses/data-science-intro.jpg",
        level: "Beginner",
        duration: "8 weeks",
        students: 4250,
        rating: 4.9,
      },
      {
        id: "202",
        title: "Statistical Methods in R",
        image: "images/courses/r-statistics.jpg",
        level: "Intermediate",
        duration: "10 weeks",
        students: 2150,
        rating: 4.7,
      },
      {
        id: "203",
        title: "Big Data Analytics",
        image: "images/courses/big-data.jpg",
        level: "Advanced",
        duration: "12 weeks",
        students: 1750,
        rating: 4.8,
      },
    ],
    demoClasses: [
      {
        id: "d201",
        title: "Getting Started with Data Science",
        image: "images/demos/data-science-intro.jpg",
        duration: "55 minutes",
        date: "2023-11-10",
        description:
          "Learn the fundamentals of data science and how to begin your journey in this exciting field.",
      },
      {
        id: "d202",
        title: "Statistical Analysis with R",
        image: "images/demos/r-programming.jpg",
        duration: "45 minutes",
        date: "2023-12-12",
        description:
          "Introduction to statistical analysis using R programming language.",
      },
    ],
    publications: [
      {
        title: "Statistical Methods for Big Data Analysis",
        journal: "Journal of Statistical Computing",
        year: "2022",
        link: "https://example.com/publication4",
      },
      {
        title: "Machine Learning for Financial Forecasting",
        journal: "Journal of Financial Data Science",
        year: "2020",
        link: "https://example.com/publication5",
      },
    ],
    awards: [
      {
        title: "Women in Data Science Award",
        year: "2021",
        organization: "Global Data Science Forum",
      },
      {
        title: "Excellence in Research",
        year: "2019",
        organization: "Indian Statistical Institute",
      },
    ],
    socialLinks: {
      linkedin: "https://linkedin.com/in/meena-gupta",
      website: "https://meenagupta.com",
      researchGate: "https://researchgate.net/profile/meena-gupta",
    },
  },
};

// Server component to fetch the data
export default async function InstructorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Await the params promise to get the id
  const resolvedParams = await params;
  const { id } = resolvedParams;

  const instructor = sampleInstructors[id] || null;

  if (!instructor) {
    return (
      <div className="min-h-screen bg-[#0A192F] flex flex-col items-center justify-center px-4 py-16">
        <h1 className="text-3xl font-bold text-white mb-4">
          Instructor Not Found
        </h1>
        <p className="text-gray-400 mb-8">
          The instructor you&apos;re looking for doesn&apos;t exist or has been
          removed.
        </p>
        <Link
          href="/instructors"
          className="flex items-center text-[#f4bc45] hover:underline"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Back to Instructors
        </Link>
      </div>
    );
  }

  return <InstructorContent instructor={instructor} />;
}

// Now create a separate file for the client component: src/app/instructor/[id]/InstructorContent.tsx
export interface PageProps {
  params?: { id: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}
