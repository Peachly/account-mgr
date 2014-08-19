var mongoose = require('mongoose');

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var fundSchema = new Schema({
	name: String,
	exchange: String,
	ticker: String,
	latestPrice: Number,
	latestUpdate: {type: Date, default: Date.now}
});
 
module.exports = mongoose.model('Fund', fundSchema);