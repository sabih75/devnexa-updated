import { SERVICES_LIST } from '@/lib/servicesData';
import ServiceDetailClient from './ServiceDetailClient';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SERVICES_LIST.map((s) => ({
    slug: s.slug,
  }));
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const service = SERVICES_LIST.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return <ServiceDetailClient s={service} />;
}
