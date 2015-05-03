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
    this.$el.html(this.template({
      vendor: this.model.get('vendor'),
      title: this.model.get('title'),
      id: this.model.id,
    }));

    var metafields = this.$el.find(".metafields"),
    productMetafieldsView = new ProductMetafieldsView({
      el: metafields,
      collection: this.model.metafields(metafields.data('namespace'))
    });
    return this;
  }

});
