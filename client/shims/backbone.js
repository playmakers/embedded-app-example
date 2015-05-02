var _ = require('underscore'),
Backbone = require('backbone');

module.exports = function(Backbone){
  //store the old sync, this is to make testing easier.
  Backbone.oldSync = Backbone.sync;

  //replace backbone sync with our own version.
  Backbone.sync = function( method, model, options ) {
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      options.includeParamRoot = true;
    }

    return Backbone.oldSync.apply(this, [method, model, options]);
  };

  _.extend(Backbone.Model.prototype, {
    //override backbone json
    toJSON: function(options) {
      var data = {},
          attrs = _.clone(this.attributes);
      //if the model has a paramRoot attribute, use it as the root element
      if(options && options.includeParamRoot && this.paramRoot) {
        data[this.paramRoot] = attrs;
      } else {
        data = attrs;
      }
      return data;
    }
  });

  var overrideParse = {
    parse: function(response, options) {
      var data = response;

      if (this.paramRoot && (body = response[this.paramRoot])) {
        data = body;
      }

      return data;
    }
  };

  var addPatch = {
    patch: function(values) {
      var data = {};

      if ((body = this.paramRoot)) {
        data[this.paramRoot] = values;
      }
      else {
        data = values;
      }

      return this.save(data, { patch: true });
    }
  };

  _.extend(Backbone.Collection.prototype, overrideParse);
  _.extend(Backbone.Model.prototype, overrideParse, addPatch);

  return Backbone;
}(Backbone);

