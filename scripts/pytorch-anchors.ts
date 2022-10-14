export function bindPytorchAnchors() {
    // Replace Sphinx-generated anchors with anchorjs ones
    $(".headerlink").text("");

    $("a").add(".pytorch-article .headerlink");

    $(".anchorjs-link").each(function() {
        const headerLink = $(this).closest(".headerlink");
        const href = headerLink.attr("href");
        const clone = $(this.outerHTML).attr("href", href);

        headerLink.before(clone);
        headerLink.remove();
    });
  }
