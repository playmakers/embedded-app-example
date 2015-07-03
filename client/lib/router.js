"use strict";

var $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;

var app        = require('./app'),
  ProductsView = require('../views/products'),
  Products     = require('../models/products');

module.exports = Backbone.Router.extend({
  routes: {
    "watch/config": "_index",
    "sync/config": "_index"
  },

  _index: function(itemId) {
    var products = new Products([], {
      collection_handle: $('#products').data('collectionHandle')
    });

    products.fetch({reset: true});

    $('#products').html(new ProductsView({
      collection: products
    }).$el);
  },
});
