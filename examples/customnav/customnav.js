class PlaygroundCustomNav extends HTMLElement {
  static BASE_CSS = `
    :host {
      --text: var(--text-color, black);
      --navzindex: var(--z-nav, 100);

      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
      background-color: rgba(200 0 0 / .3);
    }
    ::slotted(a) {
      display: block;
      padding: 1rem 1.5rem;
      color: var(--text);
    }
    .preslot,
    .postslot {
      display: none;
    }
  `;
  static GRID_CSS = `
    :host {
      --isize: 20rem;
      --ibg: hsl(0, 100%, 50%);
    
      display: flex;
      flex-flow: row wrap;
      gap: 1rem;
      background: none;
    }
    ::slotted(a) {
      display: inline-flex;
      align-items: flex-end;
      justify-content: flex-end;
      flex: 0 0 var(--isize);
      padding: .3rem;
      width: var(--isize);
      height: var(--isize);
      background-color: var(--ibg);
      font-size: 3rem;
      color: var(--text-color);
      transition: filter .2s ease-in-out;
      text-decoration: none;
      text-shadow: 2rem .8rem .3rem rgba(0 0 0 / .3);
      overflow: hidden;
    }
    ::slotted(a:hover),
    ::slotted(a:focus) {
      filter: hue-rotate(45deg);
    }
    `;
  static RADIAL_CSS = `
    :host {
      --navsize: 2rem;
      --turn: -.25turn;
      --bgcolor: red;
      --shift-distance: -5rem;

      position: fixed;
      top: .5rem;
      right: .5rem;
      z-index: var(--navzindex);
      display: block;
      width: var(--navsize);
      height: var(--navsize);
      border-radius: 50%;
      background-color: var(--bgcolor);
    }
    .preslot {
      content: 'check';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: var(--navsize);
      height: var(--navsize);
      border-radius: 50%;
      transform-origin: center;
    }
    .postslot {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background: radial-gradient(rgba(255 0 0 / 1), rgba(255 0 0 / 0));
    }
    ::slotted(a) {
      position: absolute;
      top: 0;
      right: 50%;
      display: flex;
      align-items: center;
      padding: 0 1rem;
      height: var(--navsize);
      text-decoration: none;
      color: var(--text);
      text-shadow: 0 0 2px rgba(0 0 0 / .3);
      transform-origin: center right;
      transition:
        all .2s ease-in-out,
        text-shadow .2s ease-in;
      overflow: hidden;
      opacity: 0;
    }
    ::slotted(a:hover),
    ::slotted(a:focus) {
      text-shadow:
        0 0 1px hsl(224, 100%, 100%),
        0 0 2px hsl(224, 100%, 50%),
        0 0 8px hsl(200, 100%, 50%),
        0 0 12px hsl(180, 100%, 50%);
    }
    ::slotted(a:active) {
      text-shadow:
        0 0 2px hsl(224, 100%, 100%),
        0 0 8px hsl(277, 100%, 50%),
        0 0 12px hsl(303, 100%, 57%);
    }
    :host(:hover) .preslot,
    :host(:focus-within) .preslot {
      transform: scale(10);
    }
    :host(:hover) ::slotted(a),
    :host(:focus-within) ::slotted(a) {
      opacity: 1;
    }
  `;
  
  static get observedAttributes() {
    return ['grid', 'radial'];
  }
  
  #nodeCount;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // add styles
    const basestyles = document.createElement('style');
    basestyles.textContent = PlaygroundCustomNav.BASE_CSS;
    this.shadowRoot.append(basestyles);

    // placeholder for variant specific styles
    this.extrastyles = document.createElement('style');
    this.shadowRoot.append(this.extrastyles);

    const preslot = document.createElement('div');
    preslot.className = 'preslot';
    this.shadowRoot.append(preslot);
    
    const slot = document.createElement('slot');
    this.shadowRoot.append(slot);
    
    const postslot = document.createElement('div');
    postslot.className = 'postslot';
    this.shadowRoot.append(postslot);
    
    this.onSlotChange = this.onSlotChange.bind(this);
    slot.addEventListener('slotchange', this.onSlotChange);
  }

  getAtts = () => {
    const foundAtts = {};
    const allowedAtts = PlaygroundCustomNav.observedAttributes;
    const atts = this.getAttributeNames();
    atts.forEach(att => {
      if (allowedAtts.includes(att) && att !== 'false') foundAtts[att] = true;
    });
    return foundAtts;
  };

  updateStyles = () => {
    const { grid, radial } = this.getAtts();

    switch (true) {
      case grid: {
        this.extrastyles.textContent = PlaygroundCustomNav.GRID_CSS;
        break;
      }
      case radial: {
        const divisor = this.#nodeCount > 0 ? (this.#nodeCount - 1) : 0;
        const radialstyles = `
    :host(:hover) ::slotted(a:nth-child(n)),
    :host(:focus-within) ::slotted(a:nth-child(n)) {
      transform:
        rotate(calc(var(--turn) / ${divisor} * var(--index)))
        translateX(var(--shift-distance));
    }
`;
        this.extrastyles.textContent = PlaygroundCustomNav.RADIAL_CSS + radialstyles;
        break;
      }
      default: break;
    }
  }

  onSlotChange = (e) => {
    this.#nodeCount = 0;
    const assignedElements = e.target.assignedElements();
    
    assignedElements.forEach((el, i) => {
      this.#nodeCount = i + 1;
      el.setAttribute('style', `--index: ${i}`);
    });

    this.updateStyles();
  }

  connectedCallback() {}

  attributeChangedCallback() {
    this.updateStyles();
  }
}

window.customElements.define('c-nav', PlaygroundCustomNav);
