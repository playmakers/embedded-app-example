
var express = require('express'),
  morgan = require('morgan'),
  bodyParser = require('body-parser'),
  session = require('express-session')
  shopifyAuthController = require('./controllers/shopify_auth');
//   shopifyAPI = require('shopify-node-api');


// var Shopify = new shopifyAPI({
//                 shop: 'MYSHOP', // MYSHOP.myshopify.com
//                 shopify_api_key: process.env.SHOPIFY_APP_API_KEY,
//                 shopify_shared_secret: process.env.SHOPIFY_APP_API_SECRET,
//                 shopify_scope: 'write_products',
//                 redirect_uri: process.env.SHOPIFY_REDIRECT_URI || "http://localhost:3000",
//             });

var port = process.env.PORT || 3000,
  shopifyOptions = {
    shopify_api_key:       process.env.SHOPIFY_APP_API_KEY,
    shopify_shared_secret: process.env.SHOPIFY_APP_API_SECRET,
    shopify_scope:        'read_products',
    redirect_uri:          process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000'
  };

var app = express();

// //statically serve from the 'public' folder
// app.use(express.static(path.join(__dirname, 'public')));

//log all requests
app.use(morgan('combined'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(session({
  secret: process.env.SESSION_SECRET || 'secret',
  resave: false,
  saveUninitialized: true,
}));

//use jade templating engine for view rendering
app.set('view engine', 'jade');

//use the environment's port if specified
app.set('port', port);


var url = require('url');

// routes
app.get('/', function (req, res) {
  if (!req.session.oauth_access_token) {
    var parsedUrl = url.parse(req.originalUrl, true);
    if (parsedUrl.query && (shopUrl = parsedUrl.query.shop)) {
      req.session.shopUrl = 'https://' + shopUrl;
      res.redirect("/auth_app");
    } else {
      res.redirect("/login");
    }
  }
  else {
    res.redirect("/success");
  }
});

app.get('/success', function (req, res) {
  res.render('index', {
    apiKey: 'Hey',
    shopOrigin: 'Hello there!' + req.session.shopUrl
  });
});

var appAuth = new shopifyAuthController.ShopifyAuth(shopifyOptions, '/success');

app.get('/auth_app',      appAuth.initAuth);
app.get('/escape_iframe', appAuth.escapeIframe);
app.get('/auth_code',     appAuth.getCode);
app.get('/auth_token',    appAuth.getAccessToken);

// app.get('/render_app', routes.renderApp);

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});


// /*
//  * Get /
//  *
//  * if we already have an access token then
//  * redirect to render the app, otherwise
//  * redirect to app authorisation.
//  */
exports.index = function(req, res){
    if (!req.session.oauth_access_token) {
        var parsedUrl = url.parse(req.originalUrl, true);
        if (parsedUrl.query && parsedUrl.query.shop) {
            req.session.shopUrl = 'https://' + parsedUrl.query.shop;
        }

        res.redirect("/auth_app");
    }
    else {
        res.redirect("/render_app");
    }
};

// /*
//  * Get /render_app
//  *
//  * render the main app view
//  */
// exports.renderApp = function(req, res){
//     res.render('app_view', {
//         title: 'My App Title',
//         apiKey: app.nconf.get('oauth:api_key'),
//         shopUrl: req.session.shopUrl
//     });
// };
