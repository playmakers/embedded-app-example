/*
 * Shopify Api
 */

var shopifyAPI = require('shopify-node-api'),
qs = require('querystring');
require('array.prototype.find');

exports.ShopifyApi = function(options) {
  var self = this;

  this.get = function(req, res) {
    var action = req.params[0];

    self.Shopify(req).get('/admin/' + action + '.json', function(err, data, headers) {
      res.send(data)
    });
  },

  this.post = function(req, res) {
    var action = req.params[0],
    post_data = req.body;

    self.Shopify(req).post('/admin/' + action + '.json', post_data, function(err, data, headers) {
      res.send(data)
    });
  },

  this.put = function(req, res) {
    var action = req.params[0],
    put_data = req.body;

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
    var shopify = self.Shopify(req),
    collection_handle = req.query.collection_handle;
    self.withCollection(shopify, collection_handle, function(collection) {
      if (collection) {
        var params = {
          collection_id: collection.id,
          fields: 'id,title,vendor'
        };
        shopify.get('/admin/products.json?' + qs.encode(params), function(err, data, headers) {
          res.send(data)
        });
      }
      else {
        res.sendStatus(404);
      }
    })
  },

  this.getProductMetafields = function(req, res) {
    var product_id = req.params.product_id,
    namespace = req.query.namespace,
    params = {
      namespace: namespace,
      fields: 'id,namespace,key,value'
    };

    self.Shopify(req).get('/admin/products/' + product_id + '/metafields.json?' + qs.encode(params), function(err, data, headers) {
      res.send(data)
    });
  },


  this.withCollection = function(shopify, handle, cb) {
    var params = {
      fields: 'id,handle'
    };
    shopify.get('/admin/smart_collections.json?' + qs.encode(params), function(err, data, headers) {
      var collection = data["smart_collections"].find(function(collection) {
        return (collection.handle == handle);
      });
      cb(collection);
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
