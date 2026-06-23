import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const colorMapping = {
  '#1a73e8': '#6366f1',
  '#0b57d0': '#4338ca',
  '#0842a0': '#3730a3',
  '#e8f0fe': '#e0e7ff',
  '#202124': '#111827',
  '#3c4043': '#374151',
  '#5f6368': '#4b5563',
  '#dadce0': '#e5e7eb',
  '#f1f3f4': '#f3f4f6',
  '#f8f9fa': '#f9fafb',
};

const textMapping = [
  [/Google Chrome/g, 'Maitsys One'],
  [/googlechrome\.dmg/g, 'maitsysone.dmg'],
  [/Chromebook/g, 'MaitsysBook'],
  [/Chrome/g, 'Maitsys'],
];

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDir(fullPath);
    } else if (stat.isFile() && /\.(tsx|ts|css|html)$/.test(file)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const [key, value] of Object.entries(colorMapping)) {
        if (content.includes(key)) {
          content = content.split(key).join(value);
          modified = true;
        }
      }
      
      for (const [regex, replacement] of textMapping) {
        if (regex.test(content)) {
          content = content.replace(regex, replacement);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'src'));
