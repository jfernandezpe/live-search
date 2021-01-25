import { html, css, LitElement } from 'lit-element';

export class LiveSearchInput extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 25px;
        color: var(--live-search-text-color, #000);
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
  }

  render() {
    return html`
      <label
        >Encuentra profesionales de confianza
        <input type="text" @keyup=${this.onKeyup} />
      </label>
      <ul>
        ${this.suggestions.map(suggestion => {
          return html`<li>${suggestion}</li>`;
        })}
      </ul>
    `;
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
