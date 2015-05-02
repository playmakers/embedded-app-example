var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#productMetafieldTemplate').html()),

  tagName: 'li',

  events: {
    'click .update': 'updateMetafield',
    'click .del':    'deleteMetafield'
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.model.bind('sync', _.bind(this.render, this));
  },

  updateMetafield: function() {
    this.model.update(this.$el.find('input[name=value]').val());
  },

  deleteMetafield: function() {
    this.model.destroy();
  },

  render: function() {
    var value = $('<div/>').text(this.model.get('value')).html();
    this.$el.html(this.template({
      namespace: this.model.get('namespace'),
      key: this.model.get('key'),
      value: value.replace(/"/g, "'")
    }));

    return this;
  }

});
