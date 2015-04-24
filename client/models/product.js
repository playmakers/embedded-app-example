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

  metafields: function() {
    // TODO caching
    var m = new ProductMetafields([], { product: this });
    m.fetch({ reset: true});
    return m;
  }
});
