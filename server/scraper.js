const cheerio = require('cheerio');
const request = require('request');
const mcache = require('memory-cache');

const beaches = {
  venice: 'http://www.surfline.com/surf-report/venice-beach-southern-california_4211/',
  trestles: 'http://www.surfline.com/surf-report/lower-trestles-southern-california_4740/',
  ventura: 'http://www.surfline.com/surf-report/c-st-overview-southern-california_4200/',
  'el porto': 'https://www.surfline.com/surf-report/el-porto-north/584204214e65fad6a7709d24',
  hermosa: 'https://www.surfline.com/surf-report/hermosa-beach/5842041f4e65fad6a7708904',
  malibu: 'https://www.surfline.com/surf-report/county-line/5842041f4e65fad6a7708813',
};

function cleanString(str) {
  return str.replace(/\r?\n|\r|-/g, '').trim();
}

function surfToObject($) {
  const todaysDate = new Date();
  let dateString = todaysDate.toDateString();
  return {
    tide: 'Tide: ' + $('.sl-reading').text().split('FT')[0] + ' FT.',
    swells: $('.sl-spot-forecast-summary__stat-swells').text().split('Swells')[1],
    day: dateString,
    conditionDetails: cleanString($('.sl-spot-report__report-text p').text()).split('ShortTerm')[0],
    waveHeight: $('.quiver-surf-height').text().split('FT')[0],
    forecast: cleanString($('.sl-spot-report__report-text p').text()).split('ShortTerm')[1],
  };
}

function oneBeach(url) {
  return new Promise ((resolve, reject) => {
    request(url, (error, response, html) => {
      const $ = cheerio.load(html);
      const surf = {
        conditionOverview: $('#observed-spot-conditions').text(),
        day: cleanString($('div .module span strong').text()).split('at ')[0],
        conditionDetails: cleanString($('#observed-spot-conditions-summary p').text()),
        waveHeight: $('#observed-wave-range').text(),
        waveDescription: cleanString($('#observed-wave-description').text()),
      };
      console.log(surf)
      resolve(surf);
    });
  });
}

const scrapeController = {
  getData: (req, res) => {
    const beachName = req.params['0'];
    if (mcache.get(beachName)) {
      res.send(mcache.get(beachName));
      return;
    }
    request(beaches[beachName], (error, response, html) => {
      const $ = cheerio.load(html);
      const surf = surfToObject($);
      mcache.put(beachName, surf);
      res.send(surf);
    });
  },

  getAllData: (req, res) => {
    if (mcache.get('all')) {
      res.send(mcache.get('all'));
      return;
    }
    const allBeachData = [
      oneBeach(beaches.venice),
      oneBeach(beaches.trestles),
      oneBeach(beaches.ventura),
    ];
    (() => {Promise.all(allBeachData).then((fulfilled) => {
      mcache.put('all', fulfilled);
      res.send(fulfilled);
    });
    })();
  },

  // end of scrape controller
};

module.exports = scrapeController;
