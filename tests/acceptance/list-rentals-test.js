import { module, test } from 'qunit';
import { visit, currentURL, click, fillIn, triggerKeyEvent } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import setupMirage from 'ember-cli-mirage/test-support/setup-mirage';

module('Acceptance | list rentals', function(hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  test('should show rentals as the home page', async function (assert) {
    await visit("/");
    assert.equal(currentURL(), '/rentals', "should redirect automatically");
  });

  test('should link to information about the company.', async function (assert) {
    await visit("/");
    await click('.menu-about');
    assert.equal(currentURL(), '/about', 'should navigate to about page');
  });

  test('should link to contact information.', async function (assert) {
    await visit('/');
    await click('.menu-contact');
    assert.equal(currentURL(), '/contact', 'should nagivate to contact page')
  });

  test('should list available rentals.', async function (assert) {
    const LISTING_NUM = 3;
    await visit('/');
    assert.equal(this.element.querySelectorAll('.listing').length, LISTING_NUM, 'should display all listing');
  });

  test('should filter the list of rentals by city.', async function (assert) {
    await visit('/');
    await fillIn(this.element.querySelector('.list-filter input'), 'Seattle');
    await triggerKeyEvent(this.element.querySelector('.list-filter input'), 'keyup', 69);
    assert.equal(this.element.querySelectorAll('.listing').length, 1, 'should only display 1 listing');
    assert.ok(this.element.querySelector('.listing .location').textContent.includes('Seattle'),
      'should contain 1 listing in Seattle');
  });

  test('should show details for a selected rental', async function (assert) {
  });
});
