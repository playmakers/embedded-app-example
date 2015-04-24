var $ = require('jquery'),
  _ = require('underscore'),
  Backbone     = require('backbone'),
  ProductView  = require('./product');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  template: _.template($('#productsTemplate').html()),

  initialize: function(){
    _.bindAll(this, 'render');
    this.collection.bind("reset", _.bind(this.render, this));
  },

  renderProducts: function(content) {
    this.collection.forEach(function(product) {
      var productView = new ProductView({ model: product });
      content.append(productView.render().el);
    }, this);
  },

  render: function() {
    this.$el.html(this.template());
    this.renderProducts(this.$el.find("tbody"));

    return this;
  }
});
