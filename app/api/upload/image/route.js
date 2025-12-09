import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

// Extract base endpoint without bucket name
const getBaseEndpoint = () => {
    const fullEndpoint = process.env.NEXT_PUBLIC_SPACES_ENDPOINT;
    // If endpoint includes bucket name, extract just the base URL
    // e.g., https://niralidecor.nyc3.digitaloceanspaces.com -> https://nyc3.digitaloceanspaces.com
    if (fullEndpoint.includes('.nyc3.digitaloceanspaces.com')) {
        return 'https://nyc3.digitaloceanspaces.com';
    }
    return fullEndpoint;
};

const s3Client = new S3Client({
    endpoint: getBaseEndpoint(),
    region: 'nyc3',
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY,
    },
});

export async function POST(request) {
    try {
        const token = request.headers.get('x-admin-token');
        if (token !== process.env.ADMIN_TOKEN) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('image');

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
        if (!allowedTypes.includes(file.type)) {
            return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
        }

        // Generate unique filename
        const timestamp = Date.now();
        const randomString = Math.round(Math.random() * 1E9);
        const ext = file.name.split('.').pop();
        const filename = `blog-${timestamp}-${randomString}.${ext}`;

        // Convert file to buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Upload to DigitalOcean Spaces
        const uploadParams = {
            Bucket: process.env.SPACES_BUCKET_NAME,
            Key: `blog-uploads/${filename}`,
            Body: buffer,
            ACL: 'public-read',
            ContentType: file.type,
        };

        await s3Client.send(new PutObjectCommand(uploadParams));

        // Construct the public URL
        const fileUrl = `${process.env.NEXT_PUBLIC_SPACES_ENDPOINT}/blog-uploads/${filename}`;

        return NextResponse.json({ url: fileUrl, filename }, { status: 200 });
    } catch (error) {
        console.error('Error uploading image:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
