define([
        'backbone',
        'underscore',
        'leaflet',

        'collections/layersCollection',
        'collections/pointsCollection'
    ],

    function (Backbone,
              _,
              L,
              Collection,
              PointsCollection) {

        var DEBUG = false;

        var AppView = Backbone.View.extend({

            events: {},

            el: '',

            template: "",

            initialize: function () {
                _.bindAll.apply(_, [this].concat(_.functions(this)));
                if (DEBUG) console.debug("AppView Init");
                this.collection = new Collection();
            },
            render: function () {
                var self = this;
                this.listenTo(this.collection, 'sync', this.handleSuccess);
                this.listenTo(this.collection, 'error', this.handleError);
                this.collection.fetch();
                return this;
            },
            handleSuccess: function () {
                var self = this;
                this.control = L.control.layers();

                this.collection.forEach(function (layer) {
                    switch (layer.get("layerType")) {
                        case "baseLayer":
                            self.addBaseLayer(layer);
                            break;
                        case "layer":
                            self.addLayer(layer);
                            break;
                        case "overlay":
                            self.addOverlay(layer);
                            break;
                        default:
                            throw "Unrecognized layerType.";
                            break;
                    }
                });
                this.control.addTo(App.map);
            },
            handleError: function (collection, response) {

            },
            addBaseLayer: function (layer) {
                var layerObject;
                layerObject = L.tileLayer(layer.get("pathTo"), {});
                layerObject.addTo(App.map);
                this.control.addBaseLayer(layerObject, layer.get("layerName"));
                layer.set({layerObject: layerObject});
            },
            addLayer: function (layer) {
                var layerObject;
                switch (layer.get("layerTypeFunction")) {
                    case "tileLayer":
                        layerObject = L.tileLayer(layer.get("pathTo"), {});
                        this.control.addBaseLayer(layerObject, layer.get("layerName"));
                        layer.set({layerObject: layerObject});
                        break;
                    case "tileLayer.WMS":
                        break;
                    case "tileLayer.Canvas":
                        break;
                    case "imageOverlay":
                        break;
                    case "path":
                        break;
                    case "polyline":
                        layerObject = this.createPolyline(layer);
                        this.control.addBaseLayer(layerObject, layer.get("layerName"));
                        layer.set({layerObject: layerObject});
                        break;
                    case "multiPolyline":
                        break;
                    case "polygon":
                        break;
                    case "multiPolygon":
                        break;
                    case "rectangle":
                        break;
                    case "circle":
                        break;
                    case "circleMarker":
                        break;
                    case "layerGroup":
                        break;
                    case "featureGroup":
                        break;
                    case "geoJSON":
                        break;
                    default:
                        throw "Unrecognized layerTypeFunction. " + layer.get("layerTypeFunction");
                        break;
                }
            },
            addOverlay: function (layer) {
                var layerObject;
                switch (layer.get("layerTypeFunction")) {
                    case "tileLayer":
                        layerObject = L.tileLayer(layer.get("pathTo"), {});
                        this.control.addOverlay(layerObject, layer.get("layerName"));
                        layer.set({layerObject: layerObject});
                        break;
                    case "tileLayer.WMS":
                        break;
                    case "tileLayer.Canvas":
                        break;
                    case "imageOverlay":
                        break;
                    case "path":
                        break;
                    case "polyline":
                        this.createPolyline(layer);
                        break;
                    case "multiPolyline":
                        break;
                    case "polygon":
                        break;
                    case "multiPolygon":
                        break;
                    case "rectangle":
                        break;
                    case "circle":
                        break;
                    case "circleMarker":
                        break;
                    case "layerGroup":
                        break;
                    case "featureGroup":
                        break;
                    case "geoJSON":
                        break;
                    default:
                        throw "Unrecognized layerTypeFunction. " + layer.get("layerTypeFunction");
                        break;
                }
            },
            createPolyline: function (layer) {
                var self = this;
                if (layer.get("pathTo")) {
                    var pointsCollection = new PointsCollection({
                        url: layer.get("pathTo")
                    });
                    pointsCollection.fetch({
                        success: function (collection, response) {
                            var layerObject = L.polyline(collection.toJSON(), {
                                color: layer.get("color"),
                                width: layer.get("width")
                            });
                            self.control.addOverlay(layerObject, layer.get("layerName"));
                            layer.set({layerObject: layerObject});
                        },
                        error: function (model, response) {

                        }
                    });
                } else {
                    return;
                }
            }
        });

        return AppView;

    });