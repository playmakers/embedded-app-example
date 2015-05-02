var $ = require('jquery'),
  _ = require('underscore'),
  Backbone              = require('backbone'),
  ProductMetafieldView  = require('./product_metafield');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  template: _.template($('#productMetafieldsTemplate').html()),
  // tagName: 'ul',

  events: {
    'click .new': 'showAddMetafield',
    'click .add': 'addMetafield',
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', _.bind(this.render, this));
    this.collection.bind('remove', _.bind(this.render, this));
  },

  showAddMetafield: function() {
    this.$el.find('.addMetafield').show();
    this.$el.find('button.new').hide();
  },

  addMetafield: function() {
    this.collection.createNew({
      key: this.$el.find('.addMetafield select[name=key]').val(),
      value: this.$el.find('.addMetafield input[name=value]').val()
    });
  },

  renderProductMetafields: function(content) {
    this.collection.forEach(function(productMetafield) {
      var productMetafieldView = new ProductMetafieldView({ model: productMetafield });
      content.append(productMetafieldView.render().el);
    }, this);
  },

  render: function() {
    this.$el.html(this.template());
    this.renderProductMetafields(this.$el.find('ul'));
    this.$el.find('.addMetafield').hide();

    return this;
  }
});
