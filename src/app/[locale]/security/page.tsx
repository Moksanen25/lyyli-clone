import { redirect } from 'next/navigation';

interface SecurityPageProps {
  params: Promise<{ locale: string }>;
}

export default async function SecurityPage({ params }: SecurityPageProps) {
  const { locale } = await params;
  
  // Redirect to cybersecurity page
  redirect(`/${locale}/cybersecurity`);
}
