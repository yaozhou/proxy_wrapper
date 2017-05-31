SERVER_PORT = 8021


var express = require('express') ;

var app = express() ;
var bodyParser = require('body-parser') ;
var express_session = require('express-session') ;

var campto = require('campto') ;
var campto_option = ({
	recognitionDifficulty : 'hard',
}) 


app.use(bodyParser.json('2mb')) ;
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express_session({secret: 'keyboard cat', resave:false, saveUninitialized: false})) ;
app.use(express.static('web')) ;



app.get('/verify_img', function(req, res) {
	campto(campto_option).then(function(captcha) {
		console.log('verify=' + captcha.result) ;
		req.session['verify'] = captcha.result + '' ;
		res.contentType = 'image/png'
		res.send(captcha.buffer)
	}).catch(function(err) {
		res.status(500).send(err) ;
	})
})

app.post('/api/verify', function(req, res) {
	console.log('client verify = ' + JSON.stringify(req.body)) ;
	if (req.body.verify_str == req.session['verify'])
		res.send({code : 0, url : 'https://www.google.com.hk', 
			server: 'http://www.zhangpeng.us:21221/includes/process.php?action=update'}) ;
	else
		res.send({code : 1}) ;
})


var server = app.listen(SERVER_PORT, function() {
	var host = server.address().address ;
	var port = server.address().port ;
	console.log('App listening at http://%s:%s', host, port) ;


})



