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
      searchString: { type: String },
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
          return html`
            ${LiveSearchInput.renderHighlightSuggestion(
              suggestion,
              this.searchString
            )}
          `;
        })}
      </ul>
    `;
  }

  static renderHighlightSuggestion(text, search) {
    if (text.includes(search)) {
      const [init, match, end] = LiveSearchInput.splitBySearch(text, search);

      return html`<li>
        ${init}<span class="highlight">${match}</span>${end}
      </li>`;
    }
    return html``;
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
    this.searchString = detail?.target?.value;
    this.trigger('live-search-string', { string: this.searchString });
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
