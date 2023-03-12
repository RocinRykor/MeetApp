import puppeteer from 'puppeteer';

/*
* RETROSPECTIVE:
* I am going make a note here about some issues that I encountered just trying to get puppeteer to behave correctly
* The crux of the issue it that, for whatever reason, the latest version of Puppeteer doesn't launch correctly and when running the tests it came back with the issue
* Cannot find module 'puppeteer-core/internal/puppeteer-core.js' from 'node_modules/puppeteer/lib/cjs/puppeteer/puppeteer.js'
* Quite a bit of searching later I discovered the way around this problem is with an older version of puppeteer, so I had to manually install version 18.1.0
* */

describe('show/hide an event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    jest.setTimeout(30000);
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .event__details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide its details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .event__Details');
    expect(eventDetails).toBeNull();
  });

});