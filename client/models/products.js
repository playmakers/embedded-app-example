var $ = require('jquery'),
  Backbone = require('../shims/backbone'),
  Product  = require('./product');

module.exports = Backbone.Collection.extend({

  model: Product,
  paramRoot: 'products',
  url: '/shopify/products.json',

  initialize: function(models, options) {
    // this.fetch();
  }

});
