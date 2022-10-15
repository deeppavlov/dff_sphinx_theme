from os import walk, path
from setuptools import setup

from dff_sphinx_theme.extras import __version__


setup(
    name='dff_sphinx_theme',
    version=__version__,
    author='Alexander Sergeev',
    author_email='shveitsar215@gmail.com',
    url="https://github.com/deeppavlov/dff_sphinx_theme",
    docs_url="https://github.com/deeppavlov/dff_sphinx_theme",
    description='Dialog Flow Framework Sphinx Theme',
    py_modules=[
        'dff_sphinx_theme'
    ],
    packages=[
        'dff_sphinx_theme', 'dff_sphinx_theme.extras'
    ],
    include_package_data=True,
    zip_safe=False,
    package_data={
        'dff_sphinx_theme': [
            'theme.conf',
            '*.html',
            'theme_variables.jinja',
            *[
                path.join('..', root, file) for (root, _, files) in walk('dff_sphinx_theme/static') for file in files
            ]
        ]
    },
    entry_points={
        'sphinx.html_themes': [
            'dff_sphinx_theme = dff_sphinx_theme',
        ]
    },
    license='MIT License',
    classifiers=[
        "Development Status :: 5 - Production/Stable",
        "Environment :: Web Environment",
        "Intended Audience :: Developers",
        "Intended Audience :: System Administrators",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Topic :: Internet",
        "Topic :: Software Development :: Documentation"
    ],
    install_requires=[
       'sphinx'
    ],
    tests_require=[
        line for line in (line.strip() for line in open('./demo/requirements.txt')) if line and not line.startswith("#")
    ]
)
