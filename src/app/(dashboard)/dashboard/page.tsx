import ApiDashboard from '@/components/ApiDashboard';
import RequestApiKey from '@/components/RequestApiKey';
import { authOptions } from '@/lib/auth';
import { db } from '@/lib/db';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';

const metadata: Metadata = {
  title: 'Similarity API | Dashboard',
  description: 'Free & open-source text similarity API'
}

const page = async () => {
  const user = await getServerSession(authOptions);
  if (!user) return notFound();

  // find the first apikey for this user
  const apiKey = await db.apiKey.findFirst({
    where: { userId: user.user.id, enabled: true }
  });

  return (
    <div className="max-w-7xl mx-auto mt-16">
      {apiKey ? (
        // @ts-expect-error Server Component
        <ApiDashboard/>
      ) : ( <RequestApiKey/> )}
    </div>
  )
}
export default page;