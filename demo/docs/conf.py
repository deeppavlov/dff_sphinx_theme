import os
import sys

from jupytext import jupytext
from dff_sphinx_theme.extras import generate_example_links_for_notebook_creation

sys.path.append(os.path.abspath("."))
sys.path.append(os.path.abspath(".."))


# -- Sphinx Options --

extensions = [
    'dff_sphinx_theme',
    'sphinxcontrib.katex',
    'sphinxcontrib.httpdomain',
    'sphinx.ext.intersphinx',
    'sphinx.ext.autodoc',
    'sphinx.ext.viewcode',
    'sphinx_copybutton',
    'sphinx_autodoc_typehints',
    'nbsphinx',
    'sphinx_gallery.load_style',
]

suppress_warnings = ['image.nonlocal_uri']
templates_path = ['_templates']
source_suffix = '.rst'
master_doc = 'index'

project = u'DFF Sphinx Theme Demo'
copyright = u'DFF'
version = "0.1.18"
release = "0.1.18"
language = 'en'

pygments_style = 'default'


# -- Options for Sphinx Extensions --

# intersphinx_mapping = {
#
# }

exclude_patterns = ["*.py", "**/_*.py"]
nbsphinx_custom_formats = {".py": lambda s: jupytext.reads(s, "py:percent")}

nbsphinx_prolog = """
:tutorial_name: {{ env.docname }}
:tutorial_path: demo
:github_url: deeppavlov/dff_sphinx_theme
"""

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
def setup(_):
    generate_example_links_for_notebook_creation(
        ["demo/examples/examples_dir/*.py"],
        source="demo/examples",
        destination="demo/docs/examples"
    )
