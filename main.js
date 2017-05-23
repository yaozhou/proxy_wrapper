SERVER_PORT = 21222


var express = require('express') ;

var app = express() ;
var bodyParser = require('body-parser') ;
var express_session = require('express-session') ;

app.use(bodyParser.json('2mb')) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express_session({secret: 'keyboard cat', resave:false, saveUninitialized: false})) ;
app.use(express.static('web')) ;

var server = app.listen(SERVER_PORT, function() {
	var host = server.address().address ;
	var port = server.address().port ;
	console.log('App listening at http://%s:%s', host, port) ;

})