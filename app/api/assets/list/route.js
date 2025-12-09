import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';
import { NextRequest } from 'next/server';

// Configure S3 Client for Digital Ocean Spaces
const s3Client = new S3Client({
    region: 'nyc3',
    endpoint: 'https://nyc3.digitaloceanspaces.com',
    credentials: {
        accessKeyId: process.env.SPACES_ACCESS_KEY,
        secretAccessKey: process.env.SPACES_SECRET_KEY,
    },
});

export async function GET(req) {
    try {
        // Configure the command to list objects in a specific folder
        const command = new ListObjectsV2Command({
            Bucket: 'niralidecor',
            Prefix: 'assets/', // Specific path to list files from
        });

        // Send the list objects command
        const data = await s3Client.send(command);

        // Filter out any empty results or directory markers
        const filteredContents = (data.Contents || [])
            .map(item => ({
                key: item.Key,
                lastModified: item.LastModified,
                size: item.Size,
                // Construct full public URL
                publicUrl: `https://niralidecor.nyc3.digitaloceanspaces.com/${item.Key}`
            }));

        // Return the filtered and mapped contents
        return new Response(JSON.stringify(filteredContents), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error fetching assets:', error);
        return new Response(JSON.stringify({
            error: 'Failed to fetch assets',
            details: error instanceof Error ? error.message : 'Unknown error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}