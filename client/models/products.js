var $ = require('jquery'),
  Backbone = require('../shims/backbone'),
  Product  = require('./product');

module.exports = Backbone.Collection.extend({

  model: Product,
  paramRoot: 'products',
  url: function() {
    return '/shopify/products.json?collection_handle=' + this.collectionHandle;
  },

  initialize: function(models, options) {
    this.collectionHandle = options.collection_handle || '';
  }

});
