const MAPBOX_ACCESS_TOKEN =
  'pk.eyJ1IjoiaXZhbjUwMzAzIiwiYSI6ImNsY2lmc2VjYTJ2b3Azb24yY3ljZ3lnY3oifQ.ctFqdjXLKR5prArt62d2Hw'

const map = new mapboxgl.Map({
  accessToken: MAPBOX_ACCESS_TOKEN,
  container: 'map', // container ID
  style: 'mapbox://styles/mapbox/streets-v12', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
})

navigator.geolocation.getCurrentPosition(successLocation, errorLocation, {
  enableHighAccuracy: true,
})

function setupMap(centerPosition) {
  const map = new mapboxgl.Map({
    accessToken: MAPBOX_ACCESS_TOKEN,
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: centerPosition, // starting position [lng, lat]
    zoom: 15, // starting zoom
  })

  const navigationControls = new mapboxgl.NavigationControl()
  map.addControl(navigationControls)

  const directionControls = new MapboxDirections({
    accessToken: MAPBOX_ACCESS_TOKEN,
  })

  map.addControl(directionControls, 'top-left')
}

function successLocation(position) {
  setupMap([position.coords.longitude, position.coords.latitude])
}

function errorLocation() {
  setupMap([-2.24, 53.48])
}
