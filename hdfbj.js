class DepartementCardHRD extends PolymerElement {
  // ...

  static get properties() {
    return {
      // ...

      namaDepartemen: {
        type: String,
        value: '',
        reflectToAttribute: true,
        observer: '_namaDepartemenChanged' // Added observer function for namaDepartemen property
      },

      // ...
    };
  }

  // ...

  _namaDepartemenChanged(newVal) {
    // code to handle the updated value of namaDepartemen
    const ukmpTextElement = this.shadowRoot.querySelector('ukmp-text');
    if (ukmpTextElement) {
      ukmpTextElement.setAttribute('text', newVal);
    }
  }

  // ...
}
