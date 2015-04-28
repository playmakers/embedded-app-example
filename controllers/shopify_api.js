/*
 * Shopify Api
 */

var shopifyAPI = require('shopify-node-api'),
qs = require('querystring');

exports.ShopifyApi = function(options) {
  var self = this;

  this.get = function(req, res) {
    var action = req.params[0];

    self.Shopify(req).get('/admin/' + action + '.json', function(err, data, headers) {
      res.send(data)
    });
  },

  this.post = function(req, res) {
    var action = req.params[0];

    self.Shopify(req).post('/admin/' + action + '.json', post_data, function(err, data, headers) {
      res.send(data)
    });
  },

  this.put = function(req, res) {
    var action = req.params[0];

    self.Shopify(req).put('/admin/' + action + '.json', put_data, function(err, data, headers) {
      res.send(data)
    });
  },

  this.delete = function(req, res) {
    var action = req.params[0];

    self.Shopify(req).delete('/admin/' + action + '.json', function(err, data, headers) {
      res.send(data)
    });
  }

  this.getProducts = function(req, res) {
    var action = req.params[0],
    params = {
      collection_id: options.collection_id,
      fields: 'id,title,vendor',
    };

    self.Shopify(req).get('/admin/products.json?' + qs.encode(params), function(err, data, headers) {
      res.send(data)
    });
  },

  this.getProductMetafields = function(req, res) {
    var product_id = req.params.product_id,
    params = {
      namespace: 'monitor',
      fields: 'id,namespace,key,value',
    };

    self.Shopify(req).get('/admin/products/' + product_id + '/metafields.json?' + qs.encode(params), function(err, data, headers) {
      res.send(data)
    });
  },

  this.Shopify = function(req) {
    return new shopifyAPI({
      shop:                  req.session.shop || options.shop,
      shopify_api_key:       options.shopify_api_key,
      shopify_shared_secret: options.shopify_shared_secret,
      access_token:          req.session.access_token || options.access_token
    });
  }
}
