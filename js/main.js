// two base layers created

var base_hotosm = L.tileLayer(
        'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',{
        attribution: ''}
);

var base_osm = L.tileLayer(
        'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
        attribution: ''}
);

//two needs layers created

var overlay_zi = L.mapbox.tileLayer('brcmaps.sr307ldi');


// two 3w layers created
// these consist of teasers and basemap of boundaries
// leaflet layer groups used to combine these

//var es3w = new L.LayerGroup(),
//    ssr3w = new L.LayerGroup();


//var overlay_es3w = L.mapbox.tileLayer('brcmaps.n5wpcik9').addTo(es3w);

//var overlay_ssr3w = L.mapbox.tileLayer('brcmaps.nuoqd7vi').addTo(ssr3w);

//var grid_overlay_es3w = L.mapbox.gridLayer('brcmaps.n5wpcik9').addTo(es3w);

//var grid_overlay_ssr3w = L.mapbox.gridLayer('brcmaps.nuoqd7vi').addTo(ssr3w);

// map initialised

var map = L.map('map', {
    center: [52.3039761, 5.7735948],
    zoom: 7,
    layers: [base_hotosm, overlay_zi]
});

// layer control added

L.control.layers({
    'HOT OSM':base_hotosm,
    'OSM':base_osm
}, {
    'Deelnemende instellingen aan onderzoek': overlay_zi
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