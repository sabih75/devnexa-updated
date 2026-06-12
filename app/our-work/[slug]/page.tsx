import { PROJECTS_LIST } from '@/lib/projectsData';
import ProjectDetailClient from './ProjectDetailClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return PROJECTS_LIST.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const project = PROJECTS_LIST.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient p={project} />;
}
