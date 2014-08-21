var Fund = require('../data/Fund');

function PriceUpdater(financialDataAdapter) {
	this.financialDataAdapter = financialDataAdapter;
}

PriceUpdater.prototype.update = function(funds) {
	var tickers = funds.map(function(f) { return f.ticker });
	console.log('REQUESTING:');
	console.dir(tickers);
	this.financialDataAdapter.snapshot({
	  symbols: tickers,
	  fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
	}, function (err, data, url, symbol) {
		console.log('FUNDS DATA:');
		console.dir(data);
		console.log('ERRORS:');
		console.dir(err);
		for (i in funds) {
			var ticker = funds[i].ticker;
			if (!(ticker in data)) {
				continue;
			}
			if (data[ticker].lastTradeDate == 'N/A') {
				continue;
			}
			funds[i].latestPrice = data[ticker].lastTradePriceOnly;
			funds[i].latestUpdate = Date.now();
			funds[i].name = data[ticker].name;
			funds[i].save();
		}
	});

}
 
module.exports = PriceUpdater;
