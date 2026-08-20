import { activitiesData } from '@/data/activities';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = activitiesData.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: 'Activity Not Found',
    };
  }

  return {
    title: `${category.title} - Coast Guard Family Welfare Association`,
    description: category.shortDesc,
    keywords: `${category.title.toLowerCase()}, CGFWA activities, Bangladesh Coast Guard welfare, ${slug.replace('-', ' ')}`,
  };
}

export default function ActivityCategoryLayout({ children }) {
  return children;
}
