
var express             = require('express'),
  compression           = require('compression'),
  morgan                = require('morgan'),
  bodyParser            = require('body-parser'),
  session               = require('express-session'),
  shopifyApiController  = require('./controllers/shopify_api'),
  shopifyAuthController = require('./controllers/shopify_auth'),
  shopifyAPI            = require('shopify-node-api'),
  url                   = require('url');

var port = process.env.PORT || 3000,
  development = (process.env.ENV == 'development'),
  esdk = (process.env.ESDK == 'true'),
  shopifyOptions = {
    shopify_api_key:       process.env.SHOPIFY_APP_API_KEY,
    shopify_shared_secret: process.env.SHOPIFY_APP_API_SECRET,
    shopify_scope:        'read_products',
    redirect_uri:          process.env.SHOPIFY_REDIRECT_URI || 'http://localhost:3000',
    access_token:          process.env.TOKEN,
    shop:                  process.env.SHOP
  },
  Shopify = new shopifyAPI(shopifyOptions);

var app = express();
app.use(compression());

//statically serve from the 'public' folder
app.use(express.static(__dirname + '/public'));

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

if (development) {
  console.log("Starting in Development Mode");
  var browserify_express = require('browserify-express');

  app.use(browserify_express({
      entry: __dirname + '/client/init.js',
      watch: __dirname + '/client',
      mount: 'script.js',
      write_file: __dirname + '/public/scripts.js',
      verbose: true,
      minify: true
  }));
}

//use the environment's port if specified
app.set('port', port);

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
    apiKey: shopifyOptions.shopify_api_key,
    shopOrigin: req.session.shopUrl,
    accessToken: req.session.oauth_access_token,
  });
});

app.get('/products', function (req, res) {
  res.render('products', {
    esdk: esdk,
    apiKey: shopifyOptions.shopify_api_key,
    shopOrigin: req.session.shopUrl || shopifyOptions.shop
  });
});

var shopifyApi = new shopifyApiController.ShopifyApi(shopifyOptions);
app.get(   '/shopify/:action.json', shopifyApi.get);
app.post(  '/shopify/:action.json', shopifyApi.post);
app.put(   '/shopify/:action.json', shopifyApi.put);
app.delete('/shopify/:action.json', shopifyApi.delete);

var shopifyAuth = new shopifyAuthController.ShopifyAuth(shopifyOptions, '/success');
app.get('/auth_app',   shopifyAuth.initAuth);
app.get('/auth',       shopifyAuth.startAuth);
app.get('/auth_token', shopifyAuth.getAccessToken);

// app.get('/render_app', routes.renderApp);

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
