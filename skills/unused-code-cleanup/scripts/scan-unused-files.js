const fs = require("node:fs");
const path = require("node:path");

// Configuration
const SRC_DIR = process.argv[2] || "./src"; // Default to ./src if not provided
const OUTPUT_FILE = path.join(
  process.cwd(),
  "unused-code-analysis",
  "unused-code-analysis-files.json",
);

// Helper to recursively find files
function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) {
    return arrayOfFiles;
  }

  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (
        file !== "node_modules" &&
        file !== ".git" &&
        file !== "dist" &&
        file !== "build"
      ) {
        getAllFiles(fullPath, arrayOfFiles);
      }
    } else {
      // Include only js/ts/jsx/tsx files
      // We are looking for UNUSED files of these types
      if (/\.(js|jsx|ts|tsx)$/.test(file)) {
        arrayOfFiles.push(fullPath);
      }
    }
  });

  return arrayOfFiles;
}

function scanForUnusedFiles() {
  console.log(`Scanning directory: ${path.resolve(SRC_DIR)}`);

  if (!fs.existsSync(SRC_DIR)) {
    console.error(`Error: Directory ${SRC_DIR} does not exist.`);
    console.log("Usage: node scan-unused-files.js [path-to-src]");
    process.exit(1);
  }

  const allFiles = getAllFiles(SRC_DIR);
  console.log(`Found ${allFiles.length} files to analyze.`);

  // 1. Identify potential targets (files that might be unused)
  // We exclude index files from being "targets" usually because they are barrel files,
  // but if an index file is unused, it should be flagged too.
  // For simplicity, ANY .ts/.tsx/.js/.jsx file is a candidate.
  const filesToCheck = allFiles.map((filePath) => {
    const ext = path.extname(filePath);
    const fileName = path.basename(filePath, ext); // filename without extension
    const name = path.basename(filePath); // filename with extension

    return {
      path: filePath,
      name: fileName, // e.g. "MyComponent"
      fullName: name, // e.g. "MyComponent.tsx"
      usagesFound: 0,
    };
  });

  console.log(`Analyzing usage for ${filesToCheck.length} files...`);

  // 2. Count usages
  // Optimization: Pre-read all file contents into memory
  const fileContents = allFiles.map((f) => ({
    path: f,
    content: fs.readFileSync(f, "utf-8"),
  }));

  filesToCheck.forEach((targetFile, index) => {
    if (index % 50 === 0) process.stdout.write("."); // Progress indicator

    // How to detect usage?
    // 1. Import by name: "import ... from './MyComponent'"
    // 2. Import by path: "import ... from '@/components/MyComponent'"
    // 3. Usage in JSX: "<MyComponent"

    // Simplest robust heuristic for a script:
    // Search for the filename WITHOUT extension.
    // e.g. for "utils.ts", search for "utils"
    // CAUTION: This can yield false positives if filename is common (e.g. "types", "index").
    // But for "unused" analysis, false positives (thinking it IS used) is safer than false negatives (thinking it is unused).

    // Standard import patterns usually include the filename.
    const searchString = targetFile.name;

    // Skip checking "index" files for direct usage by name "index", because imports usually look like "import ... from './folder'".
    // Checking usage of index files is hard without parsing AST to see if parent folder is imported.
    // Strategy: If file is named 'index', skip the name regex check and treat it effectively as "Unknown/ManualCheck" or separate logic.
    // For now, let's keep it simple: strict name check.

    if (targetFile.name === "index") {
      targetFile.usagesFound = -1; // Special marker for "Check manually" or "Assume used"
      return;
    }

    const regex = new RegExp(`\\b${escapeRegExp(searchString)}\\b`, "g");
    let count = 0;

    fileContents.forEach((file) => {
      // Don't count self-usage
      if (path.resolve(file.path) === path.resolve(targetFile.path)) return;

      if (regex.test(file.content)) {
        count++;
      }
    });

    targetFile.usagesFound = count;
  });

  console.log("\nAnalysis complete.");

  // 3. Output to JSON
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  const outputContent = JSON.stringify(filesToCheck, null, 2);
  fs.writeFileSync(OUTPUT_FILE, outputContent);
  console.log(`Report written to ${OUTPUT_FILE}`);
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

scanForUnusedFiles();
