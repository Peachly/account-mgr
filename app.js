var express = require('express');
var swig = require('swig');
var path = require('path');

var app = express();
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
app.set('view cache', false);
swig.setDefaults({ cache: false });

app.get('/', function(req, res){
	res.render('index', { /* template locals context */ });
});

app.use("/bower", express.static(path.join(__dirname, 'bower_components')));
app.use("/public", express.static(path.join(__dirname, 'public')));

var server = app.listen(80, 'builder.websites.ca', function() {
	console.log('Listening, %s:%d', server.address().address, server.address().port);
});