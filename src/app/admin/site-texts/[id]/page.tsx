import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import EditSiteTextForm from './EditSiteTextForm';

export const metadata = {
    title: 'Edit Site Text - Divine Models Admin',
};

export default async function EditSiteTextPage({ params }: { params: { id: string } }) {
    const { id } = params;

    // Fetch the site text
    const siteText = await prisma.siteText.findUnique({
        where: { id },
    });

    if (!siteText) {
        notFound();
    }

    return <EditSiteTextForm siteText={siteText} />;
}
