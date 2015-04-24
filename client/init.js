'use strict';

var $ = require('jquery'),
  Backbone = require('backbone');

Backbone.$ = $;
window.$ = $;

var app  = require('./lib/app'),
  Router = require('./lib/router');

app.router = new Router();
window.app = app; // Debug

Backbone.history.start({ pushState: true, root: app.root });
