var $ = require('jquery'),
  _ = require('underscore'),
  Backbone         = require('../shims/backbone'),
  ProductMetafield = require('./product_metafield'),
  URL = require('url-parse');

module.exports = Backbone.Collection.extend({

  model: ProductMetafield,
  paramRoot: 'metafields',
  url: function() {
    return '/shopify/products/' + this.product.id + '/metafields.json?namespace=' + this.namespace;
  },

  initialize: function(models, options) {
    this.product   = options.product;
    this.namespace = options.namespace || '';
  },

  keyfy: function(value) {

    var url = new URL(value);
    return url.hostname.replace('www.', '') + url.hash
  },

  createNew: function(values) {
    var values = _.extend({
      key:        this.keyfy(values.value),
      value_type: 'string'
    }, values)
    self = this,
    metafield = new ProductMetafield(values, { product: this.product });

    metafield.save({}, {
      success: function() {
        self.fetch({reset: true, product: self.product})
      }
    });
  }
});
