const fs = require('fs');
const QuoteScraper = require('./src/quote-scraper');

(async function() {
  let bot = new QuoteScraper();

  await bot.init();
  let quotes = await bot.run();
  await bot.stop();

  fs.writeFileSync('./out.json', JSON.stringify(quotes, null, 2, null));
})();
