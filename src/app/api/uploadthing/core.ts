import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const f = createUploadthing();

const auth = async (req: Request) => {
    const session = await getServerSession(authOptions);

    // If user is not authenticated, throw an error
    if (!session?.user?.email) {
        throw new Error('Unauthorized');
    }

    // For now, we'll check if it's an admin by email since we don't have the role in the session
    // You might want to add a proper role check here
    return { userId: session.user.email };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    // Define as many FileRoutes as you like, each with a unique routeSlug
    imageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 10 } })
        // Set permissions and file types for this FileRoute
        .middleware(async ({ req }) => {
            // This code runs on your server before upload
            const user = await auth(req);

            // Whatever is returned here is accessible in onUploadComplete as `metadata`
            return { userId: user.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            // This code RUNS ON YOUR SERVER after upload
            console.log("Upload complete for userId:", metadata.userId);

            console.log("file url", file.url);

            // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
            return { uploadedBy: metadata.userId, url: file.url, key: file.key };
        }),

    // Model images specifically
    modelImageUploader: f({ image: { maxFileSize: "8MB", maxFileCount: 20 } })
        .middleware(async ({ req }) => {
            const user = await auth(req);
            return { userId: user.userId };
        })
        .onUploadComplete(async ({ metadata, file }) => {
            console.log("Model image upload complete for userId:", metadata.userId);
            console.log("file url", file.url);

            return {
                uploadedBy: metadata.userId,
                url: file.url,
                key: file.key,
                name: file.name,
                size: file.size
            };
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
