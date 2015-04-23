/*
 * Shopify Api
 */

var shopifyAPI = require('shopify-node-api');

exports.ShopifyApi = function(options) {
  var self = this;

  this.get = function(req, res) {
    var action = req.params.action;
    self.Shopify(req).get('/admin/' + action + '.json', function(err, data, headers) {
      res.send(data[action])
    });
  },

  this.post = function(req, res) {
    var action = req.params.action;
    self.Shopify(req).post('/admin/' + action + '.json', post_data, function(err, data, headers) {
      res.send(data[action])
    });
  },

  this.put = function(req, res) {
    var action = req.params.action;
    self.Shopify(req).put('/admin/' + action + '.json', put_data, function(err, data, headers) {
      res.send(data[action])
    });
  },

  this.delete = function(req, res) {
    var action = req.params.action;
    self.Shopify(req).delete('/admin/' + action + '.json', function(err, data, headers) {
      res.send(data[action])
    });
  }

  this.Shopify = function(req) {
    shopUrl = req.session.shopUrl || options.shop
    return new shopifyAPI({
      shop: shopUrl,
      shopify_api_key: options.shopify_api_key,
      shopify_shared_secret: options.shopify_shared_secret,
      access_token: options.access_token
    });
  }
}
