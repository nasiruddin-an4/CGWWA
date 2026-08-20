const fs = require('fs');
const path = require('path');

const mapFile = path.join(__dirname, 'cloudinary_map.json');
if (!fs.existsSync(mapFile)) {
  console.error("Map file not found");
  process.exit(1);
}
const fileMap = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));
const publicDir = path.join(__dirname, '../public');

let deletedCount = 0;

for (const localPath of Object.keys(fileMap)) {
  // localPath is like "/4. Leadership/..."
  const fullPath = path.join(publicDir, localPath.replace(/^\//, ''));
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted uploaded file: ${fullPath}`);
    deletedCount++;
  }
}

console.log(`Finished deleting ${deletedCount} uploaded files.`);
