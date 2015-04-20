/*
 * Shopify Api
 */

var shopifyAPI = require('shopify-node-api');

exports.ShopifyApi = function(options) {

  this.get = function (req, res) {
    Shopify.get('/admin/' + req.params.action + '.json', function(err, data, headers) {
      res.send(data)
    });
  },

  this.post = function (req, res) {
    Shopify.post('/admin/' + req.params.action + '.json', post_data, function(err, data, headers) {
      res.send(data)
    });
  },

  this.put = function (req, res) {
    Shopify.put('/admin/' + req.params.action + '.json', put_data, function(err, data, headers) {
      res.send(data)
    });
  },

  this.delete = function (req, res) {
    Shopify.delete('/admin/' + req.params.action + '.json', function(err, data, headers) {
      res.send(data)
    });
  }
}
