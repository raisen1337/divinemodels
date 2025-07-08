import { ReactNode } from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import AdminLayoutClient from './AdminLayoutClient';

export default async function AdminLayout({
    children,
}: {
    children: ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Check if user is authenticated and is an admin
    if (!session?.user || (session.user as any).role !== 'ADMIN') {
        redirect('/auth/signin?callbackUrl=/admin');
    }

    return <AdminLayoutClient>{children}</AdminLayoutClient>;
}
