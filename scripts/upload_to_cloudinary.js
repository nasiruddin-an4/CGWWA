const fs = require('fs');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const os = require('os');

// Ensure you have CLOUDINARY_URL set in your environment variables.
// Example: CLOUDINARY_URL=cloudinary://API_KEY:API_SECRET@CLOUD_NAME
if (!process.env.CLOUDINARY_URL) {
  console.log("No CLOUDINARY_URL found in environment. Using fallback if available, but please set it!");
}

const publicDir = path.join(__dirname, '../public');
const mapFile = path.join(__dirname, 'cloudinary_map.json');
const tmpDir = os.tmpdir();

const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.webp', '.mp4'];
let fileMap = {};

if (fs.existsSync(mapFile)) {
  fileMap = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));
}

const MAX_SIZE = 9 * 1024 * 1024; // 9MB to be safe

async function uploadFile(filePath, publicPath) {
  if (fileMap[publicPath]) {
    console.log(`Skipping already uploaded: ${publicPath}`);
    return;
  }
  
  try {
    const isVideo = filePath.endsWith('.mp4');
    let uploadPath = filePath;
    let tempPath = null;
    
    const stats = fs.statSync(filePath);
    if (!isVideo && stats.size > MAX_SIZE) {
      console.log(`Compressing ${publicPath} (${(stats.size/1024/1024).toFixed(2)}MB)...`);
      tempPath = path.join(tmpDir, `compressed_${Date.now()}_${path.basename(filePath)}`);
      
      // Use sharp to resize and compress without losing noticeable quality
      await sharp(filePath)
        .resize({ width: 2500, withoutEnlargement: true }) // Max width 2500px is great for web
        .jpeg({ quality: 80 }) // 80% quality JPEG is highly optimized
        .toFile(tempPath);
        
      uploadPath = tempPath;
      const newStats = fs.statSync(uploadPath);
      console.log(`Compressed to ${(newStats.size/1024/1024).toFixed(2)}MB`);
    }

    const result = await cloudinary.uploader.upload(uploadPath, {
      resource_type: isVideo ? 'video' : 'image',
      folder: 'cgfwa',
      use_filename: true,
      unique_filename: true
    });
    console.log(`Uploaded ${publicPath} -> ${result.secure_url}`);
    fileMap[publicPath] = result.secure_url;
    // Save map immediately to prevent losing progress
    fs.writeFileSync(mapFile, JSON.stringify(fileMap, null, 2));
    
    // Clean up temp file
    if (tempPath && fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
    }
  } catch (err) {
    console.error(`Error uploading ${publicPath}:`, err.message || err);
  }
}

async function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (validExtensions.includes(ext)) {
        // Compute relative path to public, e.g. "/images/logo.png"
        const relativePath = '/' + path.relative(publicDir, fullPath).replace(/\\/g, '/');
        await uploadFile(fullPath, relativePath);
      }
    }
  }
}

async function main() {
  console.log('Starting Cloudinary Uploads with Auto-Compression...');
  await processDirectory(publicDir);
  console.log('Uploads complete! Map saved to cloudinary_map.json');
}

main();
