var $ = require('jquery'),
  Backbone         = require('../shims/backbone'),
  ProductMetafield = require('./product_metafield');

module.exports = Backbone.Collection.extend({

  model: ProductMetafield,
  paramRoot: 'metafields',
  url: function() {
    return '/shopify/products/' + this.product.id + '/metafields.json';
  },

  initialize: function(models, options) {
    this.product = options.product;
    // this.fetch();
  }

});
