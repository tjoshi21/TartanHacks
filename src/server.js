var express = require('express');
var http = require('http');

var path = require('path');
/* var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var errorHandler = require('express-error-handler');
var expressSession = require('express-session'); */

// var db = require('./lib/db')
var config = require('./config');

//application
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.set('view options', { layout: false });

/*app.use(bodyParser.urlencoded({
  extended: true
}));

 app.use(bodyParser.json());
app.use(cookieParser(config.cookieParser)); */

app.use('/public',express.static(__dirname + '/public'));
/* app.use('/img',express.static(path.join(__dirname, 'public/images')));
app.use('/js',express.static(path.join(__dirname, 'public/javascripts')));
app.use('/css',express.static(path.join(__dirname, 'public/css'))); */
GLOBAL.projdir = __dirname

//app.use(errorHandler({ dumpExceptions: true, showStack: true }));

// Register server routes
////////////////////////////////////////

app.get('/', function (req, res) {
  	return res.render('homepage.pug');
});

app.get('/login',function(req,res){
    return res.render('login.pug');
});


// Launch server
////////////////////////////////////////
var server = http.createServer(app)
var port = process.env.PORT || config.admin_port
server.listen(port, function () {
  console.log('Server listening at port %d', port)
})


