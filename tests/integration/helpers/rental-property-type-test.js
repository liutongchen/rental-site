import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Helper | rental-property-type', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test('it renders properly for Community type', async function (assert) {
    this.set('inputValue', 'Condo');
    await render(hbs`{{rental-property-type inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Community');
  });

  test('it renders properly for Standalone type', async function (assert) {
    this.set('inputValue', 'Estate');
    await render(hbs`{{rental-property-type inputValue}}`);
    assert.equal(this.element.textContent.trim(), 'Standalone');
  });
});
