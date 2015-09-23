define([
        'backbone',
        'underscore',
        'models/pointModel'],
    function (Backbone,
              _,
              Model) {

        var DEBUG = false;
        var collection = Backbone.Collection.extend({
            model: Model,
            url: function(){
                if(this.options && this.options.url){
                    return this.options.url;
                }
            },
            parse: function(response){
                return response && response.points || response;
            },

            initialize: function (options) {
                this.options = options;
            }
        });

        return collection;
    });
