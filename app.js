
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser');

// //load settings from environment config
// nconf.argv().env().file({
//     file: (process.env.NODE_ENV || 'dev') + '-settings.json'
// });
// exports.nconf = nconf;

//configure express
var app = express();

//log all requests
app.use(morgan('combined'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//setup encrypted session cookies
// app.use(express.cookieParser());
// app.use(express.session({
//     secret: "--express-session-encryption-key--"
// }));

// //statically serve from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

//use jade templating engine for view rendering
app.set('view engine', 'jade');

//use the environment's port if specified
app.set('port', process.env.PORT || 3000);

// //configure routes
app.get('/', function (req, res) {
  res.render('index', {
    apiKey: 'Hey',
    shopOrigin: 'Hello there!'
  });
})

// var appAuth = new shopifyAuth.AppAuth();
// app.get('/auth_app', appAuth.initAuth);
// app.get('/escape_iframe', appAuth.escapeIframe);
// app.get('/auth_code', appAuth.getCode);
// app.get('/auth_token', appAuth.getAccessToken);

// app.get('/render_app', routes.renderApp);

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
