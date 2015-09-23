define(['backbone', 'underscore', 'leaflet'], function (Backbone, _, L) {
    var DEBUG = false;
    var model = Backbone.Model.extend({

        defaults: {

        },

        parse: function (response) {
            if (DEBUG) console.debug("Points model parse");
            return L.latLng(response[0], response[1]);
        },

        initialize: function () {

        }
    });

    return model;

});