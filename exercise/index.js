const QuoteScraper = require('./src/quote-scraper');

(async function() {
  let bot = new QuoteScraper();

  await bot.init();
  await bot.run();
  await bot.stop();
})()
