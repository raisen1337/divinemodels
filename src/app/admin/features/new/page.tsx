import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import NewFeatureForm from './NewFeatureForm';

export const metadata: Metadata = {
    title: 'Add New Feature - Divine Models Admin',
};

export default async function NewFeaturePage() {
    const session = await getServerSession(authOptions);

    // If not logged in as admin, redirect to login
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    return <NewFeatureForm />;
}
