import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import TileWMS from 'ol/source/TileWMS';
import View from 'ol/View';

var base = new TileLayer({
    source: new OSM()
});

var wmsLayer = new TileLayer({
    source: new TileWMS({
         url: 'http://marcrvb.nl/geoserver/Hoogbouw_basic/wms',
         params: {
             'LAYERS': 'BAG_Hoogbouw_V2 VVE_Adressen',
             'TILED': true
         },
         serverType: 'geoserver'
     })
});


var map = new Map({
    layers: [base, wmsLayer],
    target: 'map',
    view: new View({
        center: ol.proj.fromLonLat([5.387827, 52.156113]),
        zoom: 8
    }),
});

// map.on('singleclick', function (evt) {
//     document.getElementById('info').innerHTML = '';
//     var viewResolution = /** @type {number} */ (view.getResolution());
//     var url = wmsSource.getFeatureInfoUrl(
//         evt.coordinate,
//         viewResolution,
//         'EPSG:28992',
//         {'INFO_FORMAT': 'text/html'}
//     );
//     if (url) {
//         fetch(url)
//             .then(function (response) { return response.text(); })
//             .then(function (html) {
//                 document.getElementById('info').innerHTML = html;
//             });
//     }
// });

map.on('singleclick', function (evt) {
    var container = document.getElementById('info');

    var viewResolution = /** @type {number} */ (map.getView().getResolution());
    var viewProjection = /** @type {number} */ (map.getView().getProjection());

    console.log(viewResolution);
    console.log(viewProjection);

    var url = wmsLayer.getSource().getFeatureInfoUrl(
        evt.coordinate,
        viewResolution,
        viewProjection,
        'EPSG:28992',
        {
            'INFO_FORMAT': 'text/javascript',
            'propertyName': 'formal_en'
        }
    );
    if (url) {
        fetch(url)
            .then(function (response) {
                return response.text(); })
            .then(function (html) {
                container.innerHTML = html;
            });
    }

    console.log(url);
});

// map.on('pointermove', function (evt) {
//     if (evt.dragging) {
//         return;
//     }
//     var pixel = map.getEventPixel(evt.originalEvent);
//     var hit = map.forEachLayerAtPixel(pixel, function () {
//         return true;
//     });
//     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
// });

// import 'ol/ol.css';
// import Map from 'ol/Map';
// import OSM from 'ol/source/OSM';
// import TileLayer from 'ol/layer/Tile';
// import TileWMS from 'ol/source/TileWMS';
// import View from 'ol/View';
//
// // var layers = [
// //     new TileLayer({
// //         source: new OSM(),
// //     }),
// //     new TileLayer({
// //         source: new TileWMS({
// //             url: 'http://marcrvb.nl/geoserver/Hoogbouw_basic/wms',
// //             params: {'LAYERS': 'BAG_Hoogbouw_V2 VVE_Adressen', 'TILED': true},
// //             serverType: 'geoserver'
// //             // Countries have transparency, so do not fade tiles:
// //         }),
// //     })];
//
// var base = new TileLayer({
//     source: new OSM()
// });
//
// var dots = new TileLayer({
//     source: new TileWMS({
//         url: 'http://marcrvb.nl/geoserver/Hoogbouw_basic/wms',
//         params: {'LAYERS': 'BAG_Hoogbouw_V2 VVE_Adressen', 'TILED': true},
//         serverType: 'geoserver'
//         // Countries have transparency, so do not fade tiles:
//     }),
// });
//
// var wmsSource = new TileWMS({
//     source: new TileWMS({
//         url: 'http://marcrvb.nl/geoserver/Hoogbouw_basic/wms',
//         params: {'LAYERS': 'BAG_Hoogbouw_V2 VVE_Adressen', 'TILED': true},
//         serverType: 'geoserver'
//     }),
// });
//
// var wmsLayer = new TileLayer({
//     source: wmsSource,
// });
//
// var view = new View({
//     center: ol.proj.fromLonLat([5.387827, 52.156113]),
//     zoom: 8
// });
//
// var map = new Map({
//     layers: [base, dots, wmsLayer],
//     target: 'map',
//     view: view
// });
//
// map.on('singleclick', function (evt) {
//     document.getElementById('info').innerHTML = '';
//     var viewResolution = /** @type {number} */ (view.getResolution());
//     var url = wmsSource.getFeatureInfoUrl(
//         evt.coordinate,
//         viewResolution,
//         'EPSG:28992',
//         {'INFO_FORMAT': 'text/html'}
//     );
//     if (url) {
//         fetch(url)
//             .then(function (response) { return response.text(); })
//             .then(function (html) {
//                 document.getElementById('info').innerHTML = html;
//             });
//     }
// });
//
// map.on('pointermove', function (evt) {
//     if (evt.dragging) {
//         return;
//     }
//     var pixel = map.getEventPixel(evt.originalEvent);
//     var hit = map.forEachLayerAtPixel(pixel, function () {
//         return true;
//     });
//     map.getTargetElement().style.cursor = hit ? 'pointer' : '';
// });