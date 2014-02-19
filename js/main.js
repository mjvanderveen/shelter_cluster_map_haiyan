// two base layers created

var base_hotosm = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
        attribution: '&copy; OpenStreetMap contributors, <a href="http://hot.openstreetmap.org/">Humanitarian OpenStreetMap Team</a>'}
);

var base_osm = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: '&copy; OpenStreetMap contributors'}
);

//two needs layers created

var overlay_hhdamaged = L.mapbox.tileLayer('brcmaps.gm59izfr');

var overlay_damagedensity = L.mapbox.tileLayer('brcmaps.y9esif6r');

var overlay_es_agency_count = L.mapbox.tileLayer('brcmaps.w8aug14i');

var overlay_ssr_agency_count = L.mapbox.tileLayer('brcmaps.uujo47vi');

var overlay_es_planned = L.mapbox.tileLayer('brcmaps.dg4d9529');

var overlay_es_reached = L.mapbox.tileLayer('brcmaps.l0v34n29');

var overlay_ssr_planned = L.mapbox.tileLayer('brcmaps.ma9n3ik9');

var overlay_ssr_reached = L.mapbox.tileLayer('brcmaps.slri19k9');

// two 3w layers created
// these consist of teasers and basemap of boundaries
// leaflet layer groups used to combine these

var es3w = new L.LayerGroup(),
    ssr3w = new L.LayerGroup();


var overlay_es3w = L.mapbox.tileLayer('brcmaps.n5wpcik9').addTo(es3w);

var overlay_ssr3w = L.mapbox.tileLayer('brcmaps.nuoqd7vi').addTo(ssr3w);

var grid_overlay_es3w = L.mapbox.gridLayer('brcmaps.n5wpcik9').addTo(es3w);

var grid_overlay_ssr3w = L.mapbox.gridLayer('brcmaps.nuoqd7vi').addTo(ssr3w);

// map initialised

var map = L.map('map', {
    center: [11.3, 123],
    zoom: 8,
    layers: [base_hotosm]
});

// layer control added

L.control.layers({
    'HOT OSM':base_hotosm,
    'OSM':base_osm
}, {
    'Household Damage': overlay_hhdamaged,
    'Damage Density':overlay_damagedensity,
    'Emergency Shelter - Agency Numbers':overlay_es_agency_count,
    'Supported Self Recovery - Agency Numbers':overlay_ssr_agency_count,
    'Emergency Support Planned':overlay_es_planned,
    'Emergency Support Reached':overlay_es_reached,
    'Supported Self Recovery Planned':overlay_ssr_planned,
    'Supported Self Recovery Reached':overlay_ssr_reached,
    'Emergency Shelter - Agency Names':es3w,
    'Supported Self Recovery - Agency Names':ssr3w
}).addTo(map);

// legend control added

var legendControl = L.mapbox.legendControl({position: 'bottomleft'}).addTo(map);

// listeners added for adding and removing layers

map.on('layeradd', function(e) {
  if (e.layer.getTileJSON) {
    map.addControl(L.mapbox.gridControl(e.layer,{follow: true}));  
    legendControl.addLegend(e.layer.getTileJSON().legend);
  }
});

map.on('layerremove', function(e) {
  if (e.layer.getTileJSON) {
    // remove grid controller creates error of layer not existing,
    // but reference does work for legend control

    //map.removeControl(L.mapbox.gridControl(e.layer));  
    legendControl.removeLegend(e.layer.getTileJSON().legend);
  }
});

function resize(){
    $('#map').height($(window).height()-$('#header').height()-10);
    map.invalidateSize(false);
}

$(window).load(function(){
    resize();
});
$(window).resize(function(){
    resize();
});