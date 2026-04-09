const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, '../public/assets');

async function processImage(fileName) {
  const filePath = path.join(directoryPath, fileName);
  const tempPath = path.join(directoryPath, fileName + '.temp.jpg');

  try {
    const stats = fs.statSync(filePath);
    const sizeInMB = stats.size / (1024 * 1024);

    if (sizeInMB > 0.5) { // Any file over 500KB
      console.log(`Optimizing ${fileName} (Current: ${sizeInMB.toFixed(2)} MB)...`);
      
      await sharp(filePath)
        .resize({ width: 1920, withoutEnlargement: true }) // Max width 1920px
        .jpeg({ quality: 80, progressive: true }) // Quality 80 is very good
        .toFile(tempPath);
      
      fs.unlinkSync(filePath); // Delete original
      fs.renameSync(tempPath, filePath); // Replace with temp
      
      const newStats = fs.statSync(filePath);
      const newSizeInKB = newStats.size / 1024;
      console.log(`Success: ${fileName} is now ${newSizeInKB.toFixed(2)} KB.`);
    } else if (fileName === 'couple.jpg') {
        // Specifically optimize couple.jpg just in case since they asked
        console.log(`Optimizing ${fileName} specifically...`);
        await sharp(filePath)
        .resize({ width: 1200, withoutEnlargement: true }) // reasonable max size
        .jpeg({ quality: 80, progressive: true })
        .toFile(tempPath);
        
        fs.unlinkSync(filePath); // Delete original
        fs.renameSync(tempPath, filePath); // Replace with temp
        
        const newStats = fs.statSync(filePath);
        const newSizeInKB = newStats.size / 1024;
        console.log(`Success: ${fileName} is now ${newSizeInKB.toFixed(2)} KB.`);
    }
  } catch (error) {
    console.error(`Error processing ${fileName}:`, error);
  }
}

async function main() {
  const files = fs.readdirSync(directoryPath);
  
  for (const file of files) {
    if (file.match(/\.(jpg|jpeg|png)$/i)) {
      await processImage(file);
    }
  }
  console.log("Done!");
}

main();
