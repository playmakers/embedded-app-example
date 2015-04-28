/*
 * Shopify Auth
 */

var shopifyAPI = require('shopify-node-api');

exports.ShopifyAuth = function(options, loginUri, startAuthUri, successUri) {
  var self = this;

  this.requireAuth = function (req, res, next) {
    if (!req.session.access_token) {
      var shopUrl;
      if ((shopUrl = req.query.shop)) {
        req.session.shop = shopUrl;
        res.render('escape_iframe', {
          authPath: startAuthUri
        });
      } else {
        res.redirect(loginUri);
      }
    }
    else {
      next();
    }
  },

  this.startAuth = function(req, res) {
    var shop = req.session.shop || req.query.shop,
      authUrl = self.ShopifyAPI(shop).buildAuthURL();
    req.session.redirectTo = req.query.redirect;
    res.redirect(authUrl);
  };

  this.getAccessToken = function(req, res) {
    var shop = req.session.shop || req.query.shop;

    self.ShopifyAPI(shop).exchange_temporary_token(req.query, function(err, data) {
      if (err) {
        res.sendStatus(500);
        return;
      } else {
        // TODO: use proper auth strucure
        req.session.shop = shop;
        req.session.access_token = data['access_token'];
        if( (redirectTo = req.session.redirectTo)) {
          delete req.session.redirectTo;
          res.redirect(redirectTo);
        } else {
          res.redirect(successUri);
        }
      }
    });
  };

  this.ShopifyAPI = function(shop) {
    return new shopifyAPI({
      shop:                  shop,
      shopify_api_key:       options.shopify_api_key,
      shopify_shared_secret: options.shopify_shared_secret,
      shopify_scope:         options.shopify_scope,
      redirect_uri:          options.redirect_uri
    });
  }
}
