var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.View.extend({
  template: _.template($('#productTemplate').html()),

  tagName: 'tr',

  initialize: function() {
    _.bindAll(this, 'render');
    // this.render();
  },

  render: function() {
    this.$el.html(this.template({
      title: this.model.get('title')
    }));
    return this;
  }

});
