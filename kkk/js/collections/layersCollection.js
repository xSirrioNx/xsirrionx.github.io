define([
        'backbone',
        'underscore',
        'models/layerModel'],
    function (Backbone,
              _,
              Model) {

        var DEBUG = false;
        var collection = Backbone.Collection.extend({
            url: "JSON/layersconfig.json",
            model: Model,
            parse: function(response){
                return response && response.layers || response;
            },

            initialize: function (options) {

            }
        });

        return collection;
    });