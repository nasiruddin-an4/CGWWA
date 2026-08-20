const fs = require('fs');
const path = require('path');

const mapFile = path.join(__dirname, 'cloudinary_map.json');
if (!fs.existsSync(mapFile)) {
  console.error("Map file not found");
  process.exit(1);
}
const fileMap = JSON.parse(fs.readFileSync(mapFile, 'utf-8'));

const directoriesToScan = ['app', 'components', 'data'];
const projectRoot = path.join(__dirname, '..');

const validExtensions = ['.js', '.jsx', '.ts', '.tsx'];

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  let originalContent = content;
  
  // Sort the keys by length descending to prevent partial path replacement bugs
  const keys = Object.keys(fileMap).sort((a, b) => b.length - a.length);

  for (const localPath of keys) {
    const cloudUrl = fileMap[localPath];
    // Replace exact occurrences of the string
    // e.g. "/4. Leadership/..." -> "https://..."
    const regex = new RegExp(`['"\`]${escapeRegExp(localPath)}['"\`]`, 'g');
    
    content = content.replace(regex, (match) => {
        // Match includes the quotes, we should preserve the quotes
        const quote = match[0];
        return `${quote}${cloudUrl}${quote}`;
    });
  }
  
  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf-8');
    console.log(`Updated paths in ${path.relative(projectRoot, filePath)}`);
  }
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else {
      const ext = path.extname(fullPath).toLowerCase();
      if (validExtensions.includes(ext)) {
        processFile(fullPath);
      }
    }
  }
}

console.log("Updating paths...");
for (const dir of directoriesToScan) {
  const fullDirPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullDirPath)) {
     processDirectory(fullDirPath);
  }
}
console.log("Paths updated!");
