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
    this.suggestions = []
  }

  render() {
    return html`
      <input type="text"  @keyup=${this.onKeyup} />
    `;
  }

  onKeyup(detail) {
  }
}
