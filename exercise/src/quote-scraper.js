const pup = require('puppeteer');

class QuoteScraper {
  constructor() {
    this.browser = null;
    this.page = null;
  }

  async init() {
    this.browser = await pup.launch({ headless: false });
    this.page = await this.browser.newPage();

    await this.page.setViewport({ width: 800, height: 600 });
    this.page.on('console', consoleObj => console.log(consoleObj.text()));
  }

  async run() {
    await this.page.goto('http://quotes.toscrape.com/')
    // Logic here
  }

  async stop() {
    await this.browser.close();
  }
}

module.exports = QuoteScraper;
