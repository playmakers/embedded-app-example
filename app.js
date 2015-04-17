
var express             = require('express'),
  compression           = require('compression'),
  morgan                = require('morgan'),
  bodyParser            = require('body-parser'),
  session               = require('express-session')
  shopifyAuthController = require('./controllers/shopify_auth')
  shopifyAPI            = require('shopify-node-api');

var port = process.env.PORT || 3000,
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
    apiKey: shopifyOptions.shopify_api_key,
    shopOrigin: req.session.shopUrl,
    accessToken: req.session.oauth_access_token,
  });
});

app.get('/products', function (req, res) {
  res.render('products', {
    apiKey: shopifyOptions.shopify_api_key,
    shopOrigin: req.session.shopUrl || 'playmakers-test.myshopify.com',
  });
});

// Shopify Proxy
app.get('/shopify/:action.json', function (req, res) {
  Shopify.get('/admin/' + req.params.action + '.json', function(err, data, headers) {
    res.send(data)
  });
});

app.post('/shopify/:action.json', function (req, res) {
  Shopify.post('/admin/' + req.params.action + '.json', post_data, function(err, data, headers) {
    res.send(data)
  });
});

app.put('/shopify/:action.json', function (req, res) {
  Shopify.put('/admin/' + req.params.action + '.json', put_data, function(err, data, headers) {
    res.send(data)
  });
});

app.delete('/shopify/:action.json', function (req, res) {
  Shopify.delete('/admin/' + req.params.action + '.json', function(err, data, headers) {
    res.send(data)
  });
});

var appAuth = new shopifyAuthController.ShopifyAuth(shopifyOptions, '/success');

app.get('/auth_app',      appAuth.initAuth);
app.get('/auth',          appAuth.startAuth);
app.get('/auth_token',    appAuth.getAccessToken);

// app.get('/render_app', routes.renderApp);

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});
