var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();




//允许所有js来进行访问
//	app.all('*', function(req, res, next) {
//	    res.header("Access-Control-Allow-Origin", "*");
//	    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
//	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
//	    res.header("X-Powered-By",' 3.2.1')
//	    if(req.method=="OPTIONS") res.send(200);/*让options请求快速返回*/
//	    else  next();
//	});
//也可以这样，允许部分IP地址的端口来访问(白名单模式/多个名单)
//	var allowCrossDomain = function(req, res, next) {54535
//	    
//	    if( req.headers.origin == 'http://127.0.0.1:49706'||req.headers.origin == 'http://localhost:8080'
//	      ){
//	        res.header('Access-Control-Allow-Origin', req.headers.origin);
//	        res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
//	        res.header('Access-Control-Allow-Headers', 'Content-Type');
//	        res.header('Access-Control-Allow-Credentials','true');
//	    }
//	    next();
//	};
//	app.use(allowCrossDomain);













// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'fff', //一个String类型的字符串，作为服务器端生成session的签名
    resave: true,   //是否允许session重新设置，要保证session有操作的时候必须设置这个属性为true
    cookie: {maxAge: 6000 * 1000}, //设置maxAge是Nms，即Nms后session和相应的cookie失效过期
    saveUninitialized:true //初始化session时是否保存到存储。默认为true， 但是(后续版本)有可能默认失效，所以最好手动添加。
}));

app.use('/*', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
