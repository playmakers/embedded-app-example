var $ = require('jquery'),
  _ = require('underscore'),
  Backbone = require('backbone');

module.exports = Backbone.Model.extend({

  initialize: function() {
    _.bindAll(this, 'title');
  },

  title: function() {
    return this.get('title')
  }
});
