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
    await this.page.goto('http://quotes.toscrape.com/');

    let quotes = [];
    let isLastPage = false;

    while (!isLastPage) {
      let nextPageUrl = await this.getNextPageUrl();

      quotes.push(...(await this.extractQuotes()));

      isLastPage = nextPageUrl ? false : true;
      if (!isLastPage) await this.goNextPage(nextPageUrl);
    }

    return quotes;
  }

  async extractQuotes() {
    return await this.page.evaluate(() => {
      let quotesEl = [...document.querySelectorAll('.quote')];
      let quotes = [];

      for (let quoteEl of quotesEl) {
        let author = quoteEl.querySelector('.author').textContent;
        let content = quoteEl.querySelector('.text').textContent;
        let tags = [...quoteEl.querySelectorAll('.tag')];

        tags = tags.map(tagEl => tagEl.textContent);

        quotes.push({ author, content, tags });
      }
      return quotes;
    });
  }

  async getNextPageUrl() {
    let url;

    try {
      url = await this.page.$eval('.pager .next a', el => el.href);
    } catch (e) {
      url = null;
    }

    console.log(url)

    return url;
  }

  async goNextPage(url) {
    await this.page.goto(url);
  }

  async stop() {
    await this.browser.close();
  }
}

module.exports = QuoteScraper;
