define([
        'backbone',
        'underscore',
        'leaflet',

        'views/mapView',

        'text!templates/AppTemplate.html'
    ],

    function (Backbone,
              _,
              L,
              MapView,
              Template) {

        var DEBUG = false;

        var AppView = Backbone.View.extend({

            events: {
                "click #menu-toggle": "menuToggle"
            },

            el: '',

            template: _.template(Template),

            initialize: function () {
                _.bindAll.apply(_, [this].concat(_.functions(this)));
                if (DEBUG) console.debug("AppView Init");
                this.setElement($("body"));
            },
            render: function () {
                this.$el.html(this.template);
                this.mapView = new MapView();
                this.$el.find("#page-content-wrapper .container-fluid").append(this.mapView.render().el);
                return this;
            },
            menuToggle: function (e) {
                e.preventDefault();
                this.$el.find("#mainWrapper").toggleClass("toggled");
                this.$el.find("#menu-toggle").toggleClass("toggled");
                this.$el.find(".navbar-brand").toggleClass("toggled");
                this.mapView.trigger("resize");
            }
        });

        return AppView;

    });