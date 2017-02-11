var express = require('express');
var http = require('http');

var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressSession = require('express-session');
var errorHandler = require('express-error-handler');
var d3 = require("d3");

// var db = require('./lib/db')
var config = require('./config');

//application
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', { layout: false });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());
app.use(cookieParser(config.cookieParser));

app.use('/public',express.static(__dirname + '/public'));
GLOBAL.projdir = __dirname

app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Register server routes
////////////////////////////////////////

// require('./routes/admin')(app)
// require('./routes/api')(app)
// require('./routes/xhr')(app)
app.get('/', function (req, res) {
  	return res.render('gig_01.jade');
});

app.post('/',function(req,res){
	var name = req.body.gig;
	return res.redirect('/gig/' + name);
});

// Launch server
////////////////////////////////////////
var server = http.createServer(app)
var port = process.env.PORT || config.admin_port
server.listen(port, function () {
  console.log('Server listening at port %d', port)
})


