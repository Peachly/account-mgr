var mongoose = require('mongoose');

Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;

var accountSchema = new Schema({
	name: String,
	email: String,
	password: String,
	added: {type: Date, default: Date.now},
	post: String
});
 
module.exports = mongoose.model('Account', accountSchema);