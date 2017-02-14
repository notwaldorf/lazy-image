# lazy-image

`lazy-image` is a custom element that contains an image that has the
option to be loaded only on-demand, for performance reasons. If a `lazy-image`
is inactive, then its source is not loaded (the XHR won't be made until the
`active` attribute is set on the element).

`lazy-image` has 3 attributes:
  - `src` the image source (like you would use with a `img`
  - `alt`, the alternate text for the image the image source (like you would use with a `img`)
  - `active`, whether the image should be loaded or not

### How to use
#### On-demand loading
For on-demand loading, you must set the `active` attribute to `true`.
In the example below, the images will only load when clicked (you can check the network tab in
your favourite developer tools to see that there's no initial request for these files).
This happens because they each have a `click` event listener, that
sets the `lazy-image`'s `active` attribute to `true`:

```html
<lazy-image src="..." alt="..." id="i"></lazy-image>

<script>
  i.addEventListener('click', function() {
    if (!this.active)
      this.active = true;
  });
</script>
```
#### Always load
If you want an image to always load, you can just set the `active`
property to `true` by default:

```html
<lazy-image src="..." alt="..." active></lazy-image>
```

### 😘, monica
