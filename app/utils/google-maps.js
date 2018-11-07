import EmberObject from '@ember/object';

export default EmberObject.extend({
  init() {
    this.set('geocoder', new google.maps.Geocoder());
  },

  createMap(element, location) {
    const map = new google.maps.Map(element, { scrollwheel: false, zoom: 10 });
    this.pinLocation(map, location);
    return map;
  },

  pinLocation(map, location) {
    this.geocoder.geocode( { 'address': location}, function(results, status) {
      if (status == 'OK') {
        map.setCenter(results[0].geometry.location);
        new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
      } else {
        alert('Geocode was not successful for the following reason: ' + status);
      }
    });
 
  }
})