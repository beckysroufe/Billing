define(function (require) {
  var Module = require('lib/module'),
      EntitiesController = require('entities/entities.controller'),
      app = require('app'),
      EntitiesModule,
      entities;

  EntitiesModule = Module.extend({
    moduleControllerClass: EntitiesController
  });

  entities = app.module('entities', EntitiesModule);
  entities.start();

  return entities;
});
