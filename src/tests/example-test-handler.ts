import * as puppeteer from 'puppeteer';
import { getChrome } from '../infrastructure/chrome-script';

module.exports.run = async () => {
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const url = 'https://www.google.com';
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  
  browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Test run complete',
    }),
  };
};
