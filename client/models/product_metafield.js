var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('../shims/backbone');

module.exports = Backbone.Model.extend({

  paramRoot: 'metafield',
  urlRoot: function() {
    var url = '/shopify/products/' + this.product.id + '/metafields';
    if (this.id) {
      url = url + '/' + this.id;
    }

    return url + '.json#';
  },

  update: function(value) {
    this.patch({
      value: value
    });
  },

  initialize: function(attributes, options) {
    this.product = options.product;
  }

});
