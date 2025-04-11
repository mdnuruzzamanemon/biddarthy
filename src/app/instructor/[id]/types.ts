export interface Instructor {
  _id: string;
  name: string;
  designation: string;
  image: string;
  bio?: string;
  fullBio?: string;
  expertise?: string[];
  education?: string[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description?: string;
  }[];
  courses?: {
    id: string;
    title: string;
    image: string;
    level?: string;
    duration?: string;
    students?: number;
    rating?: number;
  }[];
  demoClasses?: {
    id: string;
    title: string;
    image: string;
    duration: string;
    date: string;
    description: string;
  }[];
  publications?: {
    title: string;
    journal?: string;
    year: string;
    link?: string;
  }[];
  awards?: {
    title: string;
    year: string;
    organization?: string;
  }[];
  certifications?: {
    title: string;
    organization: string;
    year: string;
  }[];
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    website?: string;
    youtube?: string;
    researchGate?: string;
  };
}
