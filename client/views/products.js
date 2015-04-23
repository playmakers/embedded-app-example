var $ = require('jquery'),
  _ = require('underscore'),
  Backbone     = require('backbone'),
  ProductView  = require('./product');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  template: _.template($('#productsTemplate').html()),

  // events: {
  //   "click #create": "createNew",
  // },

  initialize: function(){
    _.bindAll(this, 'render');
    this.collection.bind("reset", _.bind(this.render, this));
    this.render();
  },

  renderProducts: function(content) {
    this.collection.forEach(function(product) {
      var productView = new ProductView({ model: product });
      content.append(productView.render().el);
    }, this);
  },

  render: function() {
    this.$el.html(this.template());

    if (this.collection.length > 0) {
      this.renderProducts(this.$el.find("tbody"));
    } else {
      console.log('nix da');
      // this.$el.html(this.template());
    }
    return this;
  }
});
