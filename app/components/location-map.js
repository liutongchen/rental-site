import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
    maps: service(),
    didInsertElement() {
        this._super(...arguments);
        const mapElement = this.maps.getMapElement(this.location);
        const mapContainer = this.element.querySelector('.map-container');
        mapContainer.appendChild(mapElement);
    }
});
