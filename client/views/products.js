var $ = require('jquery'),
  _ = require('underscore'),
  Backbone     = require('backbone'),
  Products  = require('../models/products');

Backbone.$ = $;

module.exports = Backbone.View.extend({
  // template: _.template($('#browserTemplate').html()),

  // events: {
  //   "click #create": "createNew",
  // },

  initialize: function(){
    _.bindAll(this, 'render');
    this.render();
  },

  render: function() {
    console.log('render');
    this.$el.html("products");

    return this;
  }
});
