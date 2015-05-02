var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone'),
  ProductMetafieldsView  = require('./product_metafields');

module.exports = Backbone.View.extend({
  template: _.template($('#productTemplate').html()),

  tagName: 'tr',

  initialize: function() {
    _.bindAll(this, 'render');
  },

  render: function() {
    var productMetafieldsView = new ProductMetafieldsView({ collection: this.model.metafields() });
    this.$el.html(this.template({
      vendor: this.model.get('vendor'),
      title: this.model.get('title'),
      id: this.model.id,
    }));

    this.$el.find(".metafields").html(productMetafieldsView.el);
    return this;
  }

});
