import * as puppeteer from 'puppeteer';
import { getChrome } from '../infrastructure/chrome-script';

module.exports.run = async (event, context) => {
  console.log('event', event);
  console.log('context', context);
  const chrome = await getChrome();
  const browser = await puppeteer.connect({
    browserWSEndpoint: chrome.endpoint
  });
  const url = 'https://www.google.com';
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: 'networkidle0' });
  const html = await page.evaluate(() => document.body.innerHTML);
  console.log(html);
  browser.close();

  return {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Test run complete',
    }),
  };
};
