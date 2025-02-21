// types.ts
export type Course = {
    // _id: string;
    title: string;
    thumbnail: string;
    category: string;
    price: number;
    discountPrice?: number;
    discountPercentage?: number;
    description: string;
    instructor: string;
    discountEndsAt?: Date;
    demoVideo?: string;
  };
  