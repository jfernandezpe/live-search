import { html } from 'lit-html';
import '../../../live-search-input.js';

export default {
  title: 'LiveSearch',
  component: 'live-search-input',
  argTypes: {
    suggestions: { control: 'array' },
  },
};

export const Regular = () => {
  return html` <live-search-input> </live-search-input> `;
};

export const WithSuggestions = () => {
  const suggestions = [
    'Pintor',
    'Pintor de paredes',
    'Pintor de puebles',
    'Pintor de gotelé',
    'Profesional de la pintura',
    'Profesor de pintura y pintales',
  ];

  return html`
    <live-search-input .suggestions=${suggestions}> </live-search-input>
  `;
};
export const WithHighlight = () => {
  const suggestions = [
    'Profesional de la pintura',
    'Profesor de pintura y pintales',
    'Pintor',
    'Pintor de paredes',
    'Pintor de puebles',
    'Pintor de gotelé',
  ];

  return html`
    <live-search-input .suggestions=${suggestions}> </live-search-input>
  `;
};
