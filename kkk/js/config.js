var App = {};
requirejs.config({

    locale: "ru",

    baseUrl: '/kkk/js/',

    waitSeconds: 60,

    paths: {
        jquery: 	'libs/jquery/jquery',
        underscore:	'libs/underscore/underscore-min',
        backbone:	'libs/backbone/backbone-min',
        leaflet:	'libs/leaflet/leaflet',
        less:       'libs/lessjs/less.min',
        text:       'libs/text/text',
        bootstrap:  'libs/bootstrap/dist/js/bootstrap.min',
        appView:    'views/appView'

    },

    shim: {
        app: {
            deps: ["leaflet"]
        }
    }
});

// Dependencies Requests
require([
    'backbone',
    'underscore',
    'jquery',
    'appView',

    //
    'bootstrap',
    'less',
    'text'
],function(Backbone, _, $, AppView){
    App = new AppView({

    });
    App.render();
});


