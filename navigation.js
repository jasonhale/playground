const HOME = window.location.hostname.includes('127') ? '' : '/playground';

// update this whenever the pages change.
const PAGES = [
  'animation',
  'intersection',
  'pixels',
  'playground',
  'resize',
  'navigation'
];

const BASE_CSS = `
nav {
  --text: var(--text-color, black);
  --navzindex: var(--z-nav, 100);

  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
}
nav .i {
  color: var(--text);
}
`;

const RADIAL_CSS = `
nav.radial {
  --navsize: 2rem;
  --turn: -.25turn;
  --bgcolor: red;

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

nav.radial:hover .i:nth-child(n),
nav.radial:focus-within .i:nth-child(n) {
  transform:
    rotate(calc(var(--turn) / 6 * var(--index)))
    translateX(-5rem);
}
`;

const GRID_CSS = `
nav.grid {
  --isize: 20rem;
  --ibg: hsl(0, 100%, 50%);

  display: flex;
  flex-flow: row wrap;
  gap: 1rem;
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
    PAGES.forEach((page, idx) => this.createAnchor(page, page, idx));

    // TODO: set CSS to divide by # of nav items.  Is currently 6. 

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
    a.setAttribute('href', `${HOME && `/${HOME}`}/${to}/`); // TODO: Fix homepage link logic.
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

    if (grid) {
      this.wrapper.classList.add('grid');
    }

    // add a link to the homepage
    if (home) {
      this.clearAnchors();
      [
        { label: 'home', to: HOME},
        ...PAGES.map(p => ({ label: p, to: p }))
      ].forEach((a, i) =>
        this.createAnchor(a.label, a.to, i)
      );
    }
    
    if (radial) {
      this.wrapper.classList.add('radial');
    }

    // mark current page
    const currentPath = window.location.pathname;
    const anchor = this.wrapper.querySelector(`.i[href="${currentPath}"]`);
    if (anchor) anchor.classList.add('current');
  }


}

window.customElements.define('playground-nav', PlaygroundNav);