import fs from 'fs';
import dotenv from 'dotenv'
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const filename = process.env.FILENAME;
if(!filename) {
    console.error('Error: FILENAME environment variable is not set.');
    process.exit(1);
}

const filePath = path.join(__dirname, filename);
const text = 'Hallo, this is text from fs and dotenv!';

fs.writeFileSync(filePath, text, 'utf8');
console.log(`File ${filename} successful created at ${filePath}`);

const content = fs.readFileSync(filePath, 'utf8');
console.log(`Contents of File ${filename}:`);
console.log(content);