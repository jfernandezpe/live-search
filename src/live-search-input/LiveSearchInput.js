import { html, css, LitElement } from 'lit-element';

export class LiveSearchInput extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--live-search-text-color, #000);
      }
      .highlight {
        font-weight: bold;
      }
    `;
  }

  static get properties() {
    return {
      suggestions: { type: Array },
    };
  }

  constructor() {
    super();
    this.suggestions = [];
    this.searchString = '';
  }

  render() {
    return html`
      <label
        >Encuentra profesionales de confianza
        <input type="text" @keyup=${this.onKeyup} />
      </label>

      <ul>
        ${this.suggestions.map(suggestion => {
          return html`<li>
            ${LiveSearchInput.renderHighlightSuggestion(
              suggestion,
              this.searchString
            )}
          </li>`;
        })}
      </ul>
    `;
  }

  static renderHighlightSuggestion(text, search) {
    if (!text.includes(search)) {
      return html`${text}`;
    }

    const [init, match, end] = LiveSearchInput.splitBySearch(text, search);

    return html`${init}<span class="highlight">${match}</span>${end}`;
  }

  static splitBySearch(text, search) {
    const index = text.indexOf(search);
    return [
      text.substring(0, index),
      text.substring(index, index + search.length),
      text.substring(index + search.length),
    ];
  }

  onKeyup(detail) {
    this.trigger('live-search-string', { string: detail.target.value });
  }

  trigger(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        detail,
        bubbles: true,
        composed: true,
      })
    );
  }
}
