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
 
var Account = require('./data/Account');

app.get('/', function(req, res){
	res.render('index', { /* template locals context */ });
});

app.get('/admin', function(req, res){
	//res.render('admin-index', {});
	Account.find().exec(function(err, accounts) {
		console.log("after exec");
		console.dir(accounts);
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
	Account.findOne({id:req.body.account_id}).exec(function(err, a) {
		a.remove();
		res.redirect('/admin');		
	});
});

var server = app.listen(80, 'builder.websites.ca', function() {
	console.log('Listening, %s:%d', server.address().address, server.address().port);
});