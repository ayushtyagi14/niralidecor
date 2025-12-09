import { S3Client, PutObjectCommand, ListObjectsV2Command, DeleteObjectCommand } from "@aws-sdk/client-s3";

// Configure DigitalOcean Spaces with debugging
const s3Client = new S3Client({
  endpoint: "https://nyc3.cdn.digitaloceanspaces.com", // Use the base endpoint (not the bucket-specific URL)
  region: "nyc3", // Replace with your Spaces region
  credentials: {
    accessKeyId: "DO00QTKK9YVGN442Q6JA", // Ensure this is set in your environment variables
    secretAccessKey: "IW1aoa59tkuyjf1adiJJem47+viTG7lLeV93cg35nZo", // Ensure this is set in your environment variables
  },
});

const bucketName = 'niralidecor'; // Hardcoded bucket name

/**
 * Upload a file to DigitalOcean Spaces.
 * @param {Buffer} fileBuffer - The file's buffer.
 * @param {string} fileName - The name of the file.
 * @param {string} folderPath - The folder path within Spaces.
 * @returns {string} - The URL of the uploaded file.
 */
export const uploadFile = async (fileBuffer, fileName, folderPath) => {
  const key = `${folderPath}/${fileName}`; // Construct the full path for the file

  const params = {
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ACL: "public-read", // Makes the file publicly accessible
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return `https://${bucketName}.nyc3.cdn.digitaloceanspaces.com/${key}`; // Construct and return the file's public URL
  } catch (error) {
    console.error("Error uploading file:", error.message);
    throw new Error("Failed to upload file to Spaces.");
  }
};

/**
 * Get all files from a specific folder in Spaces.
 * @param {string} folderPath - The folder path within Spaces.
 * @returns {Array<string>} - A list of file URLs.
 */
export const listFiles = async (folderPath) => {
  // Ensure the folderPath does not start with a slash
  const sanitizedFolderPath = folderPath.replace(/^\/+/, ""); // Remove leading slashes

  const params = {
    Bucket: bucketName,
    Prefix: sanitizedFolderPath, // Use the sanitized path
  };

  try {
    console.log("Fetching files from folder:", sanitizedFolderPath);

    const data = await s3Client.send(new ListObjectsV2Command(params));

    if (data.Contents) {
      console.log("Files retrieved:", data.Contents);
      return data.Contents.map(
        (item) => `https://${bucketName}.nyc3.digitaloceanspaces.com/${item.Key}`
      );
    }

    console.log("No files found in folder:", sanitizedFolderPath);
    return [];
  } catch (error) {
    console.error("Error listing files:", error.message);
    throw new Error("Failed to list files in Spaces.");
  }
};

/**
 * Delete a specific file from Spaces.
 * @param {string} filePath - The file's path in Spaces.
 */
export const deleteFile = async (folderPath, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: `${folderPath}/${fileName}`, // Specify the file path to delete
  };

  try {
    await s3Client.send(new DeleteObjectCommand(params));
    console.log(`Successfully deleted file: ${fileName}`);
  } catch (error) {
    console.error("Error deleting file:", error.message);
    throw new Error("Failed to delete file from Spaces.");
  }
};
