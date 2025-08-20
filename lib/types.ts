export interface Speaker {
  name: string;
  title: string;
  description: string;
  image?: string;
}

export interface CourseWebinar {
  id: string;
  title: string;
  type: 'course' | 'webinar';
  language: string;
  date: string;
  location: string;
  price: string;
  description: string;
  keyLearningOutcomes: string[];
  speakers: Speaker[];
  courseHighlights: string[];
  prerequisites: string[];
  whyChoose: string[];
  certificateUrl?: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
}

export interface CourseWebinarFormData {
  title: string;
  type: 'course' | 'webinar';
  language: string;
  date: string;
  location: string;
  price: string;
  description: string;
  keyLearningOutcomes: string;
  speakers: string;
  courseHighlights: string;
  prerequisites: string;
  whyChoose: string;
  certificateUrl?: string;
} 