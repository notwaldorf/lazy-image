# lazy-image

`<lazy-image>` is a custom element that contains an image that has the
option to be loaded only on-demand, for performance reasons. If a `<lazy-image>`
is inactive, then its source is not loaded (the XHR won't be made until the
`active` attribute is set on the element).

`<lazy-image>` has 3 attributes:
  - `src` the image source (like you would use with a `<img>`
  - `alt`, the alternate text for the image the image source (like you would use with a `<img>`)
  - `active`, whether the image should be loaded or not

### How to use

#### On-demand loading

For a `<lazy-image>` to load, it must have the `active` property set to `true`.
In the example below, the images will only load when clicked (you can check the network tab in
your favourite developer tools to see that there's no initial request for these files).
This happens because they each start off with the `active` property set to `false`,
and have a `click` event listener, that
sets the `<lazy-image>`'s `active` attribute to `true`:

```html
<lazy-image src="..." alt="..." id="i"></lazy-image>

<script>
  i.addEventListener('click', function() {
    if (!this.active)
      this.active = true;
  });
</script>
```

If you want to have some global setting that controlls _all_ `<lazy-images>` on the page (i.e. activates or deactivates _all_ of them), you can set the `window.LazyImageSiteDefaultActive` property before loading the `lazy-image.js` script.

#### Intersection Observer
Intersection observers let you figure out when an element enters into view.
Combined with a `<lazy-image>`, this lets you only load
images that are scrolled into view, while leaving images at the bottom
of the page that haven't been seen inactive.

```
// Create an observer.
var observer = new IntersectionObserver(onChange, {
  threshold: [0.5]  // rootMargin: '50% 0%'
});

// That observes all the random images we've created.
els.forEach(el => observer.observe(el));

// Whenever we scroll...
function onChange(changes) {
  changes.forEach(change => {
    var el = change.target;
    if (!el.active)
      el.active = true;
    observer.unobserve(el);  // Don't care anymore.
  });
}
```
Intersection observers make me sad because they're awesome but only work in Chrome 💔.

### 😘, monica
