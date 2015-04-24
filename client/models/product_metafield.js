var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('../shims/backbone');

module.exports = Backbone.Model.extend({

  paramRoot: 'metafield',
  urlRoot: function() {
    return '/shopify/products/' + this.product.id + '/metafields/' + this.id + '.json#';
  },

  initialize: function(attributes, options) {
    this.product = attributes.product;
  }

});
