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
  ];

  return html`
    <live-search-input .suggestions=${suggestions}> </live-search-input>
  `;
};
