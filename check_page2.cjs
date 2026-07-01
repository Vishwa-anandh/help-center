const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.toString()));

  console.log("Navigating to http://localhost:3000 ...");
  await page.goto('http://localhost:3000/', { waitUntil: 'networkidle0' });
  
  const html = await page.evaluate(() => document.querySelector('main') ? document.querySelector('main').innerHTML : 'NO MAIN TAG');
  console.log("MAIN HTML: ");
  console.log(html);

  await browser.close();
})();
