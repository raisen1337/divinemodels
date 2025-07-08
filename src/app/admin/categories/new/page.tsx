import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import NewCategoryForm from './NewCategoryForm';

export const metadata: Metadata = {
    title: 'Add New Category - Divine Models Admin',
};

export default async function NewCategoryPage() {
    const session = await getServerSession(authOptions);

    // If not logged in as admin, redirect to login
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin');
    }

    return <NewCategoryForm />;
}
