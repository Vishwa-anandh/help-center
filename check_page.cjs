const puppeteer = require('puppeteer');

(async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
    page.on('requestfailed', request => console.log('REQUEST FAILED:', request.url(), request.failure().errorText));

    console.log("Navigating to http://localhost:3000 ...");
    await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });
    
    // Also get the HTML body
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    console.log("BODY HTML:", bodyHTML.substring(0, 500)); // just print first 500 chars

    await browser.close();
  } catch (err) {
    console.error("Script Error:", err);
  }
})();
