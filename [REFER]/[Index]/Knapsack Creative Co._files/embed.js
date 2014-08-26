(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<link rel=\'shortcut icon\' href=\'/img/favicon.ico\' type=\'image/x-icon\' />\n<script src=\'//a.tiles.mapbox.com/mapbox.js/v2.0.0/mapbox.js\'></script>\n<script src=\'//a.tiles.mapbox.com/mapbox.js/plugins/leaflet-hash/v0.2.1/leaflet-hash.js\'></script>\n<link href=\'//a.tiles.mapbox.com/mapbox.js/v2.0.0/mapbox.css\' rel=\'stylesheet\' />\n<link href=\''+
((__t=( site ))==null?'':__t)+
'/assets-api/v4/embed.css\' type=\'text/css\' rel=\'stylesheet\' />\n<style>\nhtml, body { height:100%; }\nbody { margin:0; padding:0; }\n.ts-map { height:100%; position:absolute; top:0; left:0; right:0; bottom:0; }\n</style>\n<div class=\'ts-map mm zoompan share zoomwheel geocoder zoombox attribution\' id=\'map\'></div>\n';
}
return __p;
};

},{}],2:[function(require,module,exports){
var template = require('./embed.html');

document.write(template({
    site: window.env === 'test' ? '' : 'https://www.mapbox.com'
}));

window.onload = function() {
    L.mapbox.accessToken = window.tilejson.tiles[0].split('?access_token=')[1];

    var tj = window.tilejson,
        options = (tj.options||[]).join(' '),
        include = function(option) {
            return options.indexOf(option) >= 0;
        };

    // keeps 'tileloadstart' from firing (on setView) until instrumentile loads
    var center = tilejson.center;
    tilejson.center = null;

    var map = L.mapbox.map('map', tilejson, {
        minZoom: tilejson.minzoom,
        maxZoom: tilejson.maxzoom,
        gridLayer: !!tilejson.grids,
        gridControl: !!tilejson.grids,
        scrollWheelZoom: include('zoomwheel'),
        legendControl: include('legend'),
        zoomControl: include('zoompan')
    });

    require('instrumentile')(map.tileLayer, '//pong.mapbox.com/pong');

    map.hashControl = L.hash(map);

    if (!window.location.hash) {
        map.setView([center[1], center[0]], center[2]);
    }

    if (tilejson.data) map.addLayer(L.mapbox.featureLayer(tilejson.data));
    if (include('geocoder')) map.addControl(L.mapbox.geocoderControl('mapbox.places-v1'));
    if (include('share')) map.addControl(L.mapbox.shareControl(tilejson));
    if (include('attribution')) map.attributionControl.addAttribution(tilejson.attribution);
};

},{"./embed.html":1,"instrumentile":3}],3:[function(require,module,exports){
'use strict';

var Instrumentile = L.Class.extend({

    initialize: function(layer, endpoint){
        this.endpoint = endpoint;

        this.initialLoad = true;
        this.tileStats = {};

        layer.on({
            'tileloadstart': this._setTileLoadStart,
            'tileload': this._calcTileLoadTime,
            'load': this._calcAverageTileLoadTime
            }, this); 
    },

    _setTileLoadStart: function(e) {
        var tileUrl = e.tile.src;
        this.tileStats[tileUrl] = {tileloadstart: this._performance()};
    },

    _calcTileLoadTime: function(e){
        var tileUrl = e.tile.src;

        if (tileUrl in this.tileStats){
            var tileLoad = this._performance();
            this.tileStats[tileUrl]['tileloadtime'] = tileLoad - this.tileStats[tileUrl]['tileloadstart'];
        }
    },

    _calcAverageTileLoadTime: function(e){
        var averageTileLoadTime = 0,
        tileLoadCount = 0;

        for (var tile in this.tileStats){
            if ('tileloadtime' in this.tileStats[tile]){
                averageTileLoadTime += this.tileStats[tile].tileloadtime;
                tileLoadCount += 1;
            }
        }
        averageTileLoadTime = Math.round(averageTileLoadTime / tileLoadCount);

        var statsObj = (this.initialLoad) ? {tileloadtime: averageTileLoadTime, tileloadcount_initial: tileLoadCount} : {tileloadtime: averageTileLoadTime, tileloadcount_pan: tileLoadCount};

        if (tileLoadCount > 0 ){
            this._logToPong(statsObj);
        }

        this.tileStats = {};
        this.initialLoad = false;
    },

    // _logToPong is the entire Pong Client
    // creates blank image to post to Pong
    _logToPong: function(e) {
        var img = new Image();
        img.src = this.endpoint + L.Util.getParamString(e, this.endpoint);
        img.onload = img.onerror = function() {
            img = null;
        };
    },
    
    //use performance.now over new Date() when available
     _performance: function(){
        if (window.performance && window.performance.now){
            return window.performance.now();
        } else {
            return new Date();
        }
    }
});

module.exports = function(_, endpoint) {
    return new Instrumentile(_, endpoint);
};
},{}]},{},[2])