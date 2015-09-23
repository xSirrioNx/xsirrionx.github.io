define(['backbone', 'underscore'], function (Backbone, _) {
    var DEBUG = false;
    var model = Backbone.Model.extend({

        defaults: {

        },

        parse: function (response) {
            if (DEBUG) console.debug("Map model parse");
            return response;
        },

        initialize: function () {

        }
    });

    return model;

});