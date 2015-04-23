"use strict";

var $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;

var app        = require('./app'),
  ProductsView = require('../views/products'),
  Products     = require('../models/products');

module.exports = Backbone.Router.extend({
  routes: {
    "": "_index"
  },

  _index: function(itemId) {
    var products = new Products();
    products.fetch({reset: true});
    $('#products').html(new ProductsView({collection: products}).$el);
  },
});
