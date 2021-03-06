import Service from '@ember/service';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

const stubMapsService = Service.extend({
  getMapElement(location) {
    this.set('calledWithLocation', location);
    return document.createElement('div');
  }
});

module('Integration | Component | location-map', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:maps', stubMapsService);
    this.mapsService = this.owner.lookup('service:maps');
  });

  test('Should append map element to the container', async function (assert) {
    this.set('myLocation', 'Seattle');
    await render(hbs`{{location-map location=myLocation}}`);
    assert.equal(this.element.querySelector('.map-container').childNodes.length, 1, 'container should have one child');
    assert.equal(this.mapsService.calledWithLocation, 'Seattle', 'Should call service with Seattle');
  });
});
