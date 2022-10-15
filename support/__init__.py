"""
Pytorch Lightning Sphinx theme.
From https://github.com/shiftlab/lightning_sphinx_theme.
"""
from os import path

from .plugin_file_globbing import sphinx_gallery_find_example_and_build_dirs
from .custom_directives import IncludeDirective, GalleryItemDirective, CustomGalleryItemDirective, CustomCardItemDirective, CustomCalloutItemDirective

__version__ = '0.0.1'
__version_full__ = __version__


def get_html_theme_path():
    """Return list of HTML theme paths."""
    return path.abspath(path.dirname(path.dirname(__file__)))


# See http://www.sphinx-doc.org/en/stable/theming.html#distribute-your-theme-as-a-python-package
def setup(app):
    app.add_html_theme('dff_sphinx_theme', path.abspath(path.dirname(__file__)))
