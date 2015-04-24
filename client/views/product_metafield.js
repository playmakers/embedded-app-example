var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#productMetafieldTemplate').html()),

  tagName: 'li',

  initialize: function() {
    _.bindAll(this, 'render');
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
