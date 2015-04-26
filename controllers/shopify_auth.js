/*
 * Shopify Auth
 */

var shopifyAPI = require('shopify-node-api');

exports.ShopifyAuth = function(options, authUri, successUri) {
  var self = this;

  /*
   * Get /auth_app
   *
   * initiates the Shopify App authorisation
   */
  this.initAuth = function(req, res){
    if (!req.session.access_token) {
      res.render('escape_iframe', {
        authPath: authUri
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
    var shop = req.query.shop,
      authUrl = self.ShopifyAPI(shop).buildAuthURL();
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
        // TODO: use proper auth strucure
        req.session.shopUrl = shop;
        req.session.access_token = data['access_token'];
        res.redirect(successUri);
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
