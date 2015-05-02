var $ = require('jquery'),
  _ = require('underscore'),
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
  },

  createNew: function(values) {
    var values = _.extend(values, {
      namespace: 'watch',
      value_type: 'string'
    })
    self = this,
    metafield = new ProductMetafield(values, { product: this.product });

    metafield.save({}, {
      success: function() {
        self.fetch({reset: true, product: self.product})
      }
    });
  }
});
