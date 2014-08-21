var express = require('express');
var swig = require('swig');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.use("/bower", express.static(path.join(__dirname, 'bower_components')));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/peach');
Schema = mongoose.Schema;
ObjectId = Schema.ObjectId;
 
var Account = require('./data/Account');
var Fund = require('./data/Fund');

app.get('/admin', function(req, res){
	Account.find().exec(function(err, accounts) {
		res.render('admin-index', {accounts:accounts});
	});
});
app.post('/admin/add_account', function(req, res){
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;
	var a = new Account({name:name, email:email, password:password});
	a.save();
	res.redirect('/admin');
});
app.get('/admin/delete_account', function(req, res){
	Account.findOne({id:req.body.accountId}).exec(function(err, a) {
		a.remove();
		res.redirect('/admin');		
	});
});
app.get('/admin/funds', function(req, res){
	Fund.find().exec(function(err, funds) {
		res.render('admin-funds', {funds:funds});
	});
});
app.post('/admin/add_fund', function(req, res){
	var ticker = req.body.ticker;
	var f = new Fund({ticker:ticker});
	f.save();
	res.redirect('/admin/funds');
});
app.get('/admin/update_prices', function(req, res){
	var PriceUpdater = require("./biz/PriceUpdater");
	var FinancialDataAdapter = require("./biz/FinancialDataAdapter");
	var updater = new PriceUpdater(new FinancialDataAdapter());
	Fund.find().exec(function(err, funds) {
		updater.update(funds);
		res.redirect('/admin/funds');
	});
});

app.get('/', function(req, res){
	res.render('index', { /* template locals context */ });
});
app.get('/:accountId', function(req, res){
	Account.findOne({_id:ObjectId(req.params.accountId)}).exec(function(err, a) {
		res.render('account', {account:a});
	});
});

var server = app.listen(3000, 'localhost', function() {
	console.log('Listening, %s:%d', server.address().address, server.address().port);
});
