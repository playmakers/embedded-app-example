var $ = require('jquery'),
  Backbone     = require('backbone'),
  Product      = require('./product');

module.exports = Backbone.Collection.extend({

  model: Product,

  url: '/shopify/products.json',

  initialize: function() {
    // this.fetch();
  }

});
