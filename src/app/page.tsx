import { Metadata } from 'next';
import { defaultMetadata } from './metadata';

export const metadata: Metadata = {
  ...defaultMetadata,
  title: 'IN-FOMO | Innovative IT Solutions',
  description: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  openGraph: {
    ...defaultMetadata.openGraph,
    title: 'IN-FOMO | Innovative IT Solutions',
    description: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  },
  twitter: {
    ...defaultMetadata.twitter,
    title: 'IN-FOMO | Innovative IT Solutions',
    description: 'Leading IT company providing innovative software development, cloud solutions, and digital transformation services.',
  },
};

export default function Home() {
  return (
    <main>
      <h1>Welcome to IN-FOMO</h1>
    </main>
  );
} 