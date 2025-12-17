import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';

export const runtime = 'nodejs';

export const config = {
    api: {
        bodyParser: false,
        sizeLimit: '50mb',
    },
};

const s3Client = new S3Client({
    region: 'nyc3',
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY,
    },
});

export async function POST(req) {
    try {
        // Parse the form data
        const formData = await req.formData();
        const file = formData.get('file');
        const path = formData.get('path') || 'assets/';

        if (!file) {
            return new Response(JSON.stringify({ error: 'No file uploaded' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Generate a unique filename
        const fileExtension = file.name.split('.').pop();
        const uniqueFileName = file.name; // Hardcoded filename for banner

        // Construct the full key with the specified path
        const fullKey = `${path.replace(/\/+$/, '')}/${uniqueFileName}`;

        // Read file as ArrayBuffer
        const fileBuffer = await file.arrayBuffer();

        // Upload parameters
        const uploadParams = {
            Bucket: 'niralidecor', // Your bucket name
            Key: fullKey,
            Body: Buffer.from(fileBuffer),
            ContentType: file.type,
            ACL: 'public-read', // Makes the file publicly accessible
        };

        // Send upload command
        const command = new PutObjectCommand(uploadParams);
        await s3Client.send(command);

        // Construct public URL
        const fileUrl = `https://niralidecor.nyc3.digitaloceanspaces.com/${fullKey}`;

        return new Response(JSON.stringify({
            message: 'File uploaded successfully',
            fileUrl
        }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Upload error:', error);
        return new Response(JSON.stringify({
            error: 'File upload failed',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}