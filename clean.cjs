const fs = require('fs');

function processFile(path) {
  let content = fs.readFileSync(path, 'utf8');
  
  // Remove dark: classes
  content = content.replace(/\bdark:[^\s\"'\`]+/g, '');
  // Clean up extra spaces left over
  content = content.replace(/\s{2,}/g, ' ');

  fs.writeFileSync(path, content);
}

processFile('src/App.tsx');
processFile('src/components/ArticleView.tsx');
console.log('Cleaned');
