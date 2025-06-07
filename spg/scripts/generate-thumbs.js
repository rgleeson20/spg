const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { glob } = require('glob');

const inputDir = path.join(__dirname, '../src/assets/full');
const outputDir = path.join(__dirname, '../src/assets/thumb');

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}

// Process all jpg files
async function processImages() {
    try {
        const files = await glob(path.join(inputDir, '*.jpg'));
        
        for (const file of files) {
            const filename = path.basename(file, '.jpg');
            const outputPath = path.join(outputDir, `${filename}.webp`);

            try {
                await sharp(file)
                    .resize(400)
                    .webp()
                    .toFile(outputPath);
                console.log(`Generated thumbnail for ${filename}`);
            } catch (err) {
                console.error(`Error processing ${filename}:`, err);
            }
        }
    } catch (err) {
        console.error('Error finding files:', err);
    }
}

processImages(); 