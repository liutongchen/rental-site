import Service from '@ember/service';
import { camelize } from '@ember/string';
import EmberObject from '@ember/object';

import MapUtil from '../utils/google-maps';

export default Service.extend({
    init() {
        this._super(...arguments);
        if (!this.cachedMaps) {
            this.set('cachedMaps', EmberObject.create());
        }
        if (!this.mapUtil) {
            this.set('mapUtil', MapUtil.create());
        }
    },

    getMapElement(location) {
        const camelizedLoc = camelize(location);
        let element = this.get(`cachedMaps.${camelizedLoc}`);
        if (!element) {
            element = this.createElement();
            this.mapUtil.createMap(element, location);
            this.set(`cachedMaps.${camelizedLoc}`, element);
        }
        return element;
    },

    createElement() {
        const element = document.createElement('div');
        element.className= 'map';
        return element;
    }
});
