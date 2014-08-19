var Fund = require('../data/Fund');

function PriceUpdater(financialDataAdapter) {
	this.financialDataAdapter = financialDataAdapter;
}

PriceUpdater.prototype.update = function(funds) {
	console.dir(funds);

	var tickers = funds.map(function(f) { return f.ticker });

	this.financialDataAdapter.snapshot({
	  symbols: tickers,
	  fields: ['s', 'n', 'd1', 'l1', 'y', 'r'],
	}, function (err, data, url, symbol) {
		for (i in funds) {
			var ticker = funds[i].ticker;
			if (data[ticker].lastTradeDate == 'N/A') {
				funds[i].remove();
			} else {
				funds[i].latestPrice = data[ticker].lastTradePriceOnly;
				funds[i].latestUpdate = Date.now();
				funds[i].name = data[ticker].name;
				console.log("\nUPDATE:");
				console.dir(funds[i]);
				funds[i].save();
			}
		}
	});

}
 
module.exports = PriceUpdater;