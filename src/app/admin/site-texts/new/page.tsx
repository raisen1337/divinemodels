import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import NewSiteTextForm from './NewSiteTextForm';

export const metadata: Metadata = {
    title: 'Add New Site Text - Divine Models Admin',
};

export default async function NewSiteTextPage() {
    const session = await getServerSession(authOptions);

    // If not logged in as admin, redirect to login
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    return <NewSiteTextForm />;
}
