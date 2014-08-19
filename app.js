var express = require('express');
var swig = require('swig');
var path = require('path');

var app = express();

app.get('/', function(req, res){
	var filepath = path.join(__dirname, 'tpl/index.html');
	var tpl = swig.compileFile(filepath);
	res.send(tpl());
});

app.use("/bower", express.static(path.join(__dirname, 'bower_components')));

var server = app.listen(80, 'builder.websites.ca', function() {
	console.log('Listening, %s:%d', server.address().address, server.address().port);
});