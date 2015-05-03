var $ = require('jquery'),
  _ = require('underscore'),
  Backbone              = require('backbone'),
  ProductMetafieldView  = require('./product_metafield');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  template: _.template($('#productMetafieldsTemplate').html()),
  // tagName: 'ul',

  events: {
    'click .add':  'addMetafield',
    'keyup input': 'checkInput'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.collection.bind('reset', _.bind(this.render, this));
    this.collection.bind('remove', _.bind(this.render, this));
  },

  addMetafield: function() {
    this.collection.createNew({
      namespace: this.$el.find('.addMetafield :input[name=namespace]').val(),
      value:     this.$el.find('.addMetafield :input[name=value]').val()
    });
  },

  checkInput: function(event) {
    if(event.keyCode == 13) {
      this.addMetafield();
    }
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

    return this;
  }
});
