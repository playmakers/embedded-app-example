var $ = require('jquery'),
  _ = require('underscore'),
  Backbone              = require('backbone'),
  ProductMetafieldView  = require('./product_metafield');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  tagName: 'ul',

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind("reset", _.bind(this.render, this));
  },

  renderProductMetafields: function(content) {
    this.collection.forEach(function(productMetafield) {
      var productMetafieldView = new ProductMetafieldView({ model: productMetafield });
      content.append(productMetafieldView.render().el);
    }, this);
  },

  render: function() {
    this.renderProductMetafields(this.$el);

    return this;
  }
});
