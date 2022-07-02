const HOME = window.location.pathname.split('/')[1]; // 'playground'

// update this whenever the pages change.
const PAGES = [
  'animation',
  'intersection',
  'pixels',
  'playground',
  'resize',
  'navigation'
];

const CSS = `
nav.radial {
  position: fixed;
  top: .5rem;
  right: .5rem;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: red;
}
nav.radial .i {
  display: block;
  padding: .2rem 4rem .2rem .2rem;
  
  position: absolute;
  top: 50%;
  right: 0;
}
nav.grid {
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
nav.grid .i:hover {
  filter: hue-rotate(45deg);
  
}
`;
const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(CSS);

class PlaygroundNav extends HTMLElement {
  static get observedAttributes() {
    return ['grid', 'radial', 'home'];
  }
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.adoptedStyleSheets = [stylesheet];
    this.wrapper = document.createElement('nav');
    this.wrapper.setAttribute('class', 'playground-nav');

    PAGES.forEach(page => {
      const a = document.createElement('a');
      a.setAttribute('class', 'i');
      a.setAttribute('href', `${HOME && `/${HOME}`}/${page}`);
      a.innerText = page;
      this.wrapper.append(a);
    });

    this.shadowRoot.append(this.wrapper);
  }

  getAtts = () => {
    const atts = this.getAttributeNames();

    const grid = atts.includes('grid');
    const home = atts.includes('home');
    const radial = atts.includes('radial');

    return { grid, home, radial };
  };

  connectedCallback() {
    this.navigation = this.shadowRoot.querySelector('.playground-nav');
    const { grid, home, radial } = this.getAtts();

    if (grid) {
      this.navigation.classList.add('grid');
    }

    if (home) {
      const homelink = document.createElement('a');
      homelink.setAttribute('class', 'i');
      homelink.setAttribute('href', '/');
      homelink.innerText = 'home';
      this.navigation.prepend(homelink)
    }
    
    if (radial) {
      this.navigation.classList.add('radial');
    }

    const currentPath = window.location.pathname;
    const anchor = this.navigation.querySelector(`.i[href="${currentPath}"]`);
    anchor?.classList.add('active');
  }


}

window.customElements.define('playground-nav', PlaygroundNav);