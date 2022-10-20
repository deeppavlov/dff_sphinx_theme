import re
import os

from sphinx_gallery.sorting import FileNameSortKey

from dff_sphinx_theme.extras import sphinx_gallery_find_example_and_build_dirs, sphinx_gallery_add_source_dirs_to_path


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

project = u'DFF Sphinx Theme Demo'
copyright = u'DFF'
version = "0.1.4"
release = "0.1.4"
language = 'en'

pygments_style = 'default'


# -- Options for Sphinx Extensions --

# intersphinx_mapping = {
#
# }

examples, auto_examples = sphinx_gallery_find_example_and_build_dirs('../examples', './examples')

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
html_static_path = []
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
# def setup(app):
