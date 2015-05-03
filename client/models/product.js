var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('../shims/backbone'),
  ProductMetafields = require('./product_metafields');

module.exports = Backbone.Model.extend({

  paramRoot: 'product',
  urlRoot: function() {
    return '/shopify/products/' + this.id + '.json#';
  },

  initialize: function(attributes, options) {
    _.bindAll(this, 'title');
  },

  title: function() {
    return this.get('title')
  },

  metafields: function(namespace) {
    // TODO caching
    var metafields = new ProductMetafields([], {
      product: this,
      namespace: namespace
    });
    metafields.fetch({reset: true, product: this});
    return metafields;
  }
});
