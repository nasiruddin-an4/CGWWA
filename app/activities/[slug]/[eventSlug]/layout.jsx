
import { getCollectionData } from '@/lib/db';

export async function generateMetadata({ params }) {
  const { slug, eventSlug } = await params;
  
  const activitiesData = await getCollectionData('activities', []);
  const category = activitiesData.find((c) => c.slug === slug);
  const event = category?.events.find((e) => e.eventSlug === eventSlug);

  if (!event) {
    return {
      title: 'Event Not Found',
    };
  }

  return {
    title: `${event.title} - ${category.title} | CGFWA`,
    description: event.desc,
    keywords: `${event.title.toLowerCase()}, ${category.title.toLowerCase()}, CGFWA event, Bangladesh Coast Guard, ${eventSlug.replace('-', ' ')}`,
  };
}

export default function EventDetailsLayout({ children }) {
  return children;
}
