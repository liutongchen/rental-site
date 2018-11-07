import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

const LOCATION = 'San Francisco';
const DUMMY_ELE = {};

module('service:maps', 'Unit | Service | maps', function (hooks) {
  setupTest(hooks);

  test('Should create a new map if one is not cached', function(assert) {
    assert.expect(4); // TODO: WHAT DOES THIS DO?
    const stubMapUtil = {
      createMap(element, location) {
        assert.ok(element, 'createMap called with element.');
        assert.ok(location, 'createMap called with location.');
        return DUMMY_ELE;
      }
    }
    const mapService = this.owner.factoryFor('service:maps').create({ mapUtil: stubMapUtil });
    const element = mapService.getMapElement(LOCATION);
    assert.ok(element, 'element exists');
    assert.equal(element.className, 'map', 'element has map classname');
  })

  test('should fetch cached maps', function(assert) {
    assert.expect(1);
    const stubCachedMaps = { sanFrancisco: DUMMY_ELE };
    const mapService = this.owner.factoryFor('service:maps').create({ cachedMaps: stubCachedMaps });
    const element = mapService.getMapElement(LOCATION);
    assert.equal(element, DUMMY_ELE, 'map fetched from cache');
  });
});
