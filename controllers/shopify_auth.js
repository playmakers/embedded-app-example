/*
 * Shopify Auth
 */

var shopifyAPI = require('shopify-node-api');

exports.ShopifyAuth = function(options, successUri) {
  var self = this;

  /*
   * Get /auth_app
   *
   * initiates the Shopify App authorisation
   */
  this.initAuth = function(req, res){
    if (!req.session.oauth_access_token) {
      res.render('escape_iframe', {
        authPath: '/auth'
      });
    } else {
      res.redirect(successUri);
    }
  };

  /*
   * Get /auth_code
   *
   * gets the temporary token which we can exchange
   * for a permanent token. User may be prompted to accept
   * the scope being requested
   */
  this.startAuth = function(req, res) {
    var shop = 'https://' + req.query.shop;
    var authUrl = self.ShopifyAPI(shop).buildAuthURL();
    console.log(authUrl);
    res.redirect(authUrl);
  };

  /*
   * Get /auth_token
   *
   * get the permanent access token which is valid
   * for the lifetime of the app install, it does
   * not expire
   */
  this.getAccessToken = function(req, res) {
    var shop = req.session.shopUrl || req.query.shop;

    self.ShopifyAPI(shop).exchange_temporary_token(req.query, function(err, data) {
      if (err) {
        res.sendStatus(500);
        return;
      } else {
        req.session.shopUrl = shop;
        console.log(data['access_token']);
        req.session.oauth_access_token = data['access_token'];
        res.redirect(successUri);
      }
    });
  };

  this.ShopifyAPI = function(shopUrl) {
    return new shopifyAPI({
      shop: shopUrl,
      shopify_api_key: options.shopify_api_key,
      shopify_shared_secret: options.shopify_shared_secret,
      shopify_scope: options.shopify_scope,
      redirect_uri: options.redirect_uri + '/auth_token'
    });
  }
}
