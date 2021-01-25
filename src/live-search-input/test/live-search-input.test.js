import { html, fixture, expect, nextFrame } from '@open-wc/testing';

import '../../../live-search-input.js';

describe('LiveSearchInput', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <live-search-input></live-search-input> `);
    await nextFrame;
  })
  it('should pass  the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when the user type char', () => {
    it('should dispatch the event "live-search-string"')
  })
  describe('when the component receives a list of suggestions', () => {
    it('should display the suggestions')
    it('should highlight the string that matach')
  })
  describe('when the user click a suggestion', () => {
    it('should dispatch the event "live-search"')
  })
});
