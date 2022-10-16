import glob
import re
import os

from sphinx_gallery.sorting import FileNameSortKey

from dff_sphinx_theme.extras import IncludeDirective, GalleryItemDirective, CustomGalleryItemDirective, CustomCardItemDirective, CustomCalloutItemDirective, sphinx_gallery_find_example_and_build_dirs, sphinx_gallery_add_source_dirs_to_path

import plotly.io as pio
pio.renderers.default = 'sphinx_gallery'


sphinx_gallery_add_source_dirs_to_path('..')


# -- Sphinx Options --

extensions = [
    'dff_sphinx_theme',
    'sphinxcontrib.katex',
    'sphinxcontrib.httpdomain',
    'sphinx.ext.intersphinx',
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx_copybutton',
    'sphinx_gallery.gen_gallery'
]

suppress_warnings = ['image.nonlocal_uri']
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'
exclude_patterns = ['**/README.rst']

project = u'PyTorch Sphinx Theme'
copyright = u'PyTorch'
version = "0.1"
release = "0.1"
language = 'en'

pygments_style = 'default'


# -- Options for Sphinx Extensions --

# intersphinx_mapping = {
#
# }

examples, auto_examples = sphinx_gallery_find_example_and_build_dirs('../')

sphinx_gallery_conf = {
    'examples_dirs': examples,
    'gallery_dirs': auto_examples,
    'filename_pattern': '.py',
    'reset_argv': lambda _, __: ["-a"],
    'within_subsection_order': FileNameSortKey,
    'ignore_pattern': f'{re.escape(os.sep)}_',
    'line_numbers': True,
}

# -- Options for HTML Output --

html_theme = 'dff_sphinx_theme'
html_static_path = list(glob.glob('./*/_static/'))
# html_favicon = None

html_theme_options = {
    'logo_only': True,

    'tab_intro_dff': '#',
    'tab_intro_addons': '#',
    'tab_intro_designer': '#',
    'tab_get_started': '#',
    'tab_tutorials': '#',
    'tab_documentation': './',  # Matches ROOT tag, should be ONE PER MODULE, other tabs = other modules (may be relative paths)
    'tab_ecosystem': '#',
    'tab_about_us': '#'
}

html_show_sourcelink = False
htmlhelp_basename = 'DFFSphinxThemeDemoDoc'


# -- Options for LaTeX Output --

# -- Options for Manual Page Output --

# -- Setup Configuration --
def setup(app):
    # Custom directives
    app.add_directive('includenodoc', IncludeDirective)
    app.add_directive('galleryitem', GalleryItemDirective)
    app.add_directive('customgalleryitem', CustomGalleryItemDirective)
    app.add_directive('customcarditem', CustomCardItemDirective)
    app.add_directive('customcalloutitem', CustomCalloutItemDirective)
