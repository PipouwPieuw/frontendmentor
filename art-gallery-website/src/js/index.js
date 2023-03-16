// Initialize map container
var map = L.map('map', {
	zoomControl: false,
	dragging: false,
	scrollWheelZoom: false,
	doubleClickZoom: false,
	touchZoom: false,
}).setView([41.4813163, -71.312549], 16);
// Add layer
L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png').addTo(map);
// Add marker
var icon = L.icon({
    iconUrl: '../assets/img/marker.png',
    shadowUrl: '../assets/img/marker.png',
    iconSize:     [66, 88], // size of the icon
    shadowSize:   [0, 0], // size of the shadow
    iconAnchor:   [33, 88], // point of the icon which will correspond to marker's location
    shadowAnchor: [0, 0],  // the same for the shadow
    popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
});
var marker = L.marker([41.480497, -71.310980], {icon: icon}).addTo(map);
