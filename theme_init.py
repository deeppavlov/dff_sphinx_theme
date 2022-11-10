"""
Pytorch Lightning Sphinx theme.
From https://github.com/shiftlab/lightning_sphinx_theme.
"""
from os import path

from .extras import *

try:
    import plotly.io as pio
    pio.renderers.default = 'sphinx_gallery'
except ModuleNotFoundError:
    pass


def get_html_theme_path():
    """Return list of HTML theme paths."""
    return path.abspath(path.dirname(path.dirname(__file__)))


# See http://www.sphinx-doc.org/en/stable/theming.html#distribute-your-theme-as-a-python-package
def setup(app):
    app.add_html_theme('dff_sphinx_theme', path.abspath(path.dirname(__file__)))
    app.add_directive('includenodoc', IncludeDirective)
    app.add_directive('galleryitem', GalleryItemDirective)
    app.add_directive('customgalleryitem', CustomGalleryItemDirective)
    app.add_directive('customcarditem', CustomCardItemDirective)
    app.add_directive('customcalloutitem', CustomCalloutItemDirective)
    return {
        'parallel_read_safe': True,
        'parallel_write_safe': True
    }
