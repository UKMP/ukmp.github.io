import { PolymerElement, html } from './node_modules/@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from './node_modules/@polymer/polymer/lib/legacy/class.js';
import { GestureEventListeners } from './node_modules/@polymer/polymer/lib/mixins/gesture-event-listeners.js';

class SwipeableHeader extends mixinBehaviors([GestureEventListeners], PolymerElement) {
    static get template() {
        return html`
      <style>
        :host {
          display: block;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: var(--swipeable-header-height, 64px);
          background-color: var(--swipeable-header-background-color, #2196F3);
          color: var(--swipeable-header-color, #fff);
          z-index: 1;
          transition: transform 0.2s ease-in-out;
          transform: translateY(0);
        }

        .content {
          padding: 16px;
        }

        .button {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          padding: 16px;
          font-size: 24px;
          color: var(--swipeable-header-color, #fff);
          cursor: pointer;
        }

        .button:hover {
          color: var(--swipeable-header-hover-color, #ccc);
        }

        @media (max-width: 767px) {
          :host {
            height: calc(var(--swipeable-header-height, 64px) + var(--swipeable-header-content-height, 0px));
            transform: translateY(-100%);
          }

          .content {
            display: none;
          }

          .button {
            display: block;
          }
        }
      </style>

      <div class="content">
        <slot></slot>
      </div>

      <div class="button" on-tap="_toggleContent">
        &#x25BC;
      </div>
    `;
    }

    static get properties() {
        return {
            isOpen: {
                type: Boolean,
                value: false,
                notify: true
            }
        };
    }

    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('track', this._onTrack.bind(this));
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.removeEventListener('track', this._onTrack.bind(this));
    }

    _onTrack(event) {
        if (event.detail.state === 'track') {
            event.stopPropagation();
            event.preventDefault();
        }

        if (event.detail.state === 'end') {
            if (event.detail.dx < 0 && Math.abs(event.detail.dx) > 100) {
                this.isOpen = true;
            } else if (event.detail.dx > 0 && Math.abs(event.detail.dx) > 100) {
                this.isOpen = false;
            }
        }
    }

    _toggleContent() {
        this.isOpen = !this.isOpen;
    }

    static get observers() {
        return [
            '_isOpenChanged(isOpen)'
        ];
    }

    _isOpenChanged(isOpen) {
        if (isOpen) {
            this.style.transform = 'translateY(0)';
        } else {
            this.style.transform = `translateY(-${this.offsetHeight}px)`;
        }
    }
}

customElements.define('swipeable-header', SwipeableHeader);
