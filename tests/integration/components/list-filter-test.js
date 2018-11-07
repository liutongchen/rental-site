import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, settled, triggerKeyEvent, fillIn } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { resolve } from 'rsvp';

const ITEMS = [{ city: 'San Francisco' }, { city: 'Portland' }, { city: 'Seattle' }];
const FILTERED_ITEMS = [{ city: 'San Francisco' }];

module('Integration | Component | list-filter', function (hooks) {
  setupRenderingTest(hooks);

  test('should initially load all listings', async function (assert) {
    this.set('filterByCity', () => resolve({ query: '', results: ITEMS }));

    // with an integration test,
    // you can set up and use your component in the same way your application
    // will use it.
    await render(hbs`
      {{#list-filter filter=(action filterByCity) as |results|}}
        <ul>
        {{#each results as |item|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
        </ul>
      {{/list-filter}}
    `);

    return settled().then(() => {
      assert.equal(this.element.querySelectorAll('.city').length, ITEMS.length);
      assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
    })
  });

  test('should return the filtered city', async function (assert) {
    const INPUT = 's';
    this.set('filterByCity', (param) => {
      if (param !== '') {
        return resolve({ results: FILTERED_ITEMS, query: param });
      }
      return resolve({ results: ITEMS, query: param });
    })

    await render(hbs`
    {{#list-filter filter=(action filterByCity) as |results|}}
      <ul>
      {{#each results as |item|}}
        <li class="city">
          {{item.city}}
        </li>
      {{/each}}
      </ul>
    {{/list-filter}}
  `);

  await fillIn(this.element.querySelector('.list-filter input'), INPUT);
  await triggerKeyEvent(this.element.querySelector('.list-filter input'), 'keyup', 83);

  return settled().then(() => {
    assert.equal(this.element.querySelectorAll('.city').length, 1, 'should return 1 result');
    assert.equal(this.element.querySelector('.city').textContent.trim(), 'San Francisco');
  })
  });
});
