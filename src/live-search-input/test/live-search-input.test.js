import { html, fixture, expect, nextFrame } from '@open-wc/testing';
import sinon from 'sinon';
import { LiveSearchInput } from '../LiveSearchInput.js';

import '../../../live-search-input.js';

const fakeKeyup = (element, value) => {
  const fakeEvent = { target: { value } };

  element.onKeyup(fakeEvent);
};

describe('LiveSearchInput', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html` <live-search-input></live-search-input> `);
    await nextFrame;
  });
  it('should pass  the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('when the user type char', () => {
    it('should dispatch the event "live-search-string"', () => {
      const fakeValue = 'some fake search value';
      const eventStub = sinon.stub();
      element.addEventListener('live-search-string', eventStub);

      fakeKeyup(element, fakeValue);

      expect(eventStub).to.have.been.calledOnce;
      expect(eventStub).to.have.been.calledWithMatch({
        detail: { string: fakeValue },
      });
    });
  });
  describe('when the component receives a list of suggestions', () => {
    const suggestions = [
      'Pintor',
      'Pintor de paredes',
      'Pintor de puebles',
      'Pintor de gotelé',
    ];
    it('should display the suggestions', async () => {
      element.suggestions = suggestions;
      fakeKeyup(element, 'Pint');

      await nextFrame();

      const lis = element.shadowRoot.querySelectorAll('li');
      expect(lis.length).to.be.equal(suggestions.length);
      lis.forEach((li, index) => {
        expect(li.innerText).to.be.equal(suggestions[index]);
      });
    });
    it('should highlight the part of the string that match', async () => {
      element.suggestions = suggestions;
      fakeKeyup(element, 'Pint');
      await nextFrame();

      const highlights = element.shadowRoot.querySelectorAll('li .highlight');

      expect(highlights.length).to.be.equal(suggestions.length);

      highlights.forEach(highlight => {
        expect(highlight.innerText).to.be.equal('Pint');
      });

      expect();
    });
    it('should hide the suggestions that do not match', async () => {
      element.suggestions = [
        ...suggestions,
        'Profesional de la pintura',
        'Trabajos de pintura',
      ];
      fakeKeyup(element, 'Pint');
      await nextFrame();

      const lis = element.shadowRoot.querySelectorAll('li');
      expect(lis.length).to.be.equal(suggestions.length);
      lis.forEach((li, index) => {
        expect(li.innerText).to.be.equal(suggestions[index]);
      });
    });
  });
  describe('when the user confirm a suggestion', () => {
    describe('by clicking one', () => {
      it('should dispatch the event "live-search"');
    });
    describe('by clicking one', () => {
      it('should dispatch the event "live-search"');
    });
  });

  describe('split by search', () => {
    it('should split the text by the search and case sensitive', () => {
      const cases = [
        {
          text: 'Pintura',
          search: 'Pint',
          expectedInit: '',
          expectedMatch: 'Pint',
          expectedEnd: 'ura',
        },
        {
          text: 'Profesional de pinturas y pintar',
          search: 'pint',
          expectedInit: 'Profesional de ',
          expectedMatch: 'pint',
          expectedEnd: 'uras y pintar',
        },
      ];

      cases.forEach(
        ({ text, search, expectedInit, expectedMatch, expectedEnd }, index) => {
          const [init, match, end] = LiveSearchInput.splitBySearch(
            text,
            search
          );

          expect(init, `init in case ${index}`).to.be.equal(expectedInit);
          expect(match, `match in case ${index}`).to.be.equal(expectedMatch);
          expect(end, `match in case ${index}`).to.be.equal(expectedEnd);
        }
      );
    });
  });
});
