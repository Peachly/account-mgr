var yahooFinance = require('yahoo-finance');

function FinancialDataAdapter() {
}

FinancialDataAdapter.prototype.snapshot = function(o, cb) {
	yahooFinance.snapshot(o, cb);
}

module.exports = FinancialDataAdapter;