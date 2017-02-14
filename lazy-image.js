/*
* <lazy-image> is a custom element that contains an image that has the
* option to be loaded only on-demand, for performance reasons.
*
*/

class LazyImage extends HTMLElement {
  /**
  * The constructor does work that needs to be executed _exactly_ once, such
  * as initializing any private properties, or creating a shadow root (if the
  * shadow DOM is used)
  */
  constructor() {
    super();

    // Initialize the properties this element uses.
    this._active = false;
    this._src = null;
    this._alt = null;

    // Create an <img> element that will load the image on demand.
    this._img = document.createElement('img');
    this._img.style.width = '100%';

    // Add the <img> element inside the shadow root.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(this._img);

    // Note: If you don't want to use the shadow DOM, you could've done
    // this instead of the above 2 lines:
    // this.appendChild(this._img);
  }

  get active() { return this._active; }
  set active(value) {
    // Convert the value to a boolean correctly, since an empty string actually
    // means "true" for boolean attributes.
    this._active = (value !== null && value !== undefined) ? true : false;
    if (this._src)
      this._maybeLoadImage();

    // Also set the attribute, because we want the option to use it for styling.
    this.setAttribute('active', this._active);
  }

  get src() { return this._src; }
  set src(value) {
    this._src = value;
    if (this._src)
      this._maybeLoadImage();
  }

  get alt() { return this._img.alt; }
  set alt(value) {
    this._img.alt = value;
  }

  _maybeLoadImage() {
    if (this._active) {
      this._img.src = this._src;
      //this._img.style.display = 'block';
    } else {
      this._img.src = '';
      //this._img.style.display = 'none';
    }
  }

  // Respond to attribute changes.
  static get observedAttributes() { return ['active', 'src', 'alt']; }
  attributeChangedCallback(attr, oldValue, newValue) {
    if (oldValue !== newValue)
      this[attr] = newValue;
  }
}

window.customElements.define('lazy-image', LazyImage);
