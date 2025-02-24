export type Course = {
  _id: string;
  title: string;
  thumbnail: string; // URL or file path
  category: {
    _id: string;
    categoryName: string;
  };
  price: number;
  discountPrice?: number;
  description: string;
  instructor: string;
  discountEndsAt?: string; // Date string
  demoVideo?: string;
  createdAt?: string;
  updatedAt?: string;
};
