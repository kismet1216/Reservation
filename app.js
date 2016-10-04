/*var express = require('express'),
    app = express(),
    routes = require('./routes'),
    api = require('./routes/api'),
    server = require('http').createServer(app),
    passport = require('passport'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    serverStatic = require('serve-static'),
    LocalStrategy = require('passport-local').Strategy;*/
var express = require('express')
    , app = express()
    , morgan = require('morgan')
    , compress = require('compression')
    , methodOverride = require('method-override')
    , routes = require('./routes')
    , api = require('./routes/api')
    , passport = require('passport')
    ,bodyParser = require('body-parser')
    ,cookieParser = require('cookie-parser')
    ,session = require('express-session')
    ,LocalStrategy = require('passport-local').Strategy
    ,serverStatic = require('serve-static'),
    mongoose = require('mongoose'),
    server = require('http').createServer(app);
var dbconfig = require('./routes/database.js');
//require('./routes/passport')(passport);

var USER = {username: 'admin', password: 'admin'};

mongoose.connect(dbconfig.url);
app.configure(function() {
  app.set('port', process.env.OPENSHIFT_NODEJS_PORT || 3000);
  app.set('ipaddr', process.env.OPENSHIFT_NODEJS_IP || "localhost");
  app.locals.pretty = true;
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  //app.use(expressSession({secret:'secretKey'}));
  app.use(express.session({ secret: 'secret!' }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(express.methodOverride());
  app.use(express.static(__dirname + '/public'));
  app.use('/components', express.static(__dirname + '/components'));
  app.use(app.router);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});
app.use(methodOverride());
app.use(cookieParser());

app.use(session({
  secret : 'almvnirtgd#$DFsa25452*AYD*D*S!@!#adsda))Ddsadsax',
  cookie: {httpOnly: true, secure: false, maxAge: 86400000},
  store: new session.MemoryStore()
}));


passport.use(new LocalStrategy(function(username, password, done) {
  if (USER.username === username) {
    if (password === USER.password) {
      done(null, USER);
    } else {
      done(null, false, {msg: 'Incorrect password'});
    }
  } else {
    done(null, false, {msg: 'Could not find user with username ' + username});
  }
}));



app.use('/', serverStatic(__dirname + '/app'));

var isLoggedIn = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.send({
      msg: 'Please login to access this information'
    }, 400);
  }
};

app.post('/api/login', function(req, res, next) {
  passport.authenticate('local', function(err, user) {
    if (err) {return next(err); }
    if (!user) { return res.send({loginStatus: false, msg: 'Unable to login'}, 400); }
    req.logIn(user, function(err) {
      if (err) { return res.send({msg: 'Error logging in', err: err}, 500); }
      return res.send({loginStatus: true, user: user});
    });
  })(req, res, next);
});

app.get('/api/session', function(req, res) {
  res.send({
    loginStatus: true,
    user: req.user
  });
});
app.get('/api/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/', routes.index); // main page

app.get('/api/reservation', api.reservations);
app.get('/api/reservation/:id', api.reservation); 
app.get('/api/reservation/search/:confirmNo', api.searchcn);
app.post('/api/reservation', api.add); 
app.put('/api/reservation/:id', api.edit); 
app.delete('/api/reservation/delete/:id', api.delete); 
//app.post('/login', passport.authenticate('local-login', {
//  successRedirect : '#/owner', 
//  failureRedirect : '#/login', 
//}));

server.listen(app.get('port'), app.get('ipaddr'), function(){
  console.log("Express server up and running for the API on port " + app.get('port') + " on IP " + app.get('ipaddr'));
});