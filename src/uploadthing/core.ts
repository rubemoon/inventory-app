import { createRouter } from "@uploadthing/react";

interface FileUploaderConfig {
    maxFileSize: string;
    allowedFileTypes: string[];
}

interface UploadedFile {
    name: string;
    size: number;
    type: string;
    url: string;
}

export const OurFileRouter = createRouter()
    .file("imageUploader", {
        maxFileSize: "4MB",
        allowedFileTypes: ["image/jpeg", "image/png", "image/gif", "image/svg"]
    } as FileUploaderConfig)
    .onUploadComplete((file: UploadedFile) => {
        console.log("File uploaded:", file);
        // Ensure the URL is correctly logged and returned
        return { url: file.url };
    });

export type OurFileRouter = typeof OurFileRouter;