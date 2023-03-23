const HOME = (window.location.hostname.includes('127') || window.location.hostname.includes('localhost')) ? '' : 'playground';

// update this whenever the pages change.
const EXAMPLES = [
  { label: 'animation', to: 'examples/animation' },
  { label: 'intersection', to: 'examples/intersection' },
  { label: 'pixels', to: 'examples/pixels' },
  { label: 'playground', to: 'examples/playground' },
  { label: 'resize', to: 'examples/resize' },
  { label: 'navigation', to: 'examples/navigation' },
  { label: 'simon', to: 'examples/simon' },
  { label: 'calendar', to: 'examples/calendar' },
  { label: 'custom navigation', to: 'examples/customnav' }
];

const BASE_CSS = `
nav {
  --text: var(--text-color, black);
  --navzindex: var(--z-nav, 100);

  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  background-color: rgba(200 0 0 / .3);
}
nav .i {
  display: block;
  padding: 1rem 1.5rem;
  color: var(--text);
}
`;

const RADIAL_CSS = `
nav.radial {
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
nav.radial::before {
  content: '';
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: var(--navsize);
  height: var(--navsize);
  border-radius: 50%;
  transform-origin: center;
}
nav.radial::after {
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
nav.radial .i {
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
nav.radial .i:hover,
nav.radial .i:focus {
  text-shadow:
    0 0 1px hsl(224, 100%, 100%),
    0 0 2px hsl(224, 100%, 50%),
    0 0 8px hsl(200, 100%, 50%),
    0 0 12px hsl(180, 100%, 50%);
}
nav.radial .i:active {
  text-shadow:
    0 0 2px hsl(224, 100%, 100%),
    0 0 8px hsl(277, 100%, 50%),
    0 0 12px hsl(303, 100%, 57%);
}
nav.radial:hover::before,
nav.radial:focus-within::before {
  transform: scale(10); /* percentage / 100 * 2 (because scale = radius) */
}
nav.radial:hover .i,
nav.radial:focus-within .i {
  opacity: 1;
}
`;
/**
 * Removed this bit of CSS and moved into WC.
 * Will bbe added later with the divisor (here, "6") calculated based on the number of items.
 * 
nav.radial:hover .i:nth-child(n),
nav.radial:focus-within .i:nth-child(n) {
  transform:
    rotate(calc(var(--turn) / 6 * var(--index)))
    translateX(var(--shift-distance));
 */

const GRID_CSS = `
nav.grid {
  --isize: 20rem;
  --ibg: hsl(0, 100%, 50%);

  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
  background: none;
}
nav.grid .i {
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
nav.grid .i:hover,
nav.grid .i:focus {
  filter: hue-rotate(45deg);
}
`;

const CSS = BASE_CSS + RADIAL_CSS + GRID_CSS;

class PlaygroundNav extends HTMLElement {
  static get observedAttributes() {
    return ['grid', 'radial', 'home'];
  }
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    // add styles
    this.basestyles = document.createElement('style');
    this.basestyles.textContent = CSS;
    // nav reference
    this.wrapper = document.createElement('nav');
    // set initial links
    EXAMPLES.forEach(({ label, to }, idx) => this.createAnchor(label, to, idx));

    this.shadowRoot.append(this.basestyles, this.wrapper);
  }

  clearAnchors = () => {
    while(this.wrapper.firstChild){
      this.wrapper.removeChild(this.wrapper.firstChild);
    };
  };

  createAnchor = (label, to, i) => {
    const a = document.createElement('a');
    a.setAttribute('class', `i`);
    a.setAttribute('href', `${HOME && `/${HOME}`}${to && `/${to}`}/`);
    a.setAttribute('style', `--index: ${i}`);
    a.innerText = label;
    this.wrapper.append(a);
  };

  getAtts = () => {
    const foundAtts = {};
    const allowedAtts = PlaygroundNav.observedAttributes;
    const atts = this.getAttributeNames();
    atts.forEach(att => {
      if (allowedAtts.includes(att)) foundAtts[att] = true;
    })
    return foundAtts;
  };

  connectedCallback() {
    const { grid, home, radial } = this.getAtts();
    this.extraStyles = document.createElement('style');
    this.shadowRoot.append(this.extraStyles);

    // Grid-based layout
    if (grid) {
      this.wrapper.classList.add('grid');
    }

    // add a link to the homepage
    if (home) {
      this.clearAnchors();
      [
        { label: 'home', to: ''},
        ...EXAMPLES
      ].forEach((a, i) =>
        this.createAnchor(a.label, a.to, i)
      );
    }
    
    // Flyout
    if (radial) {
      this.wrapper.classList.add('radial');
      const nodeCount = this.wrapper.querySelectorAll('.i').length;
      const divisor = nodeCount > 0 ? (nodeCount - 1) : 0;
      this.extraStyles.textContent = `
nav.radial:hover .i:nth-child(n),
nav.radial:focus-within .i:nth-child(n) {
  transform:
    rotate(calc(var(--turn) / ${divisor} * var(--index)))
    translateX(var(--shift-distance));
}
`;
    }

    // mark current page
    const currentPath = window.location.pathname;
    const anchor = this.wrapper.querySelector(`.i[href="${currentPath}"]`);
    if (anchor) anchor.classList.add('current');
  }


}

window.customElements.define('playground-nav', PlaygroundNav);