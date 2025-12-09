// pages/api/assets/delete/route.js
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
    region: 'nyc3',  // Adjust to your DigitalOcean Spaces region
    endpoint: 'https://nyc3.digitaloceanspaces.com',  // Your DigitalOcean Space endpoint
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY,
    },
});

export const DELETE = async (req) => {
    const { key } = await req.json();

    if (!key || !key.startsWith('assets/')) {
        return new Response(JSON.stringify({ error: 'Invalid or missing file key' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const command = new DeleteObjectCommand({
            Bucket: 'niralidecor',
            Key: key,
        });

        await s3Client.send(command);

        return new Response(JSON.stringify({ message: 'File deleted successfully', key }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (err) {
        console.error('Error deleting file:', err.$metadata || err);
        return new Response(JSON.stringify({ error: 'Failed to delete file' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
