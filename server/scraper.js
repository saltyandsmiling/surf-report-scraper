const cheerio = require('cheerio');
const request = require('request');
const mcache = require('memory-cache');
const fetch = require('node-fetch');
const moment = require('moment');

const beaches = {
  venice: 'https://www.surfline.com/surf-report/venice-breakwater/590927576a2e4300134fbed8',
  trestles: 'https://www.surfline.com/surf-report/lower-trestles/5842041f4e65fad6a770888a',
  ventura: 'https://www.surfline.com/surf-report/c-st-/5842041f4e65fad6a7708828',
  'el porto': 'https://www.surfline.com/surf-report/el-porto-north/584204214e65fad6a7709d24',
  hermosa: 'https://www.surfline.com/surf-report/hermosa-beach/5842041f4e65fad6a7708904',
  malibu: 'https://www.surfline.com/surf-report/county-line/5842041f4e65fad6a7708813',
};

function cleanString(str) {
  return str.replace(/\r?\n|\r|-/g, '').trim();
}

function convertAngleToCompass(degrees) {
  const directionsIndex = Math.floor((degrees / 22.5) + 0.5);
  const compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  return compass[(directionsIndex % 16)];
}

function fetchAndProcessTides(url) {
  const locationId = url.split('/').pop();
  const surflineTideApiCall = `https://services.surfline.com/kbyg/spots/forecasts/tides?spotId=${locationId}&days=1&accesstoken=7fc56562b343878b456943a4216bfa4d08aadcbe`;
  return fetch(surflineTideApiCall)
    .then(res => res.json())
    .then(res => res.data.tides.filter(el => el.type !== 'NORMAL'))
    .then((tidesWithUnix) => {
      return tidesWithUnix.map((el) => {
        const formatedData = el;
        formatedData.timestamp = moment.unix(el.timestamp).local().format('h:mm a');
        return formatedData;
      });
    });
}

function fetchAndProcessWind(url) {
  const locationId = url.split('/').pop();
  const indexesToKeep = [6, 9, 12, 15, 18];
  const surflineWindApiCall = `https://services.surfline.com/kbyg/spots/forecasts/wind?spotId=${locationId}&days=1&intervalHours=1&accesstoken=7fc56562b343878b456943a4216bfa4d08aadcbe`;
  return fetch(surflineWindApiCall)
    .then(res => res.json())
    .then(res => res.data.wind.filter((el, ind) => indexesToKeep.includes(ind)))
    .then((partialWindInfo) => partialWindInfo.map((el) => {
      const formatedData = el;
      formatedData.timestamp = moment.unix(el.timestamp).local().format('h:mm a');
      formatedData.direction = convertAngleToCompass(formatedData.direction);
      delete formatedData.optimalScore;
      return formatedData;
    }),
    );
}

async function surfToObject($, url) {
  const cleanedLocationData = $('.sl-forecast-header__main__title')
    .text()
    .replace(' Surf Report & Forecast', '');
  const cleanedSwellData = $('.sl-spot-forecast-summary__stat-swells')
    .text()
    .replace('Swells', '')
    .split('º')
    .slice(0, 3);
  const tideInfo = await fetchAndProcessTides(url);
  const windInfo = await fetchAndProcessWind(url);
  return {
    location: cleanedLocationData,
    tides: tideInfo,
    swells: cleanedSwellData,
    wind: windInfo,
  };
}

function oneBeach(url) {
  return new Promise((resolve, reject) => {
    request(url, (error, response, html) => {
      const $ = cheerio.load(html);
      const surf = surfToObject($, url);
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
    Promise.all(allBeachData).then((fulfilled) => {
      mcache.put('all', fulfilled);
      res.send(fulfilled);
    });
  },

  // end of scrape controller
};

// conditionDetails: cleanString($('.sl-spot-report__report-text p').text()).split('ShortTerm')[0],
// surfHeight: $('.quiver-surf-height').text().split('FT')[0],
// forecast: cleanString($('.sl-spot-report__report-text p').text()).split('ShortTerm')[1],

module.exports = scrapeController;
