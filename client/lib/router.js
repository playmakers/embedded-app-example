"use strict";

var $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;

var app        = require('./app'),
  ProductsView = require('../views/products');

module.exports = Backbone.Router.extend({
  routes: {
    "": "_index"
  },

  _index: function(itemId) {
    console.log('index');
    $('#products').html(new ProductsView({ }).$el);
  },
});
